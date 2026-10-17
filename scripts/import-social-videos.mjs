import createClient from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-06-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  throw new Error("Sanity project ID and API token are required.");
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const urls = [
  "https://youtube.com/shorts/1u1Y1yYoZO0",
  "https://youtube.com/shorts/-J3S8TSDwbo",
  "https://youtube.com/shorts/Glk8t3xEHdA",
  "https://youtube.com/shorts/-1icOmeU958",
  "https://youtube.com/shorts/MV2Md9dX91w",
  "https://youtube.com/shorts/vq0Lf4k0J9g",
  "https://youtube.com/shorts/5YI_GzCHX2M",
  "https://youtube.com/shorts/f9-s_ieU4gk",
  "https://youtube.com/shorts/69HK-CAICic",
  "https://youtube.com/shorts/lPthKoXQj98",
  "https://youtube.com/shorts/-ne-ttI5GOI",
  "https://youtube.com/shorts/cY7ND-eJhdg",
  "https://youtube.com/shorts/dwmuukjWjpg",
];

const existing = await client.fetch(
  `*[_type == "socialVideo" && videoUrl in $urls]{_id, videoUrl}`,
  { urls },
);
const existingUrls = new Set(existing.map((video) => video.videoUrl));

let created = 0;
let skipped = 0;

for (const [index, videoUrl] of urls.entries()) {
  if (existingUrls.has(videoUrl)) {
    skipped += 1;
    continue;
  }

  const videoId = videoUrl.split("/").pop();
  await client.createIfNotExists({
    _id: `socialVideo-youtube-short-${videoId}`,
    _type: "socialVideo",
    title: `IVR Pakistan Short ${String(index + 1).padStart(2, "0")}`,
    platform: "youtube",
    videoUrl,
    description: "IVR Pakistan interventional radiology video short.",
    featured: false,
    displayOrder: 0,
  });
  created += 1;
}

console.log(JSON.stringify({ total: urls.length, created, skipped }, null, 2));
