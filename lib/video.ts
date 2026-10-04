export type VideoPlatform = "youtube" | "tiktok";

function isHost(hostname: string, domain: string) {
  return hostname === domain || hostname.endsWith(`.${domain}`);
}

export function getVideoEmbedUrl(videoUrl: string, platform?: VideoPlatform) {
  try {
    const url = new URL(videoUrl);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;

    const hostname = url.hostname.toLowerCase();
    const resolvedPlatform =
      platform ??
      (isHost(hostname, "tiktok.com")
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
