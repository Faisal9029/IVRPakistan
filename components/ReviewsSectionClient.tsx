"use client";

import { useCallback, useEffect, useRef, useState, type FocusEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Card from "./ui/Card";
import { urlFor } from "../sanity/lib/client";
import type { PatientReview } from "../sanity/lib/queries";

const AUTO_ADVANCE_MS = 6000;

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

export default function ReviewsSectionClient({ reviews }: { reviews: PatientReview[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const goBack = useCallback(() => {
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  useEffect(() => {
    if (paused || reviews.length <= 1) return;
    timerRef.current = setInterval(advance, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, advance, reviews.length]);

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setPaused(false);
    }
  };

  const review = reviews[index];
  if (!review) return null;

  return (
    <div
      className="relative mx-auto mt-16 max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={handleBlur}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={review._id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="rounded-card border border-white/80 bg-white p-8 shadow-hover dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center gap-4">
              {review.patientImage ? (
                <div className="relative h-14 w-14 overflow-hidden rounded-full bg-slate-100">
                  <Image
                    src={urlFor(review.patientImage).width(200).height(200).url()}
                    alt={review.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div>
                <p className="text-lg font-semibold text-navy dark:text-white">{review.name}</p>
                {review.designation ? (
                  <p className="text-small text-muted dark:text-slate-400">{review.designation}</p>
                ) : null}
              </div>
            </div>

            <div className="mt-5 flex gap-1">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
              ))}
            </div>

            {review.text ? (
              <p className="mt-4 text-body text-muted dark:text-slate-300">&quot;{review.text}&quot;</p>
            ) : null}

            {review.audioUrl ? (
              <audio controls className="mt-4 w-full rounded-card border border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                <source src={review.audioUrl} />
                Your browser does not support the audio element.
              </audio>
            ) : null}

            {review.videoUrl ? (
              <div className="mt-4 overflow-hidden rounded-card border border-slate-200 dark:border-slate-700">
                <iframe
                  src={getEmbedUrl(review.videoUrl)}
                  title={review.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-56 w-full"
                />
              </div>
            ) : null}
          </Card>
        </motion.div>
      </AnimatePresence>

      {reviews.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goBack}
            aria-label="Previous testimonial"
            className="inline-flex h-10 w-10 items-center justify-center rounded-button border border-slate-200 bg-white text-navy transition hover:border-primary/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {reviews.map((r, i) => (
              <button
                key={r._id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1} of ${reviews.length}`}
                aria-current={i === index}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === index ? "bg-primary" : "bg-slate-300 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={advance}
            aria-label="Next testimonial"
            className="inline-flex h-10 w-10 items-center justify-center rounded-button border border-slate-200 bg-white text-navy transition hover:border-primary/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
