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
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-small font-semibold uppercase tracking-[0.32em] text-primary">
            Explore By Specialty
          </span>
          <h2 className="mt-4 text-h2 font-bold tracking-tight text-navy dark:text-white">
            Our Most Requested Treatment Categories
          </h2>
        </div>

        {categories.length === 0 ? (
          <p className="mt-10 text-center text-body text-muted dark:text-slate-400">
            Category details are being updated right now — please browse all services
            above, or contact us directly to ask about a specific condition.
          </p>
        ) : (
          <div className="mt-16 space-y-16">
            {categories.map((category, index) => {
              const Icon = resolveIcon(category.procedures[0]?.icon);
              const isReversed = index % 2 === 1;
              const visibleProcedures = category.procedures.slice(0, BULLETS_PER_CATEGORY);
              const remaining = category.count - visibleProcedures.length;

              return (
                <div
                  key={category.name}
                  className={`grid items-center gap-10 lg:grid-cols-2 ${
                    isReversed ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-card border border-slate-200 bg-gradient-to-br from-primary/10 via-surface to-cyan/10 shadow-rest dark:border-slate-700 dark:from-primary/10 dark:via-slate-900 dark:to-cyan/10">
                    <Icon size={72} className="text-primary/50" />
                    <span className="absolute right-5 top-5 rounded-button bg-white/90 px-3 py-1 text-small font-semibold text-primary shadow-rest dark:bg-slate-900/90">
                      {category.count} procedure{category.count === 1 ? "" : "s"}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-h3 font-semibold tracking-tight text-navy dark:text-white">
                      {category.name}
                    </h3>
                    <p className="mt-3 text-body text-muted dark:text-slate-300">
                      {category.count} specialized procedure{category.count === 1 ? "" : "s"}{" "}
                      under {category.name}, delivered using image-guided techniques for
                      precise, minimally invasive treatment.
                    </p>

                    <ul className="mt-6 space-y-3">
                      {visibleProcedures.map((service) => (
                        <li key={service._id}>
                          <Link
                            href={`/services/${service.slug.current}`}
                            className="group flex items-center gap-2 text-small font-medium text-navy transition hover:text-primary dark:text-slate-200"
                          >
                            <ArrowRight
                              size={14}
                              className="shrink-0 text-primary transition group-hover:translate-x-1"
                            />
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {remaining > 0 && (
                      <Link
                        href="/#procedures"
                        className="mt-5 inline-flex text-small font-semibold text-primary hover:underline"
                      >
                        +{remaining} more {category.name} procedure{remaining === 1 ? "" : "s"} →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </Section>
  );
}
