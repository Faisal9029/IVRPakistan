import { sanityFetch } from "../lib/sanity";
import { allVideosQuery, SocialVideo } from "../sanity/lib/queries";
import VideoSectionClient from "./VideoSectionClient";

const fallbackVideos: SocialVideo[] = [
  {
    _id: "fallback-1",
    title: "IVR Pakistan Overview",
    platform: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    description: "A patient-friendly overview of modern interventional radiology care in Karachi.",
    featured: true,
    displayOrder: 0,
  },
  {
    _id: "fallback-2",
    title: "Venous Leak Procedure Walkthrough",
    platform: "tiktok",
    videoUrl: "https://www.tiktok.com/@ivrpakistan/video/7400000000000000000",
    description: "A short walkthrough highlighting modern treatment workflows and patient education.",
    featured: false,
    displayOrder: 1,
  },
];

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
  const resolvedVideos = videos.length > 0 ? videos : fallbackVideos;

  return <VideoSectionClient videos={resolvedVideos} />;
}
