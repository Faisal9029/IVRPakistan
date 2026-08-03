import Section from "./ui/Section";
import Container from "./ui/Container";
import ReviewsSectionClient from "./ReviewsSectionClient";
import { sanityFetch } from "../lib/sanity";
import { allReviewsQuery, PatientReview } from "../sanity/lib/queries";

const fallbackReviews: PatientReview[] = [
  {
    _id: "fallback-1",
    name: "Ayesha Khan",
    rating: 5,
    text: "The process felt comfortable from start to finish and my recovery was smoother than expected.",
    designation: "Corporate HR Manager",
    featured: true,
  },
  {
    _id: "fallback-2",
    name: "Bilal Ahmed",
    rating: 5,
    text: "Excellent care, clear guidance, and a very professional experience from consultation to recovery.",
    designation: "Small Business Owner",
    featured: false,
  },
];

async function getReviews() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackReviews;
  }

  try {
    return await sanityFetch<PatientReview[]>(allReviewsQuery);
  } catch {
    return fallbackReviews;
  }
}

export default async function ReviewsSection() {
  const reviews = await getReviews();

  return (
    <Section id="reviews" className="bg-surface dark:bg-navy">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-small font-semibold uppercase tracking-[0.32em] text-primary">
            Patient Testimonials
          </span>
          <h2 className="mt-4 text-h2 font-bold tracking-tight text-navy dark:text-white">
            What Our Patients Say
          </h2>
          <p className="mt-6 text-body text-muted dark:text-slate-300">
            Reviews from real patients, supported by Sanity content for text, image, audio, and video stories.
          </p>
        </div>

        {reviews.length === 0 ? (
          <p className="mt-10 text-center text-body text-muted dark:text-slate-400">
            Patient testimonials are being updated right now — please check back soon.
          </p>
        ) : (
          <ReviewsSectionClient reviews={reviews} />
        )}
      </Container>
    </Section>
  );
}
