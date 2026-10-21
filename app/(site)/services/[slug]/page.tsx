import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
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

  const curatedSeo = procedureSeo[service.slug.current];
  const cmsSeo = service.seo;
  const keywords = [
    ...(cmsSeo?.focusKeyword ? [cmsSeo.focusKeyword] : []),
    ...(cmsSeo?.secondaryKeywords ?? []),
    ...(curatedSeo?.keywords ?? []),
  ];

  return buildMetadata({
    title: cmsSeo?.metaTitle ?? curatedSeo?.title ?? `${service.title} | IVR Pakistan`,
    description:
      cmsSeo?.metaDescription ??
      curatedSeo?.description ??
      service.shortDescription ??
      `Learn more about ${service.title} and discuss suitability with IVR Pakistan.`,
    path: `/services/${service.slug.current}`,
    canonicalUrl: cmsSeo?.canonicalUrl,
    keywords: keywords.length ? [...new Set(keywords)] : undefined,
    ogTitle: cmsSeo?.openGraphTitle,
    ogDescription: cmsSeo?.openGraphDescription,
    robots: cmsSeo?.robots,
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
  const cmsSeo = service.seo;
  const procedureFaqs = seo?.questions ?? [];
  const procedureDescription = cmsSeo?.metaDescription ?? seo?.overview ?? service.shortDescription ?? service.fullDescription;
  const relatedServices = (await getServices())
    .filter((item) => item.slug.current !== service.slug.current && item.category === service.category)
    .slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.title,
    description: procedureDescription,
    url: `${SITE_URL}/services/${service.slug.current}`,
     areaServed: ["Karachi", "Lahore", "Islamabad", "Pakistan"],
     provider: {
       "@type": "MedicalClinic",
       name: "IVR Pakistan",
       url: SITE_URL,
     },
     ...(service.category ? { procedureType: service.category } : {}),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Procedures", item: `${SITE_URL}/#procedures` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${SITE_URL}/services/${service.slug.current}` },
    ],
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
    <main className="min-h-screen bg-[linear-gradient(180deg,#fbf9fe_0%,#f5f3fa_55%,#ffffff_100%)] py-12 dark:bg-navy sm:py-16 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
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

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted dark:text-slate-400">
          <Link href="/" className="transition hover:text-primary">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#procedures" className="transition hover:text-primary">Procedures</Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-navy dark:text-slate-200">{service.title}</span>
        </div>

        <section className="overflow-hidden rounded-[32px] border border-primary/10 bg-white shadow-hover dark:border-slate-700 dark:bg-slate-900">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative overflow-hidden bg-gradient-to-br from-[#27243a] via-[#432452] to-primary px-7 py-10 text-white sm:px-10 lg:px-12 lg:py-14">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan/20 blur-3xl" />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20">
                    <Sparkles size={15} aria-hidden="true" />
                    Interventional Radiology
                  </span>
                  {service.category ? <span className="rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20">{service.category}</span> : null}
                </div>
                <h1 className="mt-7 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">{service.title}</h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/80">{procedureDescription}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/appointment" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-primary transition hover:bg-cyan hover:text-navy">
                    <CalendarCheck size={17} aria-hidden="true" />
                    Book a consultation
                  </Link>
                  <a href={`https://wa.me/${phone.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                    WhatsApp the clinic <ArrowRight size={17} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            <div className="relative min-h-[280px] bg-[#f1ebf7] dark:bg-slate-800 lg:min-h-full">
              {service.featuredImage ? (
                <Image
                  src={urlFor(service.featuredImage).width(1200).height(900).url()}
                  alt={cmsSeo?.featuredImageAltText || service.title}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full min-h-[280px] items-center justify-center p-10 text-center">
                  <div>
                    <ShieldCheck size={56} className="mx-auto text-primary/60" aria-hidden="true" />
                    <p className="mt-4 text-lg font-semibold text-navy dark:text-white">Specialist-led, image-guided care</p>
                    <p className="mt-2 text-sm leading-6 text-muted dark:text-slate-400">A clinical consultation is required to assess suitability.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid border-t border-slate-100 bg-white sm:grid-cols-3 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5 sm:border-b-0 sm:border-r dark:border-slate-800">
              <ClipboardCheck className="text-primary" size={22} aria-hidden="true" />
              <div><p className="text-xs uppercase tracking-[0.18em] text-muted">Assessment</p><p className="mt-1 text-sm font-semibold text-navy dark:text-white">Personalized review</p></div>
            </div>
            <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5 sm:border-b-0 sm:border-r dark:border-slate-800">
              <Clock3 className="text-primary" size={22} aria-hidden="true" />
              <div><p className="text-xs uppercase tracking-[0.18em] text-muted">Planning</p><p className="mt-1 text-sm font-semibold text-navy dark:text-white">Clear next steps</p></div>
            </div>
            <div className="flex items-center gap-3 px-6 py-5">
              <ShieldCheck className="text-primary" size={22} aria-hidden="true" />
              <div><p className="text-xs uppercase tracking-[0.18em] text-muted">Care</p><p className="mt-1 text-sm font-semibold text-navy dark:text-white">Specialist guidance</p></div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-8">
            <section className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-rest sm:p-9 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">About this procedure</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy dark:text-white">What you should know</h2>
              <p className="mt-5 text-base leading-8 text-muted dark:text-slate-300">{procedureDescription}</p>
              <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
                Suitability, expected results, risks and alternatives depend on your individual clinical assessment. The treating specialist will guide you after reviewing your history and reports.
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-rest sm:p-9 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Your care pathway</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy dark:text-white">From consultation to follow-up</h2>
              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                {[
                  { number: "01", title: "Consultation", text: "Share your symptoms, reports and treatment goals with the specialist." },
                  { number: "02", title: "Assessment", text: "Your history and imaging are reviewed to discuss suitable options." },
                  { number: "03", title: "Plan & follow-up", text: "Receive clear preparation, recovery and follow-up guidance." },
                ].map((step) => (
                  <div key={step.number} className="rounded-2xl border border-primary/10 bg-[#fbf9fe] p-5 dark:border-slate-700 dark:bg-slate-800">
                    <span className="text-2xl font-black text-primary/40">{step.number}</span>
                    <h3 className="mt-4 font-semibold text-navy dark:text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted dark:text-slate-400">{step.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {procedureFaqs.length ? (
              <section className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-rest sm:p-9 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Need to know</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy dark:text-white">Frequently asked questions</h2>
                <div className="mt-7 divide-y divide-slate-100 dark:divide-slate-800">
                  {procedureFaqs.map((faq) => (
                    <div key={faq.question} className="py-5 first:pt-0 last:pb-0">
                      <h3 className="text-base font-semibold text-navy dark:text-white">{faq.question}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted dark:text-slate-300">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {service.benefits?.length ? (
              <section className="rounded-[28px] border border-primary/15 bg-white p-7 shadow-rest dark:border-slate-700 dark:bg-slate-900">
                <div className="flex items-center gap-3"><CheckCircle2 className="text-primary" size={22} aria-hidden="true" /><h2 className="text-xl font-bold text-navy dark:text-white">Potential benefits</h2></div>
                <ul className="mt-5 space-y-3">
                  {service.benefits.map((benefit) => <li key={benefit} className="flex items-start gap-3 text-sm leading-6 text-muted dark:text-slate-300"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" /><span>{benefit}</span></li>)}
                </ul>
              </section>
            ) : null}

            {service.proceduresIncluded?.length ? (
              <section className="rounded-[28px] border border-slate-200 bg-[#fbf9fe] p-7 shadow-rest dark:border-slate-700 dark:bg-slate-800">
                <h2 className="text-xl font-bold text-navy dark:text-white">What may be included</h2>
                <ul className="mt-5 space-y-3">
                  {service.proceduresIncluded.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted dark:text-slate-300"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" /><span>{item}</span></li>)}
                </ul>
              </section>
            ) : null}

            <section className="rounded-[28px] bg-gradient-to-br from-primary to-[#432452] p-7 text-white shadow-hover">
              <CalendarCheck size={28} aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-bold">Discuss your options</h2>
              <p className="mt-3 text-sm leading-7 text-white/80">Book a consultation to discuss your symptoms, reports and whether this procedure may be appropriate for you.</p>
              <div className="mt-6 space-y-3">
                <Link href="/appointment" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-primary transition hover:bg-cyan hover:text-navy"><CalendarCheck size={17} aria-hidden="true" /> Book appointment</Link>
                <a href={`tel:${phone.tel}`} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"><Phone size={17} aria-hidden="true" /> Call {phone.display}</a>
              </div>
            </section>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-muted shadow-rest dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"><div className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" /><p>Appointments are arranged through IVR Pakistan clinics. Confirm availability and procedure suitability before visiting.</p></div></div>
          </aside>
        </div>

        {relatedServices.length ? (
          <section className="mt-12 border-t border-primary/10 pt-12">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Continue exploring</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-navy dark:text-white">Related procedures</h2></div><Link href="/#procedures" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">View all procedures <ArrowRight size={16} aria-hidden="true" /></Link></div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {relatedServices.map((related) => <Link key={related._id} href={`/services/${related.slug.current}`} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-rest transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-hover dark:border-slate-700 dark:bg-slate-900"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{related.category}</p><h3 className="mt-3 font-semibold text-navy dark:text-white">{related.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-muted dark:text-slate-400">{related.shortDescription}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ArrowRight size={14} className="transition group-hover:translate-x-1" aria-hidden="true" /></span></Link>)}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
