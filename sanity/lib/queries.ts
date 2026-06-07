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
};

export type SocialVideo = {
  _id: string;
  title: string;
  platform: "youtube" | "tiktok";
  videoUrl: string;
  thumbnail?: { _type: "image"; asset: { _ref: string } };
  description?: string;
  featured: boolean;
  displayOrder?: number;
  publishedDate?: string;
};

export type Service = {
  _id: string;
  title: string;
  slug: { _type: "slug"; current: string };
  shortDescription?: string;
  fullDescription?: string;
  featuredImage?: { _type: "image"; asset: { _ref: string } };
  icon?: string;
  category?: string;
  benefits?: string[];
  proceduresIncluded?: string[];
  displayOrder?: number;
  featured: boolean;
};

export const allReviewsQuery = `*[_type == "patientReview"] | order(displayOrder asc, _createdAt desc){
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

export const allVideosQuery = `*[_type == "socialVideo"] | order(displayOrder asc, publishedDate desc){
  _id,
  title,
  platform,
  videoUrl,
  thumbnail,
  description,
  featured,
  displayOrder,
  publishedDate
}`;

export const featuredVideosQuery = `*[_type == "socialVideo" && featured == true] | order(displayOrder asc, publishedDate desc){
  _id,
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
  title,
  slug,
  shortDescription,
  fullDescription,
  featuredImage,
  icon,
  category,
  benefits,
  proceduresIncluded,
  displayOrder,
  featured
}`;

export const featuredServicesQuery = `*[_type == "service" && featured == true] | order(displayOrder asc){
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
  displayOrder,
  featured
}`;

export const allServiceSlugsQuery = `*[_type == "service" && defined(slug.current)]{ 'slug': slug.current }`;
