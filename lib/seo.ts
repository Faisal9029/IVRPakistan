import type { Metadata } from "next";

export const SITE_NAME = "IVR PAKISTAN";
export const SITE_URL = "https://ivrpakistan.com";
export const DEFAULT_OG_IMAGE = "/doctors.png";

type BuildMetadataOptions = {
  title: string;
  description: string;
  path: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  type?: "website" | "article";
  keywords?: string[];
  robots?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  canonicalUrl,
  ogImage,
  ogTitle,
  ogDescription,
  type = "website",
  keywords,
  robots,
}: BuildMetadataOptions): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const canonical = canonicalUrl ?? url;
  const image = ogImage ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    ...(robots ? { robots } : {}),
    alternates: { canonical },
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      url: canonical,
      siteName: SITE_NAME,
      type,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [image],
    },
  };
}
