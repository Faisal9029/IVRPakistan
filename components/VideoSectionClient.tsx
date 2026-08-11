"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SocialVideo } from "../sanity/lib/queries";
import { socialLinks } from "../lib/siteInfo";
import Section from "./ui/Section";
import Container from "./ui/Container";
import Card from "./ui/Card";

type VideoSectionClientProps = {
  videos: SocialVideo[];
};

function getEmbedUrl(videoUrl: string, platform: SocialVideo["platform"]) {
  try {
    const url = new URL(videoUrl);
    if (platform === "youtube") {
      if (url.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
      }
      if (url.hostname.includes("youtube.com") || url.hostname.includes("www.youtube.com")) {
        return `https://www.youtube.com/embed/${url.searchParams.get("v") ?? url.pathname.split("/").filter(Boolean).pop() ?? ""}`;
      }
    }

    if (platform === "tiktok") {
      const match = videoUrl.match(/video\/(\d+)/);
      const videoId = match?.[1] ?? url.pathname.split("/").filter(Boolean).pop();
      return videoId ? `https://www.tiktok.com/embed/v2/${videoId}` : videoUrl;
    }
  } catch {
    return videoUrl;
  }

  return videoUrl;
}

const youtubeLink = socialLinks.find((social) => social.label === "YouTube")?.href ?? "#";

export default function VideoSectionClient({ videos }: VideoSectionClientProps) {
  const t = useTranslations("Video");
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>("[data-video-card]");
    const amount = (card?.offsetWidth ?? 320) + 24;
    scroller.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <Section id="videos" className="bg-surface dark:bg-navy">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-small font-semibold uppercase tracking-[0.32em] text-primary">
            {t("eyebrow")}
          </span>
          <h2 className="mt-4 text-h2 font-bold tracking-tight text-navy dark:text-white">
            {t("heading")}
          </h2>
          <p className="mt-6 text-body text-muted dark:text-slate-300">
            Explore clear, professional procedure videos that guide patients through each stage of advanced interventional radiology care.
          </p>
        </div>

        {videos.length === 0 ? (
          <p className="mt-10 text-center text-body text-muted dark:text-slate-400">
            Videos are being updated right now — please check back soon, or watch our
            channel directly for the latest uploads.
          </p>
        ) : (
          <div className="relative mt-16">
            <div
              ref={scrollerRef}
              className="flex snap-x snap-mandatory items-start gap-6 overflow-x-auto pb-4"
            >
              {videos.map((video) => {
                const isTikTok = video.platform === "tiktok";
                const embedUrl = getEmbedUrl(video.videoUrl, video.platform);

                return (
                  <Card
                    key={video._id}
                    data-video-card
                    className="w-72 shrink-0 snap-start overflow-hidden rounded-card border border-slate-200 bg-white shadow-rest transition duration-300 hover:-translate-y-1 hover:shadow-hover dark:border-slate-700 dark:bg-slate-900 sm:w-80"
                  >
                    <div
                      className={`relative overflow-hidden bg-navy ${isTikTok ? "aspect-[9/16]" : "aspect-video"}`}
                    >
                      <iframe
                        title={video.title}
                        src={embedUrl}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        className="h-full w-full"
                      />
                      <span className="absolute left-4 top-4 rounded-button bg-navy/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                        {video.platform}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-navy dark:text-white">{video.title}</h3>
                      {video.description ? (
                        <p className="mt-3 text-small leading-6 text-muted dark:text-slate-400">
                          {video.description}
                        </p>
                      ) : null}
                    </div>
                  </Card>
                );
              })}
            </div>

            {videos.length > 2 && (
              <div className="mt-2 hidden items-center justify-center gap-4 sm:flex">
                <button
                  type="button"
                  onClick={() => scrollByCard(-1)}
                  aria-label={t("scrollLeft")}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-button border border-slate-200 bg-white text-navy transition hover:border-primary/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCard(1)}
                  aria-label={t("scrollRight")}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-button border border-slate-200 bg-white text-navy transition hover:border-primary/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            <div className="mt-3 flex items-center justify-center gap-2 text-small text-muted dark:text-slate-400 sm:hidden">
              <ChevronRight size={14} className="animate-pulse" />
              {t("swipeHint")}
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <a
            href={youtubeLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-button border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-primary shadow-rest transition hover:border-primary dark:border-slate-700 dark:bg-slate-900"
          >
            {t("watchMore")}
          </a>
        </div>
      </Container>
    </Section>
  );
}
