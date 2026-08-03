import { sanityClient } from "../sanity/lib/client";
import { allPostsQuery, allServicesQuery, Post, Service } from "../sanity/lib/queries";

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.");
  }

  return sanityClient.fetch<T>(query, params ?? {});
}

const fallbackServices: Service[] = [
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

export async function getServices(): Promise<Service[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackServices;
  }

  try {
    return await sanityFetch<Service[]>(allServicesQuery);
  } catch {
    return fallbackServices;
  }
}

export async function getPosts(): Promise<Post[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return [];
  }

  try {
    return await sanityFetch<Post[]>(allPostsQuery);
  } catch {
    return [];
  }
}

export type ServiceCategoryGroup = {
  name: string;
  count: number;
  procedures: Service[];
};

export function groupServicesByCategory(services: Service[]): ServiceCategoryGroup[] {
  const grouped = services.reduce((acc, service) => {
    const category = service.category ?? "General Procedures";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return Object.entries(grouped).map(([name, procedures]) => ({
    name,
    count: procedures.length,
    procedures,
  }));
}
