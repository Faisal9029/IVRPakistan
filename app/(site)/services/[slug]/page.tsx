import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/lib/sanity";
import { urlFor } from "@/sanity/lib/client";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { phone } from "@/lib/siteInfo";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ProcedureSeo = {
  title: string;
  description: string;
  keywords: string[];
  overview: string;
  questions: { question: string; answer: string }[];
};

const procedureSeo: Record<string, ProcedureSeo> = {
  "venous-leak-embolization": {
    title: "Venous Leak Embolization in Karachi, Pakistan | IVR Pakistan",
    description: "Learn about venous leak embolization consultation, assessment, risks and treatment planning with an interventional radiologist in Karachi.",
    keywords: ["venous leak treatment Karachi", "venous leak embolization Pakistan", "venogenic erectile dysfunction treatment"],
    overview: "Venous leak embolization is an image-guided procedure considered for selected patients with venogenic erectile dysfunction after appropriate clinical and diagnostic assessment. During consultation, the doctor reviews symptoms, test results, suitability, possible risks and alternatives.",
    questions: [
      { question: "How is venous leak assessed?", answer: "Assessment depends on the clinical history and appropriate diagnostic tests. The doctor will explain which evaluation is suitable for you." },
      { question: "Is venous leak embolization suitable for everyone?", answer: "No. Suitability depends on the diagnosis, anatomy, medical history and discussion of alternatives with a qualified specialist." },
    ],
  },
  "uterine-fibroid-embolization-ufe": {
    title: "Uterine Fibroid Embolization in Karachi, Pakistan | IVR Pakistan",
    description: "Uterine fibroid embolization consultation in Karachi for selected patients with symptomatic fibroids, including discussion of risks and alternatives.",
    keywords: ["uterine artery embolization Karachi", "uterine fibroid embolization Pakistan", "fibroid treatment without surgery Karachi"],
    overview: "Uterine fibroid embolization, also called uterine artery embolization, is a minimally invasive treatment option for selected patients with symptomatic uterine fibroids. Consultation and imaging review are needed before deciding whether this option is appropriate.",
    questions: [
      { question: "What symptoms may lead to a fibroid embolization consultation?", answer: "Symptoms can include heavy menstrual bleeding, pelvic pressure or pain, and other fibroid-related concerns. A doctor must assess the cause and available treatment options." },
      { question: "What should I discuss before UFE?", answer: "Discuss your symptoms, imaging, medical history, fertility plans, risks, expected recovery and alternatives with the treating team." },
    ],
  },
  "prostate-artery-embolization": {
    title: "Prostate Artery Embolization in Karachi, Pakistan | IVR Pakistan",
    description: "Prostate artery embolization consultation for selected patients with benign prostate enlargement symptoms in Karachi, Pakistan.",
    keywords: ["prostate artery embolization Karachi", "PAE Pakistan", "enlarged prostate treatment without surgery Karachi"],
    overview: "Prostate artery embolization is an image-guided treatment option for selected patients with symptoms related to benign prostatic hyperplasia. A consultation is required to confirm the diagnosis and discuss suitability, risks, expected outcomes and alternatives.",
    questions: [
      { question: "Who may need a PAE consultation?", answer: "People with urinary symptoms related to benign prostate enlargement may be assessed for different treatment options, including PAE where clinically appropriate." },
      { question: "Is PAE an alternative to prostate surgery?", answer: "PAE may be an option for selected patients, but the right treatment depends on clinical findings, prostate assessment and discussion with the relevant specialists." },
    ],
  },
  "varicocele-embolization": {
    title: "Varicocele Embolization in Karachi, Pakistan | IVR Pakistan",
    description: "Varicocele embolization consultation in Karachi for selected patients with varicocele-related pain or fertility concerns.",
    keywords: ["varicocele embolization Karachi", "varicocele treatment Pakistan", "non-surgical varicocele treatment Karachi"],
    overview: "Varicocele embolization is an image-guided, minimally invasive option for selected patients with varicocele-related symptoms. The consultation covers the diagnosis, symptoms, fertility considerations, risks, alternatives and follow-up planning.",
    questions: [
      { question: "Why might someone consider varicocele embolization?", answer: "A specialist may discuss it for selected patients with symptoms such as pain or fertility-related concerns after appropriate assessment." },
      { question: "Is embolization the same as surgery?", answer: "No. Embolization is performed through image-guided catheter techniques, while surgery uses an operative approach. The appropriate option depends on the individual case." },
    ],
  },
};

export async function generateStaticParams() {
  const services = await getServices();

  return services.map((service) => ({
    slug: service.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const service = (await getServices()).find(
    (item) => item.slug.current === slug,
  ) ?? null;

  if (!service) {
    return {
      title: "Service not found",
    };
  }

  const seo = procedureSeo[service.slug.current];

  return buildMetadata({
    title: seo?.title ?? `${service.title} in Karachi, Pakistan | IVR Pakistan`,
    description:
      seo?.description ??
      service.shortDescription ??
      "Learn more about this interventional radiology service in Karachi, Pakistan.",
    path: `/services/${service.slug.current}`,
    keywords: seo?.keywords,
    ogImage: service.featuredImage
      ? urlFor(service.featuredImage).width(1200).height(630).url()
      : undefined,
  });
}

export default async function ServicePage({
  params,
}: PageProps) {
  const { slug } = await params;

  const service = (await getServices()).find(
    (item) => item.slug.current === slug,
  ) ?? null;

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

  const seo = procedureSeo[service.slug.current];
  const procedureFaqs = seo?.questions ?? [];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.title,
    description: seo?.overview || service.shortDescription || service.fullDescription,
    url: `${SITE_URL}/services/${service.slug.current}`,
    bodyLocation: "Karachi, Pakistan",
    ...(service.category ? { procedureType: service.category } : {}),
  };
  const faqJsonLd = procedureFaqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: procedureFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return (
    <main className="min-h-screen bg-surface py-20 dark:bg-navy lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
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
                  {seo?.overview || service.fullDescription}
                </p>
              </div>

              {procedureFaqs.length ? (
                <div className="rounded-card border border-slate-100 bg-white p-7 dark:border-slate-700 dark:bg-slate-900">
                  <h2 className="text-2xl font-semibold text-navy dark:text-white">Frequently Asked Questions</h2>
                  <div className="mt-5 space-y-5">
                    {procedureFaqs.map((faq) => (
                      <div key={faq.question}>
                        <h3 className="text-base font-semibold text-navy dark:text-white">{faq.question}</h3>
                        <p className="mt-2 text-sm leading-7 text-muted dark:text-slate-300">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

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

              <div className="rounded-card border border-primary/20 bg-primary/5 p-7 dark:border-primary/30 dark:bg-primary/10">
                <h2 className="text-2xl font-semibold text-navy dark:text-white">Discuss Your Treatment Options</h2>
                <p className="mt-3 text-sm leading-7 text-muted dark:text-slate-300">Contact the clinic to discuss your symptoms, reports and whether this procedure may be appropriate for you.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/appointment" className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white">Book an Appointment</Link>
                  <a href={`tel:${phone.tel}`} className="inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-navy dark:border-slate-600 dark:text-white">Call {phone.display}</a>
                </div>
              </div>

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
