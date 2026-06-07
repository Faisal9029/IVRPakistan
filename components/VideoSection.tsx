import { sanityFetch } from "../lib/sanity";
import { allVideosQuery, SocialVideo } from "../sanity/lib/queries";

const fallbackVideos: SocialVideo[] = [
  {
    _id: "fallback-1",
    title: "IVR Pakistan Overview",
    platform: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "Learn about our interventional radiology care and patient-first approach.",
    featured: false,
    displayOrder: 0,
  },
];

function getEmbedUrl(videoUrl: string, platform: SocialVideo["platform"]) {
  try {
    const url = new URL(videoUrl);
    if (platform === "youtube") {
      if (url.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
      }
      return `https://www.youtube.com/embed/${url.searchParams.get("v") ?? ""}`;
    }

    if (platform === "tiktok") {
      const match = videoUrl.match(/video\/(\d+)/);
      const videoId = match?.[1] ?? url.pathname.split("/").pop();
      return `https://www.tiktok.com/embed/v2/${videoId}`;
    }
  } catch {
    return videoUrl;
  }

  return videoUrl;
}

async function getVideos() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackVideos;
  }

  try {
    return await sanityFetch<SocialVideo[]>(allVideosQuery);
  } catch {
    return fallbackVideos;
  }
}

export default async function VideoSection() {
  const videos = await getVideos();

  return (
    <section id="videos" className="relative bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#1677ff]">
            Watch Our Channel
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            IVR procedure videos that showcase modern image-guided treatment workflows
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-600">
            Explore clear, professional procedure videos that guide patients through each stage of advanced interventional radiology care.
          </p>
        </div>

        <div className="mx-auto mt-16 grid gap-8 lg:grid-cols-2">
          {videos.map((video: SocialVideo) => (
            <article
              key={video._id}
              className="overflow-hidden rounded-[32px] border border-slate-200 bg-slate-50 shadow-sm"
            >
              <div className="relative aspect-video bg-slate-900">
                <iframe
                  title={video.title}
                  src={getEmbedUrl(video.videoUrl, video.platform)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
                <span className="absolute left-4 top-4 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                  {video.platform}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-950">{video.title}</h3>
                {video.description && <p className="mt-3 text-sm leading-6 text-slate-600">{video.description}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
