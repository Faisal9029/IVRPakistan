import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getServices, getPosts } from "@/lib/sanity";
import { locationPages } from "@/lib/locationPages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts] = await Promise.all([getServices(), getPosts()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/appointment`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.6 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services
    .filter((service) => service.slug?.current)
    .map((service) => ({
      url: `${SITE_URL}/services/${service.slug.current}`,
      ...(service._updatedAt ? { lastModified: service._updatedAt } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  const locationRoutes: MetadataRoute.Sitemap = locationPages.map((location) => ({
    url: `${SITE_URL}/locations/${location.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => post.slug?.current)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug.current}`,
      lastModified: post.publishedDate,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    }));

  return [...staticRoutes, ...locationRoutes, ...serviceRoutes, ...postRoutes];
}
