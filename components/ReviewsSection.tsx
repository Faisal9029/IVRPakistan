import Image from "next/image";
import { Star } from "lucide-react";
import { sanityFetch } from "../lib/sanity";
import { allReviewsQuery, PatientReview } from "../sanity/lib/queries";
import { urlFor } from "../sanity/lib/client";

const fallbackReviews: PatientReview[] = [
  {
    _id: "fallback-1",
    name: "Ali Hassan",
    rating: 5,
    text: "Excellent service and very professional doctors. Highly recommended!",
    designation: "Patient",
    featured: true,
  },
  {
    _id: "fallback-2",
    name: "Sarah Khan",
    rating: 5,
    text: "Best healthcare experience I've had. Staff was very friendly and helpful.",
    designation: "Patient",
    featured: false,
  },
  {
    _id: "fallback-3",
    name: "Muhammad Raza",
    rating: 4,
    text: "Great facilities and experienced doctors. Will definitely visit again.",
    designation: "Patient",
    featured: false,
  },
];

function getEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
    }
    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }
    if (parsed.hostname.includes("tiktok.com")) {
      const match = url.match(/video\/(\d+)/);
      const videoId = match?.[1] ?? parsed.pathname.split("/").pop();
      return `https://www.tiktok.com/embed/v2/${videoId}`;
    }
  } catch {
    return url;
  }
  return url;
}

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
    <section id="reviews" className="relative bg-[#f0f8ff] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#1677ff]">
            Patient Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            What Our Patients Say
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-600">
            Reviews are pulled from Sanity so you can mix text, image, audio, and video testimonials.
          </p>
        </div>

        <div className="mx-auto mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review: PatientReview) => (
            <div
              key={review._id}
              className="rounded-3xl border border-white bg-white p-6 shadow-lg shadow-slate-200/30 transition hover:shadow-xl"
            >
              <div className="flex items-center gap-4">
                {review.patientImage ? (
                  <div className="relative h-14 w-14 overflow-hidden rounded-full bg-slate-100">
                    <Image
                      src={urlFor(review.patientImage).width(200).height(200).url()}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div>
                  <p className="text-base font-semibold text-slate-950">{review.name}</p>
                  {review.designation ? <p className="text-sm text-slate-500">{review.designation}</p> : null}
                </div>
              </div>

              <div className="mt-5 flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {review.text ? (
                <p className="mt-4 text-sm leading-6 text-slate-600">&quot;{review.text}&quot;</p>
              ) : null}

              {review.audioUrl ? (
                <audio controls className="mt-4 w-full rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3">
                  <source src={review.audioUrl} />
                  Your browser does not support the audio element.
                </audio>
              ) : null}

              {review.videoUrl ? (
                <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200">
                  <iframe
                    src={getEmbedUrl(review.videoUrl)}
                    title={review.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-56 w-full"
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
