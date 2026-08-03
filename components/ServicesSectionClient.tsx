"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, HelpCircle, type LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Service } from "../sanity/lib/queries";
import { urlFor } from "../sanity/lib/client";
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
  const Icon = resolveIcon(service.icon);

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-card border border-slate-200 bg-white shadow-rest transition-all duration-300 hover:-translate-y-1 hover:shadow-hover dark:border-slate-700 dark:bg-slate-900">
      <div className="relative h-48 w-full overflow-hidden bg-primary/5">
        {service.featuredImage ? (
          <Image
            src={urlFor(service.featuredImage).width(640).height(400).url()}
            alt={service.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 80vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {/* eslint-disable-next-line react-hooks/static-components -- Icon is a stable lucide-react export looked up by name, not created per render */}
            <Icon size={40} className="text-primary/40" />
          </div>
        )}
        <div className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-card bg-white/90 text-primary shadow-rest backdrop-blur">
          {/* eslint-disable-next-line react-hooks/static-components -- Icon is a stable lucide-react export looked up by name, not created per render */}
          <Icon size={18} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-small font-semibold uppercase tracking-wide text-primary">
          {service.category ?? "General"}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-navy dark:text-white">{service.title}</h3>
        <p className="mt-2 line-clamp-2 text-small text-muted dark:text-slate-400">
          {service.shortDescription}
        </p>
        <Link
          href={`/services/${service.slug.current}`}
          className="mt-4 inline-flex items-center gap-1 text-small font-semibold text-primary hover:underline"
        >
          Know More <ArrowRight size={14} />
        </Link>
      </div>
    </Card>
  );
}

export default function ServicesSectionClient({ categories }: ServicesSectionClientProps) {
  const [openCategory, setOpenCategory] = useState(categories[0]?.name ?? "");
  const baseId = useId();

  return (
    <Section id="procedures" className="bg-surface dark:bg-navy">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-small font-semibold uppercase tracking-[0.32em] text-primary">
            Tap a category to reveal its procedures
          </span>
          <h2 className="mt-4 text-h2 font-bold tracking-tight text-navy dark:text-white">
            Advanced image-guided care organized by specialty
          </h2>
          <p className="mt-5 text-body text-muted dark:text-slate-300">
            Choose a category below to see the minimally invasive procedures available under it.
          </p>
        </div>

        {categories.length === 0 ? (
          <p className="mt-10 text-center text-body text-muted dark:text-slate-400">
            Services are being updated right now — please check back soon, or contact us
            directly to ask about a specific procedure.
          </p>
        ) : (
          <div className="mx-auto mt-10 max-w-5xl space-y-4">
            {categories.map((category) => {
              const isOpen = category.name === openCategory;
              const buttonId = `${baseId}-cat-button-${category.name}`;
              const panelId = `${baseId}-cat-panel-${category.name}`;

              return (
                <div
                  key={category.name}
                  className="overflow-hidden rounded-card border border-slate-200 bg-white shadow-rest dark:border-slate-700 dark:bg-slate-900"
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenCategory(isOpen ? "" : category.name)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
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
                      className="grid gap-6 border-t border-slate-100 p-6 dark:border-slate-800 sm:grid-cols-2 lg:grid-cols-3"
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
      </Container>
    </Section>
  );
}
