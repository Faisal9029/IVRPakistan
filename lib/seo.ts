import type { Metadata } from "next";

export const SITE_NAME = "IVR PAKISTAN";
export const SITE_URL = "https://ivr-pakistan-clone.vercel.app";
export const DEFAULT_OG_IMAGE = "/doctors.png";

type BuildMetadataOptions = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: "website" | "article";
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  type = "website",
  keywords,
}: BuildMetadataOptions): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const image = ogImage ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
