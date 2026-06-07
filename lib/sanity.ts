import { sanityClient } from "../sanity/lib/client";

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.");
  }

  return sanityClient.fetch<T>(query, params ?? {});
}
