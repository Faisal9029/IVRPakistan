export type PatientReview = {
  _id: string;
  name: string;
  patientImage?: { _type: "image"; asset: { _ref: string } };
  text?: string;
  rating: number;
  designation?: string;
  featured: boolean;
  displayOrder?: number;
  audioUrl?: string;
  videoUrl?: string;
  status?: "pending" | "approved" | "rejected";
  consentGiven?: boolean;
  submittedAt?: string;
};

export type SocialVideo = {
  _id: string;
  _createdAt?: string;
  title: string;
  platform: "youtube" | "tiktok" | "facebook";
  videoUrl: string;
  thumbnail?: { _type: "image"; asset: { _ref: string } };
  description?: string;
  featured: boolean;
  displayOrder?: number;
  publishedDate?: string;
};

export type Service = {
  _id: string;
  _updatedAt?: string;
  title: string;
  slug: { _type: "slug"; current: string };
  shortDescription?: string;
  fullDescription?: string;
  featuredImage?: { _type: "image"; asset: { _ref: string } };
  icon?: string;
  category?: string;
  benefits?: string[];
  proceduresIncluded?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    focusKeyword?: string;
    secondaryKeywords?: string[];
    canonicalUrl?: string;
    featuredImageAltText?: string;
    openGraphTitle?: string;
    openGraphDescription?: string;
    robots?: string;
  };
  displayOrder?: number;
  featured: boolean;
};

export const allReviewsQuery = `*[_type == "patientReview" && (!defined(status) || status == "approved") && (!defined(consentGiven) || consentGiven == true)] | order(displayOrder asc, _createdAt desc){
  _id,
  name,
  patientImage,
  text,
  rating,
  designation,
  featured,
  displayOrder,
  audioUrl,
  videoUrl,
  status,
  consentGiven,
  submittedAt
}`;

export const featuredReviewsQuery = `*[_type == "patientReview" && featured == true] | order(displayOrder asc){
  _id,
  name,
  patientImage,
  text,
  rating,
  designation,
  featured,
  displayOrder,
  audioUrl,
  videoUrl
}`;

export const allVideosQuery = `*[_type == "socialVideo"] | order(coalesce(publishedDate, _createdAt) desc, _createdAt desc){
  _id,
  _createdAt,
  title,
  platform,
  videoUrl,
  thumbnail,
  description,
  featured,
  displayOrder,
  publishedDate
}`;

export const featuredVideosQuery = `*[_type == "socialVideo" && featured == true] | order(coalesce(publishedDate, _createdAt) desc, _createdAt desc){
  _id,
  _createdAt,
  title,
  platform,
  videoUrl,
  thumbnail,
  description,
  featured,
  displayOrder,
  publishedDate
}`;

export const allServicesQuery = `*[_type == "service"] | order(displayOrder asc){
  _id,
  _updatedAt,
  title,
  slug,
  shortDescription,
  fullDescription,
  featuredImage,
  icon,
  category,
  benefits,
  proceduresIncluded,
  seo,
  displayOrder,
  featured
}`;

export const featuredServicesQuery = `*[_type == "service" && featured == true] | order(displayOrder asc){
  _id,
  _updatedAt,
  title,
  slug,
  shortDescription,
  fullDescription,
  featuredImage,
  icon,
  category,
  benefits,
  proceduresIncluded,
  seo,
  displayOrder,
  featured
}`;

export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  shortDescription,
  fullDescription,
  featuredImage,
  icon,
  category,
  benefits,
  proceduresIncluded,
  seo,
  displayOrder,
  featured
}`;

export const allServiceSlugsQuery = `*[_type == "service" && defined(slug.current)]{ 'slug': slug.current }`;

export type Post = {
  _id: string;
  title: string;
  slug: { _type: "slug"; current: string };
  excerpt: string;
  body: string;
  featuredImage?: { _type: "image"; asset: { _ref: string } };
  publishedDate: string;
  displayDate?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    focusKeyword?: string;
    secondaryKeywords?: string[];
    canonicalUrl?: string;
    featuredImageAltText?: string;
    openGraphTitle?: string;
    openGraphDescription?: string;
    openGraphImage?: { _type: "image"; asset: { _ref: string } };
    robots?: string;
    language?: string;
    contentType?: string;
    category?: string;
    tags?: string[];
  };
};

export const allPostsQuery = `*[_type == "post"] | order(publishedDate desc){
  _id,
  title,
  slug,
  excerpt,
  body,
  featuredImage,
  publishedDate,
  displayDate,
  seo
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  body,
  featuredImage,
  publishedDate,
  displayDate,
  seo
}`;

export const allPostSlugsQuery = `*[_type == "post" && defined(slug.current)]{ 'slug': slug.current }`;
