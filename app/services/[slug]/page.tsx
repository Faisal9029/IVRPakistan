import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "../../../lib/sanity";
import {
  allServiceSlugsQuery,
  serviceBySlugQuery,
  Service,
} from "../../../sanity/lib/queries";
import { urlFor } from "../../../sanity/lib/client";

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
}: PageProps) {
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

  return {
    title: `${service.title} | IVR Pakistan`,
    description:
      service.shortDescription ||
      "Learn more about this interventional radiology service.",
  };
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
      <main className="min-h-screen bg-white py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-bold text-slate-950">
            Service not found
          </h1>

          <p className="mt-4 text-base leading-8 text-slate-600">
            The requested service could not be found in the CMS.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5fbff] py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0f62ff]">
                Service Details
              </p>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
                {service.title}
              </h1>

              {service.category && (
                <p className="mt-3 text-sm font-medium text-slate-500">
                  Category: {service.category}
                </p>
              )}
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Back to Home
            </Link>
          </div>

          {service.featuredImage && (
            <div className="overflow-hidden rounded-[28px] bg-slate-950">
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
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-7">
                <h2 className="text-2xl font-semibold text-slate-950">
                  Overview
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-600">
                  {service.fullDescription}
                </p>
              </div>

              {service.benefits?.length ? (
                <div className="rounded-3xl border border-slate-100 bg-white p-7">
                  <h2 className="text-2xl font-semibold text-slate-950">
                    Benefits
                  </h2>

                  <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                    {service.benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#0f62ff]" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="space-y-6">
              {service.proceduresIncluded?.length ? (
                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-7">
                  <h2 className="text-2xl font-semibold text-slate-950">
                    Included Procedures
                  </h2>

                  <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                    {service.proceduresIncluded.map(
                      (item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3"
                        >
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#0f62ff]" />
                          <span>{item}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ) : null}

              <div className="rounded-3xl border border-slate-100 bg-white p-7">
                <h2 className="text-2xl font-semibold text-slate-950">
                  Service Info
                </h2>

                <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-900">
                      Slug:
                    </span>{" "}
                    {service.slug?.current}
                  </div>

                  <div>
                    <span className="font-semibold text-slate-900">
                      Display Order:
                    </span>{" "}
                    {service.displayOrder ?? 0}
                  </div>

                  <div>
                    <span className="font-semibold text-slate-900">
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