import { createClient } from 'next-sanity'
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const sanityClient = client

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

type SanityImageRefLike = { asset?: { _ref?: string } }

// Sanity encodes the real pixel dimensions directly in the asset reference
// (e.g. "image-<hash>-1600x900-jpg"), so we can read the true aspect ratio
// without an extra query — used to render full, uncropped images correctly.
export function getImageDimensions(source: SanityImageRefLike | undefined) {
  const ref = source?.asset?._ref
  const match = ref?.match(/-(\d+)x(\d+)-/)

  if (!match) {
    return { width: 1600, height: 900 }
  }

  return { width: parseInt(match[1], 10), height: parseInt(match[2], 10) }
}
