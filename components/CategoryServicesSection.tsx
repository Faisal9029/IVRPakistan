import Link from "next/link";
import { ArrowRight, HelpCircle, type LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { getServices, groupServicesByCategory } from "../lib/sanity";
import Section from "./ui/Section";
import Container from "./ui/Container";

const FEATURED_CATEGORY_COUNT = 4;
const BULLETS_PER_CATEGORY = 5;

function resolveIcon(name?: string): LucideIcon {
  if (!name) return HelpCircle;
  const icon = (LucideIcons as unknown as Record<string, LucideIcon>)[name];
  return icon ?? HelpCircle;
}

export default async function CategoryServicesSection() {
  const services = await getServices();
  const categories = groupServicesByCategory(services)
    .sort((a, b) => b.count - a.count)
    .slice(0, FEATURED_CATEGORY_COUNT);

  return (
    <Section className="bg-white dark:bg-navy">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-small font-semibold uppercase tracking-[0.28em] text-primary">
            Explore by specialty
          </span>
          <h2 className="mt-4 text-h2 font-bold tracking-tight text-navy dark:text-white">
            Treatment categories at a glance
          </h2>
          <p className="mt-5 text-body leading-7 text-muted dark:text-slate-300">
            Quickly scan our most requested areas of care, then open any procedure for complete details.
          </p>
        </div>

        {categories.length === 0 ? (
          <p className="mt-10 text-center text-body text-muted dark:text-slate-400">
            Category details are being updated right now — please browse all services
            above, or contact us directly to ask about a specific condition.
          </p>
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {categories.map((category, index) => {
              const Icon = resolveIcon(category.procedures[0]?.icon);
              const isReversed = index % 2 === 1;
              const visibleProcedures = category.procedures.slice(0, BULLETS_PER_CATEGORY);
              const remaining = category.count - visibleProcedures.length;

              return (
                <div
                  key={category.name}
                  className={`rounded-card border border-slate-200 bg-white p-5 shadow-rest transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-hover dark:border-slate-700 dark:bg-slate-900 ${
                    isReversed ? "md:translate-y-2" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/15">
                      <Icon size={24} aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold leading-snug text-navy dark:text-white">
                          {category.name}
                        </h3>
                        <span className="shrink-0 rounded-button bg-primary/10 px-3 py-1 text-[0.72rem] font-semibold text-primary dark:bg-primary/15">
                          {category.count} procedure{category.count === 1 ? "" : "s"}
                        </span>
                      </div>
                      <p className="mt-2 text-small leading-6 text-muted dark:text-slate-300">
                        Browse the most common treatments in this specialty.
                      </p>
                    </div>
                  </div>

                  <ul className="mt-5 divide-y divide-slate-100 rounded-xl border border-slate-100 dark:divide-slate-800 dark:border-slate-800">
                    {visibleProcedures.map((service) => (
                      <li key={service._id}>
                        <Link
                          href={`/services/${service.slug.current}`}
                          className="group flex items-start gap-3 px-3.5 py-3 text-small font-medium leading-5 text-navy transition hover:bg-primary/[0.04] hover:text-primary dark:text-slate-200 dark:hover:bg-white/[0.04]"
                        >
                          <ArrowRight
                            size={15}
                            className="mt-0.5 shrink-0 text-primary transition group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                          <span>{service.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {remaining > 0 && (
                    <Link
                      href="/#procedures"
                      className="mt-4 inline-flex items-center gap-1 text-small font-semibold text-primary hover:underline"
                    >
                      +{remaining} more procedure{remaining === 1 ? "" : "s"} <ArrowRight size={14} />
                    </Link>
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
