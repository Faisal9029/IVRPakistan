import { clinics } from "./siteInfo";

export type LocationPage = {
  slug: "karachi" | "lahore" | "islamabad";
  city: string;
  title: string;
  description: string;
  intro: string;
  serviceSlugs: string[];
};

export const locationPages: LocationPage[] = [
  {
    slug: "karachi",
    city: "Karachi",
    title: "Interventional Radiologist in Karachi | IVR Pakistan",
    description:
      "Book an interventional radiology consultation in Karachi with IVR Pakistan. Explore image-guided embolization, vascular procedures and minimally invasive care.",
    intro:
      "IVR Pakistan provides specialist-led interventional radiology consultations in Karachi. Our team helps patients understand suitable image-guided and minimally invasive treatment options after a clinical assessment.",
    serviceSlugs: [
      "venous-leak-embolization",
      "varicocele-embolization",
      "prostate-artery-embolization",
      "uterine-fibroid-embolization-ufe",
      "peripheral-angioplasty-pta",
    ],
  },
  {
    slug: "lahore",
    city: "Lahore",
    title: "Interventional Radiologist in Lahore | IVR Pakistan",
    description:
      "Find IVR Pakistan interventional radiology consultation information for Lahore, including image-guided procedures, appointment guidance and clinic updates.",
    intro:
      "IVR Pakistan provides scheduled interventional radiology visits in Lahore. Please confirm the latest clinic date, availability and procedure suitability by phone or WhatsApp before travelling.",
    serviceSlugs: [
      "uterine-fibroid-embolization-ufe",
      "prostate-artery-embolization",
      "venous-leak-embolization",
      "varicocele-embolization",
      "fallopian-tube-recanalization",
    ],
  },
  {
    slug: "islamabad",
    city: "Islamabad",
    title: "Interventional Radiologist in Islamabad | IVR Pakistan",
    description:
      "Find IVR Pakistan interventional radiology consultation information for Islamabad, including appointment guidance and minimally invasive procedure options.",
    intro:
      "IVR Pakistan provides scheduled interventional radiology visits in Islamabad. Clinic dates and availability can change, so please confirm the current schedule and consultation requirements before travelling.",
    serviceSlugs: [
      "uterine-fibroid-embolization-ufe",
      "prostate-artery-embolization",
      "venous-leak-embolization",
      "varicocele-embolization",
      "peripheral-angioplasty-pta",
    ],
  },
];

export function getLocationPage(slug: string) {
  return locationPages.find((location) => location.slug === slug);
}

export function getClinicsForCity(city: string) {
  return clinics.filter((clinic) => clinic.city.toLowerCase() === city.toLowerCase());
}
