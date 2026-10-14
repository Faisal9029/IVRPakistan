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
    shortDescription: "Minimally invasive treatment for varicose testicular veins in Karachi and Pakistan.",
    fullDescription: "Varicocele embolization is an image-guided procedure that may be considered for selected patients with varicocele-related symptoms. Suitability, risks and alternatives require a clinical consultation.",
    icon: "ShieldCheck",
    category: "Men's Health",
    benefits: ["Image-guided treatment", "Outpatient planning", "Individualized follow-up"],
    proceduresIncluded: ["Venogram", "Embolic agent placement"],
    displayOrder: 1,
    featured: false,
  },
  {
    _id: "fallback-3",
    title: "Uterine Fibroid Embolization (UFE)",
    slug: { _type: "slug", current: "uterine-fibroid-embolization-ufe" },
    shortDescription: "Image-guided uterine fibroid embolization consultation in Karachi, Pakistan.",
    fullDescription: "Uterine fibroid embolization is a minimally invasive treatment option for selected patients with symptomatic fibroids. A specialist consultation is needed to review imaging, symptoms, risks and alternatives.",
    icon: "Target",
    category: "Women's Health",
    benefits: ["Minimally invasive approach", "Image-guided planning", "Personalized follow-up"],
    proceduresIncluded: ["Pre-procedure assessment", "Uterine artery embolization planning"],
    displayOrder: 2,
    featured: false,
  },
  {
    _id: "fallback-4",
    title: "Prostate Artery Embolization (PAE)",
    slug: { _type: "slug", current: "prostate-artery-embolization" },
    shortDescription: "Prostate artery embolization consultation for selected BPH patients in Karachi.",
    fullDescription: "Prostate artery embolization is an image-guided treatment option for selected patients with symptoms related to benign prostatic enlargement. Consultation is required to discuss diagnosis, suitability, risks and alternatives.",
    icon: "Target",
    category: "Men's Health",
    benefits: ["Minimally invasive approach", "Image-guided treatment", "Individualized care planning"],
    proceduresIncluded: ["Prostate assessment", "Prostatic artery embolization planning"],
    displayOrder: 3,
    featured: false,
  },
  {
    _id: "fallback-5",
    title: "Venous Leak Embolization",
    slug: { _type: "slug", current: "venous-leak-embolization" },
    shortDescription: "Venous leak embolization consultation for selected patients in Karachi, Pakistan.",
    fullDescription: "Venous leak embolization is an image-guided treatment that may be considered for selected patients after appropriate assessment. A consultation is needed to review symptoms, diagnostic findings, risks and alternatives.",
    icon: "ShieldCheck",
    category: "Men's Health",
    benefits: ["Image-guided assessment", "Minimally invasive approach", "Personalized treatment planning"],
    proceduresIncluded: ["Diagnostic review", "Embolization planning"],
    displayOrder: 4,
    featured: false,
  },
];

export async function getServices(): Promise<Service[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackServices;
  }

  try {
    const remoteServices = await sanityFetch<Service[]>(allServicesQuery);
    const remoteSlugs = new Set(remoteServices.map((service) => service.slug?.current));
    const missingFallbackServices = fallbackServices.filter(
      (service) => !remoteSlugs.has(service.slug.current),
    );

    return [...remoteServices, ...missingFallbackServices].sort(
      (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
    );
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
