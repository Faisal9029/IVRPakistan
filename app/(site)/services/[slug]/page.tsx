import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity";
import {
  allServiceSlugsQuery,
  serviceBySlugQuery,
  Service,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/client";
import { buildMetadata, SITE_URL } from "@/lib/seo";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(
    allServiceSlugsQuery
  );

  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const service = await sanityFetch<Service | null>(
    serviceBySlugQuery,
    { slug }
  );

  if (!service) {
    return {
      title: "Service not found",
    };
  }

  return buildMetadata({
    title: `${service.title} | IVR Pakistan`,
    description:
      service.shortDescription ||
      "Learn more about this interventional radiology service.",
    path: `/services/${service.slug.current}`,
    ogImage: service.featuredImage
      ? urlFor(service.featuredImage).width(1200).height(630).url()
      : undefined,
  });
}

export default async function ServicePage({
  params,
}: PageProps) {
  const { slug } = await params;

  const service = await sanityFetch<Service | null>(
    serviceBySlugQuery,
    { slug }
  );

  if (!service) {
    return (
      <main className="min-h-screen bg-white py-24 dark:bg-navy">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-bold text-navy dark:text-white">
            Service not found
          </h1>

          <p className="mt-4 text-base leading-8 text-muted dark:text-slate-300">
            The requested service could not be found in the CMS.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:brightness-95"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.title,
    description: service.shortDescription || service.fullDescription,
    url: `${SITE_URL}/services/${service.slug.current}`,
    ...(service.category ? { procedureType: service.category } : {}),
  };

  return (
    <main className="min-h-screen bg-surface py-20 dark:bg-navy lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="space-y-6 rounded-card border border-slate-200 bg-white p-8 shadow-hover dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-primary">
                Service Details
              </p>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-navy dark:text-white">
                {service.title}
              </h1>

              {service.category && (
                <p className="mt-3 text-sm font-medium text-muted dark:text-slate-400">
                  Category: {service.category}
                </p>
              )}
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:brightness-125 dark:bg-white dark:text-navy dark:hover:brightness-90"
            >
              Back to Home
            </Link>
          </div>

          {service.featuredImage && (
            <div className="overflow-hidden rounded-card bg-navy">
              <Image
                src={urlFor(service.featuredImage)
                  .width(1400)
                  .height(700)
                  .url()}
                alt={service.title}
                width={1400}
                height={700}
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-6">
              <div className="rounded-card border border-slate-100 bg-slate-50 p-7 dark:border-slate-700 dark:bg-slate-800">
                <h2 className="text-2xl font-semibold text-navy dark:text-white">
                  Overview
                </h2>

                <p className="mt-4 text-base leading-8 text-muted dark:text-slate-300">
                  {service.fullDescription}
                </p>
              </div>

              {service.benefits?.length ? (
                <div className="rounded-card border border-slate-100 bg-white p-7 dark:border-slate-700 dark:bg-slate-900">
                  <h2 className="text-2xl font-semibold text-navy dark:text-white">
                    Benefits
                  </h2>

                  <ul className="mt-5 space-y-3 text-sm leading-7 text-muted dark:text-slate-300">
                    {service.benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="space-y-6">
              {service.proceduresIncluded?.length ? (
                <div className="rounded-card border border-slate-100 bg-slate-50 p-7 dark:border-slate-700 dark:bg-slate-800">
                  <h2 className="text-2xl font-semibold text-navy dark:text-white">
                    Included Procedures
                  </h2>

                  <ul className="mt-5 space-y-3 text-sm leading-7 text-muted dark:text-slate-300">
                    {service.proceduresIncluded.map(
                      (item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3"
                        >
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ) : null}

              <div className="rounded-card border border-slate-100 bg-white p-7 dark:border-slate-700 dark:bg-slate-900">
                <h2 className="text-2xl font-semibold text-navy dark:text-white">
                  Service Info
                </h2>

                <div className="mt-5 space-y-3 text-sm leading-7 text-muted dark:text-slate-300">
                  <div>
                    <span className="font-semibold text-navy dark:text-white">
                      Slug:
                    </span>{" "}
                    {service.slug?.current}
                  </div>

                  <div>
                    <span className="font-semibold text-navy dark:text-white">
                      Display Order:
                    </span>{" "}
                    {service.displayOrder ?? 0}
                  </div>

                  <div>
                    <span className="font-semibold text-navy dark:text-white">
                      Featured:
                    </span>{" "}
                    {service.featured ? "Yes" : "No"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
