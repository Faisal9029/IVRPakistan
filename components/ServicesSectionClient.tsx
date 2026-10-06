"use client";

import { useId, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronDown, HelpCircle, Search, type LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import type { Service } from "../sanity/lib/queries";
import Section from "./ui/Section";
import Container from "./ui/Container";
import Card from "./ui/Card";
import { fadeInUp, stagger } from "../lib/motion";

type CategoryGroup = {
  name: string;
  count: number;
  procedures: Service[];
};

type ServicesSectionClientProps = {
  categories: CategoryGroup[];
};

function resolveIcon(name?: string): LucideIcon {
  if (!name) return HelpCircle;
  const icon = (LucideIcons as unknown as Record<string, LucideIcon>)[name];
  return icon ?? HelpCircle;
}

function ServiceCard({ service }: { service: Service }) {
  const tCommon = useTranslations("Common");
  const Icon = resolveIcon(service.icon);

  return (
    <Card className="group flex h-full flex-col rounded-card border border-slate-200 bg-white p-5 shadow-rest transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-hover dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/15">
          {/* eslint-disable-next-line react-hooks/static-components -- Icon is a stable lucide-react export looked up by name, not created per render */}
          <Icon size={21} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary">
            {service.category ?? "General"}
          </p>
          <h3 className="mt-1 text-base font-semibold leading-snug text-navy dark:text-white">
            {service.title}
          </h3>
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-small leading-6 text-muted dark:text-slate-400">
        {service.shortDescription ?? service.fullDescription ?? "Image-guided interventional radiology procedure."}
      </p>
      <Link
        href={`/services/${service.slug.current}`}
        className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-button bg-primary/10 px-3 py-2 text-small font-semibold text-primary transition hover:bg-primary hover:text-white dark:bg-primary/15 dark:hover:bg-primary"
      >
        {tCommon("knowMore")} <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </Card>
  );
}

export default function ServicesSectionClient({ categories }: ServicesSectionClientProps) {
  const t = useTranslations("Services");
  const [openCategory, setOpenCategory] = useState(categories[0]?.name ?? "");
  const [searchQuery, setSearchQuery] = useState("");
  const baseId = useId();
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredCategories = useMemo(
    () =>
      categories
        .map((category) => ({
          ...category,
          procedures: category.procedures.filter((procedure) =>
            [procedure.title, procedure.category, procedure.shortDescription, procedure.fullDescription]
              .filter(Boolean)
              .join(" ")
              .toLowerCase()
              .includes(normalizedQuery),
          ),
        }))
        .map((category) => ({ ...category, count: category.procedures.length }))
        .filter((category) => category.procedures.length > 0),
    [categories, normalizedQuery],
  );

  const activeOpenCategory = normalizedQuery
    ? filteredCategories[0]?.name ?? ""
    : openCategory;

  return (
    <Section id="procedures" className="bg-surface dark:bg-navy">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-small font-semibold uppercase tracking-[0.32em] text-primary">
            {t("eyebrow")}
          </span>
          <h2 className="mt-4 text-h2 font-bold tracking-tight text-navy dark:text-white">
            {t("heading")}
          </h2>
          <p className="mt-5 text-body leading-7 text-muted dark:text-slate-300">
            Search by procedure or browse a specialty to find the right image-guided treatment.
          </p>
        </div>

        {categories.length === 0 ? (
          <p className="mt-10 text-center text-body text-muted dark:text-slate-400">
            Services are being updated right now — please check back soon, or contact us
            directly to ask about a specific procedure.
          </p>
        ) : (
          <>
            <div className="mx-auto mt-10 max-w-3xl rounded-card border border-slate-200 bg-white/80 p-3 shadow-rest dark:border-slate-700 dark:bg-slate-900/80">
              <label htmlFor={`${baseId}-procedure-search`} className="sr-only">
                {t("searchLabel")}
              </label>
              <div className="relative">
                <Search
                  size={20}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted dark:text-slate-400"
                />
                <input
                  id={`${baseId}-procedure-search`}
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full rounded-button border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-body text-navy outline-none transition placeholder:text-muted focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-slate-900"
                />
              </div>
            </div>

            {filteredCategories.length === 0 ? (
              <p className="mx-auto mt-10 max-w-2xl text-center text-body text-muted dark:text-slate-400">
                {t("noResults")}
              </p>
            ) : (
              <div className="mx-auto mt-8 max-w-6xl space-y-3">
                {filteredCategories.map((category) => {
              const isOpen = category.name === activeOpenCategory;
              const buttonId = `${baseId}-cat-button-${category.name}`;
              const panelId = `${baseId}-cat-panel-${category.name}`;

              return (
                <div
                  key={category.name}
                  className="overflow-hidden rounded-card border border-slate-200 bg-white shadow-rest transition-colors dark:border-slate-700 dark:bg-slate-900"
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenCategory(isOpen ? "" : category.name)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-primary/[0.03] dark:hover:bg-white/[0.03] sm:px-6"
                    >
                      <span className="text-base font-semibold text-navy dark:text-white">
                        {category.name}{" "}
                        <span className="font-normal text-muted dark:text-slate-400">
                          ({category.count})
                        </span>
                      </span>
                      <ChevronDown
                        size={20}
                        aria-hidden="true"
                        className={`shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </h3>

                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial="hidden"
                      animate="visible"
                      variants={stagger}
                       className="grid gap-4 border-t border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/30 sm:grid-cols-2 lg:grid-cols-3"
                    >
                      {category.procedures.map((service) => (
                        <motion.div key={service._id} variants={fadeInUp}>
                          <ServiceCard service={service} />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              );
            })}
              </div>
            )}
          </>
        )}
      </Container>
    </Section>
  );
}
