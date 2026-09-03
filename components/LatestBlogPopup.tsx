"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CalendarDays, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/sanity/lib/queries";
import { formatDate, getPostDisplayDate } from "@/lib/blog";
import { urlFor } from "@/sanity/lib/client";

const AUTO_CLOSE_MS = 10000;
const SEEN_KEY_PREFIX = "ivrp-latest-blog-seen:";

export default function LatestBlogPopup({ post }: { post: Post | null }) {
  const t = useTranslations("LatestBlogPopup");
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!post) return;
    try {
      if (sessionStorage.getItem(`${SEEN_KEY_PREFIX}${post._id}`)) return;
    } catch {}
    setOpen(true);
  }, [post]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setOpen(false), AUTO_CLOSE_MS);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  if (!post) return null;

  const handleClose = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(`${SEEN_KEY_PREFIX}${post._id}`, "1");
    } catch {}
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-card border border-slate-200 bg-white shadow-hover dark:border-slate-700 dark:bg-slate-900"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label={t("closeLabel")}
              className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-navy shadow-rest transition hover:bg-white dark:bg-slate-900/90 dark:text-white"
            >
              <X size={16} />
            </button>

            {post.featuredImage ? (
              <div className="relative h-44 w-full overflow-hidden bg-slate-50 dark:bg-slate-800">
                <Image
                  src={urlFor(post.featuredImage).width(640).url()}
                  alt={post.title}
                  fill
                  sizes="(min-width: 768px) 448px, 92vw"
                  className="object-contain"
                />
              </div>
            ) : null}

            <div className="p-5">
              <span className="text-small font-semibold uppercase tracking-[0.28em] text-primary">
                {t("eyebrow")}
              </span>
              <h3 id={titleId} className="mt-2 text-lg font-semibold text-navy dark:text-white">
                {post.title}
              </h3>
              <div className="mt-2 flex items-center gap-1.5 text-small text-muted dark:text-slate-400">
                <CalendarDays size={14} />
                {formatDate(getPostDisplayDate(post))}
              </div>
              <p className="mt-2 line-clamp-2 text-small text-muted dark:text-slate-400">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Link
                  href={`/blog/${post.slug.current}`}
                  onClick={handleClose}
                  className="inline-flex items-center justify-center rounded-button bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-rest transition hover:shadow-hover"
                >
                  {t("readMore")}
                </Link>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-sm font-semibold text-muted transition hover:text-navy dark:text-slate-400 dark:hover:text-white"
                >
                  {t("cancel")}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
