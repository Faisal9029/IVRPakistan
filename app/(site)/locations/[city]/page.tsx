import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarCheck, MapPin, Phone } from "lucide-react";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { getServices } from "@/lib/sanity";
import { getClinicsForCity, getLocationPage, locationPages } from "@/lib/locationPages";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export function generateStaticParams() {
  return locationPages.map((location) => ({ city: location.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const location = getLocationPage(citySlug);
  if (!location) return {};

  return buildMetadata({
    title: location.title,
    description: location.description,
    path: `/locations/${location.slug}`,
    keywords: [
      `interventional radiologist ${location.city}`,
      `interventional radiology ${location.city}`,
      `embolization specialist ${location.city}`,
      `minimally invasive procedures ${location.city}`,
    ],
  });
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const location = getLocationPage(citySlug);
  if (!location) notFound();

  const [services] = await Promise.all([getServices()]);
  const locationServices = location.serviceSlugs
    .map((slug) => services.find((service) => service.slug.current === slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));
  const clinics = getClinicsForCity(location.city);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: `IVR Pakistan - ${location.city}`,
    url: `${SITE_URL}/locations/${location.slug}`,
    medicalSpecialty: "Interventional Radiology",
    areaServed: location.city,
    parentOrganization: { "@type": "MedicalClinic", name: "IVR Pakistan", url: SITE_URL },
    location: clinics.map((clinic) => ({
      "@type": "MedicalClinic",
      name: clinic.title,
      address: { "@type": "PostalAddress", streetAddress: clinic.detail, addressLocality: location.city, addressCountry: "PK" },
      openingHours: clinic.hours,
    })),
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fbf9fe_0%,#ffffff_100%)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Section className="border-t-0 pb-12 pt-16 lg:pb-16 lg:pt-24">
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">IVR Pakistan · {location.city}</p>
            <h1 className="mt-5 text-h1 font-bold tracking-tight text-navy dark:text-white">{location.title}</h1>
            <p className="mt-6 text-lg leading-8 text-muted dark:text-slate-300">{location.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/appointment" className="inline-flex items-center gap-2 rounded-button bg-primary px-5 py-3 text-sm font-semibold text-white shadow-rest hover:shadow-hover">
                <CalendarCheck size={17} /> Book appointment
              </Link>
              <a href="tel:+923462236220" className="inline-flex items-center gap-2 rounded-button border border-primary/20 bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm dark:bg-slate-900">
                <Phone size={17} /> Call +92 346 2236220
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Explore care options</p>
              <h2 className="mt-3 text-3xl font-bold text-navy dark:text-white">Procedures and consultations</h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted dark:text-slate-300">Explore relevant image-guided procedure information. Final suitability, risks, alternatives and scheduling are reviewed during consultation.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {locationServices.map((service) => (
                  <Link key={service._id} href={`/services/${service.slug.current}`} className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-hover dark:border-slate-700 dark:bg-slate-900">
                    <span className="font-semibold text-navy group-hover:text-primary dark:text-white">{service.title}</span>
                    <span className="mt-2 flex items-center gap-1 text-sm font-semibold text-primary">View procedure <ArrowRight size={14} /></span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] border border-primary/15 bg-white p-6 shadow-rest dark:bg-slate-900">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Clinic information</p>
              <h2 className="mt-3 text-2xl font-bold text-navy dark:text-white">{location.city} locations</h2>
              {clinics.length ? clinics.map((clinic) => (
                <div key={clinic.title} className="mt-6 border-t border-slate-200 pt-5 first:border-0 first:pt-0 dark:border-slate-700">
                  <h3 className="font-semibold text-navy dark:text-white">{clinic.title}</h3>
                  <p className="mt-2 flex gap-2 text-sm leading-6 text-muted dark:text-slate-300"><MapPin size={16} className="mt-1 shrink-0 text-primary" />{clinic.detail}</p>
                  <p className="mt-2 text-sm font-semibold text-primary">{clinic.hours}</p>
                  {clinic.notes ? <p className="mt-2 text-xs leading-5 text-muted dark:text-slate-400">{clinic.notes}</p> : null}
                </div>
              )) : <p className="mt-4 text-sm leading-6 text-muted dark:text-slate-300">This is a scheduled visit location. Please confirm the latest availability before travelling.</p>}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
