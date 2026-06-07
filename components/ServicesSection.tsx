import { sanityFetch } from "../lib/sanity";
import { allServicesQuery, Service } from "../sanity/lib/queries";
import ServicesSectionClient from "./ServicesSectionClient";

const fallbackProcedures: Service[] = [
  {
    _id: "fallback-1",
    title: "Penile Doppler Ultrasound",
    slug: { _type: "slug", current: "penile-doppler-ultrasound" },
    shortDescription: "Functional vascular assessment for erectile and pelvic blood flow.",
    fullDescription: "Functional vascular assessment for erectile and pelvic blood flow.",
    icon: "Target",
    category: "Vascular",
    benefits: ["Fast exam", "Outpatient procedure"],
    proceduresIncluded: ["Ultrasound imaging", "Blood flow analysis"],
    displayOrder: 0,
    featured: false,
  },
  {
    _id: "fallback-2",
    title: "Varicocele Embolization",
    slug: { _type: "slug", current: "varicocele-embolization" },
    shortDescription: "Minimally invasive treatment for varicose testicular veins.",
    fullDescription: "Minimally invasive treatment for varicose testicular veins.",
    icon: "ShieldCheck",
    category: "Men's Health",
    benefits: ["Relieves pain", "Short recovery"],
    proceduresIncluded: ["Venogram", "Embolic agent placement"],
    displayOrder: 1,
    featured: false,
  },
];

async function getServices() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackProcedures;
  }

  try {
    return await sanityFetch<Service[]>(allServicesQuery);
  } catch {
    return fallbackProcedures;
  }
}

export default async function ServicesSection() {
  const procedures = await getServices();
  const categories = Object.values(
    procedures.reduce((acc, procedure) => {
      const category = procedure.category ?? "General Procedures";
      if (!acc[category]) {
        acc[category] = {
          name: category,
          count: 0,
          procedures: [],
        };
      }
      acc[category].count += 1;
      acc[category].procedures.push(procedure);
      return acc;
    }, {} as Record<string, { name: string; count: number; procedures: Service[] }>)
  );

  return <ServicesSectionClient categories={categories} />;
}
