export type VideoPlatform = "youtube" | "tiktok";

function isHost(hostname: string, domain: string) {
  return hostname === domain || hostname.endsWith(`.${domain}`);
}

function isTikTokHost(hostname: string) {
  return isHost(hostname, "tiktok.com");
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

    return videoUrl;
  } catch {
    return null;
  }
}

async function resolveTikTokShortUrl(videoUrl: string) {
  let currentUrl: URL;

  try {
    currentUrl = new URL(videoUrl);
    if (
      !isTikTokHost(currentUrl.hostname.toLowerCase()) ||
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
            !isTikTokHost(nextUrl.hostname.toLowerCase()) ||
            (nextUrl.protocol !== "https:" && nextUrl.protocol !== "http:")
          ) {
            break;
          }

          currentUrl = nextUrl;
          continue;
        }

        await response.body?.cancel();
        if (response.ok && getVideoEmbedUrl(currentUrl.toString(), "tiktok")) {
          return currentUrl.toString();
        }
        break;
      }
    } catch (error) {
      console.warn(`Unable to resolve TikTok ${method} short link.`, error);
    }
  }

  return videoUrl;
}

export async function resolveTikTokVideoUrls<
  T extends { videoUrl?: string; platform?: VideoPlatform },
>(videos: T[]): Promise<T[]> {
  const resolvedUrls = new Map<string, Promise<string>>();

  return Promise.all(
    videos.map(async (video) => {
      if (!video.videoUrl) return video;

      let isTikTok = video.platform === "tiktok";
      if (!isTikTok && !video.platform) {
        try {
          isTikTok = isTikTokHost(new URL(video.videoUrl).hostname.toLowerCase());
        } catch {
          isTikTok = false;
        }
      }
      if (!isTikTok || getVideoEmbedUrl(video.videoUrl, "tiktok")) return video;

      let resolvedUrl = resolvedUrls.get(video.videoUrl);
      if (!resolvedUrl) {
        resolvedUrl = resolveTikTokShortUrl(video.videoUrl);
        resolvedUrls.set(video.videoUrl, resolvedUrl);
      }

      return { ...video, videoUrl: await resolvedUrl };
    }),
  );
}
