export type VideoPlatform = "youtube" | "tiktok" | "facebook";

function isHost(hostname: string, domain: string) {
  return hostname === domain || hostname.endsWith(`.${domain}`);
}

function isTikTokHost(hostname: string) {
  return isHost(hostname, "tiktok.com");
}

function isFacebookHost(hostname: string) {
  return (
    isHost(hostname, "facebook.com") ||
    isHost(hostname, "fb.com") ||
    isHost(hostname, "fb.watch")
  );
}

function isPlatformHost(hostname: string, platform: VideoPlatform) {
  if (platform === "tiktok") return isTikTokHost(hostname);
  if (platform === "facebook") return isFacebookHost(hostname);
  return isHost(hostname, "youtube.com") || hostname === "youtu.be";
}

export function getVideoEmbedUrl(videoUrl: string, platform?: VideoPlatform) {
  try {
    const url = new URL(videoUrl);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;

    const hostname = url.hostname.toLowerCase();
    const resolvedPlatform =
      platform ??
      (isTikTokHost(hostname)
        ? "tiktok"
        : isHost(hostname, "youtube.com") || hostname === "youtu.be"
          ? "youtube"
          : isFacebookHost(hostname)
            ? "facebook"
            : undefined);

    if (resolvedPlatform === "tiktok") {
      const videoId =
        url.pathname.match(/\/video\/(\d+)(?:\/|$)/)?.[1] ??
        url.pathname.match(/\/(?:player\/v1|embed\/v2)\/(\d+)(?:\/|$)/)?.[1];

      return videoId
        ? `https://www.tiktok.com/player/v1/${videoId}?controls=1`
        : null;
    }

    if (resolvedPlatform === "youtube") {
      const videoId =
        (hostname === "youtu.be" ? url.pathname.slice(1).split("/")[0] : null) ??
        url.searchParams.get("v") ??
        url.pathname.match(/\/(?:embed|shorts|live)\/([^/]+)/)?.[1];

      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (resolvedPlatform === "facebook") {
      if (!isFacebookHost(hostname)) return null;

      const embedUrl = new URL("https://www.facebook.com/plugins/video.php");
      embedUrl.searchParams.set("href", url.toString());
      embedUrl.searchParams.set("show_text", "false");
      embedUrl.searchParams.set("width", "500");
      return embedUrl.toString();
    }

    return videoUrl;
  } catch {
    return null;
  }
}

async function resolveShortUrl(videoUrl: string, platform: VideoPlatform) {
  let currentUrl: URL;

  try {
    currentUrl = new URL(videoUrl);
    if (
      !isPlatformHost(currentUrl.hostname.toLowerCase(), platform) ||
      (currentUrl.protocol !== "https:" && currentUrl.protocol !== "http:")
    ) {
      return videoUrl;
    }
  } catch {
    return videoUrl;
  }

  for (const method of ["HEAD", "GET"] as const) {
    currentUrl = new URL(videoUrl);

    try {
      for (let redirects = 0; redirects <= 5; redirects += 1) {
        const response = await fetch(currentUrl, {
          method,
          redirect: "manual",
          next: { revalidate: 86400 },
          signal: AbortSignal.timeout(8000),
        });

        if (response.status >= 300 && response.status < 400) {
          const location = response.headers.get("location");
          await response.body?.cancel();
          if (!location) break;

          const nextUrl = new URL(location, currentUrl);
          if (
            !isPlatformHost(nextUrl.hostname.toLowerCase(), platform) ||
            (nextUrl.protocol !== "https:" && nextUrl.protocol !== "http:")
          ) {
            break;
          }

          currentUrl = nextUrl;
          continue;
        }

        await response.body?.cancel();
        if (response.ok && getVideoEmbedUrl(currentUrl.toString(), platform)) {
          return currentUrl.toString();
        }
        break;
      }
    } catch (error) {
      console.warn(`Unable to resolve ${platform} ${method} short link.`, error);
    }
  }

  return videoUrl;
}

export async function resolveSocialVideoUrls<
  T extends { videoUrl?: string; platform?: VideoPlatform },
>(videos: T[]): Promise<T[]> {
  const resolvedUrls = new Map<string, Promise<string>>();

  return Promise.all(
    videos.map(async (video) => {
      if (!video.videoUrl) return video;

      let platform = video.platform;
      if (!platform) {
        try {
          const hostname = new URL(video.videoUrl).hostname.toLowerCase();
          if (isTikTokHost(hostname)) platform = "tiktok";
          else if (isFacebookHost(hostname)) platform = "facebook";
        } catch {
          platform = undefined;
        }
      }
      if (!platform || getVideoEmbedUrl(video.videoUrl, platform)) return video;

      const cacheKey = `${platform}:${video.videoUrl}`;
      let resolvedUrl = resolvedUrls.get(cacheKey);
      if (!resolvedUrl) {
        resolvedUrl = resolveShortUrl(video.videoUrl, platform);
        resolvedUrls.set(cacheKey, resolvedUrl);
      }

      return { ...video, videoUrl: await resolvedUrl };
    }),
  );
}
