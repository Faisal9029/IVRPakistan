import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-06-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const reviews = [
  {
    _id: "patientReview-1",
    _type: "patientReview",
    name: "Ayesha Khan",
    designation: "Corporate HR Manager",
    rating: 5,
    text: "The team made the entire process comfortable and easy. My recovery was smooth and professional.",
    featured: true,
    displayOrder: 1,
  },
  {
    _id: "patientReview-2",
    _type: "patientReview",
    name: "Bilal Ahmed",
    designation: "Small Business Owner",
    rating: 4,
    text: "Excellent care from consultation to follow-up. Highly recommended for minimally invasive treatment.",
    featured: true,
    displayOrder: 2,
  },
];

const videos = [
  {
    _id: "socialVideo-1",
    _type: "socialVideo",
    title: "Interventional Radiology Overview",
    platform: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "Learn how our minimally invasive image-guided procedures help patients recover faster.",
    featured: true,
    displayOrder: 1,
  },
  {
    _id: "socialVideo-2",
    _type: "socialVideo",
    title: "Patient Journey Highlight",
    platform: "tiktok",
    videoUrl: "https://www.tiktok.com/@sample/video/7201234567890123456",
    description: "A short patient journey highlighting compassionate care and clinical expertise.",
    featured: false,
    displayOrder: 2,
  },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const procedureItems = [
  { title: "Diagnostic Angiography", category: "Vascular Procedures - Arterial" },
  { title: "Peripheral Angioplasty (PTA)", category: "Vascular Procedures - Arterial" },
  { title: "Peripheral Stenting", category: "Vascular Procedures - Arterial" },
  { title: "Thrombolysis", category: "Vascular Procedures - Arterial" },
  { title: "Thrombectomy", category: "Vascular Procedures - Arterial" },
  { title: "Endovascular Aneurysm Repair (EVAR)", category: "Vascular Procedures - Arterial" },
  { title: "Thoracic Endovascular Aortic Repair (TEVAR)", category: "Vascular Procedures - Arterial" },
  { title: "Embolization", category: "Vascular Procedures - Arterial" },
  { title: "Uterine Fibroid Embolization (UFE)", category: "Vascular Procedures - Arterial" },
  { title: "Prostate Artery Embolization (PAE)", category: "Vascular Procedures - Arterial" },
  { title: "Bronchial Artery Embolization (BAE)", category: "Vascular Procedures - Arterial" },
  { title: "Gastrointestinal Bleed Embolization", category: "Vascular Procedures - Arterial" },
  { title: "Trauma Embolization", category: "Vascular Procedures - Arterial" },
  { title: "Tumor Embolization", category: "Vascular Procedures - Arterial" },
  { title: "Venography", category: "Vascular Procedures - Venous" },
  { title: "Venous Angioplasty", category: "Vascular Procedures - Venous" },
  { title: "Venous Stenting", category: "Vascular Procedures - Venous" },
  { title: "IVC Filter Placement", category: "Vascular Procedures - Venous" },
  { title: "IVC Filter Retrieval", category: "Vascular Procedures - Venous" },
  { title: "Catheter-Directed Thrombolysis", category: "Vascular Procedures - Venous" },
  { title: "Mechanical Thrombectomy", category: "Vascular Procedures - Venous" },
  { title: "Varicocele Embolization", category: "Vascular Procedures - Venous" },
  { title: "Pelvic Congestion Syndrome Embolization", category: "Vascular Procedures - Venous" },
  { title: "Transarterial Chemoembolization (TACE)", category: "Oncology Procedures" },
  { title: "Drug-Eluting Bead TACE (DEB-TACE)", category: "Oncology Procedures" },
  { title: "Yttrium-90 Radioembolization (Y-90)", category: "Oncology Procedures" },
  { title: "Microwave Ablation (MWA)", category: "Oncology Procedures" },
  { title: "Radiofrequency Ablation (RFA)", category: "Oncology Procedures" },
  { title: "Cryoablation", category: "Oncology Procedures" },
  { title: "Irreversible Electroporation (IRE)", category: "Oncology Procedures" },
  { title: "Tumor Biopsy", category: "Oncology Procedures" },
  { title: "Percutaneous Transhepatic Cholangiography (PTC)", category: "Hepatobiliary Procedures" },
  { title: "Percutaneous Biliary Drainage (PTBD)", category: "Hepatobiliary Procedures" },
  { title: "Biliary Stent Placement", category: "Hepatobiliary Procedures" },
  { title: "Cholecystostomy Tube Placement", category: "Hepatobiliary Procedures" },
  { title: "Liver Biopsy", category: "Hepatobiliary Procedures" },
  { title: "Portal Vein Embolization (PVE)", category: "Hepatobiliary Procedures" },
  { title: "Transjugular Intrahepatic Portosystemic Shunt (TIPS)", category: "Hepatobiliary Procedures" },
  { title: "Percutaneous Nephrostomy (PCN)", category: "Genitourinary Procedures" },
  { title: "Nephroureteral Stent Placement", category: "Genitourinary Procedures" },
  { title: "Ureteric Stenting", category: "Genitourinary Procedures" },
  { title: "Kidney Biopsy", category: "Genitourinary Procedures" },
  { title: "Renal Tumor Ablation", category: "Genitourinary Procedures" },
  { title: "Renal Artery Angioplasty", category: "Genitourinary Procedures" },
  { title: "Renal Artery Stenting", category: "Genitourinary Procedures" },
  { title: "Gastrostomy Tube (PEG / PRG)", category: "Gastrointestinal Procedures" },
  { title: "Gastrojejunostomy Tube Placement", category: "Gastrointestinal Procedures" },
  { title: "Abscess Drainage", category: "Gastrointestinal Procedures" },
  { title: "Fluid Aspiration", category: "Gastrointestinal Procedures" },
  { title: "Feeding Tube Placement", category: "Gastrointestinal Procedures" },
  { title: "GI Stent Placement", category: "Gastrointestinal Procedures" },
  { title: "Esophageal Stent Placement", category: "Gastrointestinal Procedures" },
  { title: "Colonic Stent Placement", category: "Gastrointestinal Procedures" },
  { title: "Pleural Drainage", category: "Drainage Procedures" },
  { title: "Chest Tube Placement", category: "Drainage Procedures" },
  { title: "Peritoneal Drainage", category: "Drainage Procedures" },
  { title: "Pelvic Collection Drainage", category: "Drainage Procedures" },
  { title: "Biliary Drainage", category: "Drainage Procedures" },
  { title: "Nephrostomy Drainage", category: "Drainage Procedures" },
  { title: "Lung Biopsy", category: "Biopsy Procedures" },
  { title: "Bone Biopsy", category: "Biopsy Procedures" },
  { title: "Soft Tissue Biopsy", category: "Biopsy Procedures" },
  { title: "Lymph Node Biopsy", category: "Biopsy Procedures" },
  { title: "Thyroid Biopsy", category: "Biopsy Procedures" },
  { title: "Uterine Fibroid Embolization (UFE)", category: "Women's Health Procedures" },
  { title: "Pelvic Congestion Syndrome Embolization", category: "Women's Health Procedures" },
  { title: "Fallopian Tube Recanalization", category: "Women's Health Procedures" },
  { title: "Vertebroplasty", category: "Pain Management Procedures" },
  { title: "Kyphoplasty", category: "Pain Management Procedures" },
  { title: "Nerve Root Block", category: "Pain Management Procedures" },
  { title: "Facet Joint Injection", category: "Pain Management Procedures" },
  { title: "Epidural Steroid Injection", category: "Pain Management Procedures" },
  { title: "Celiac Plexus Block", category: "Pain Management Procedures" },
  { title: "Tunneled Dialysis Catheter Insertion", category: "Dialysis & Central Venous Access" },
  { title: "Non-Tunneled Dialysis Catheter", category: "Dialysis & Central Venous Access" },
  { title: "Port-a-Cath Placement", category: "Dialysis & Central Venous Access" },
  { title: "PICC Line Placement", category: "Dialysis & Central Venous Access" },
  { title: "Hickman Catheter Placement", category: "Dialysis & Central Venous Access" },
  { title: "Central Venous Catheter (CVC)", category: "Dialysis & Central Venous Access" },
  { title: "Fistulogram", category: "Dialysis & Central Venous Access" },
  { title: "AV Fistula Angioplasty", category: "Dialysis & Central Venous Access" },
  { title: "AV Graft Intervention", category: "Dialysis & Central Venous Access" },
  { title: "Cerebral Angiography", category: "Neuro-Interventional Procedures" },
  { title: "Mechanical Thrombectomy (Stroke)", category: "Neuro-Interventional Procedures" },
  { title: "Cerebral Aneurysm Coiling", category: "Neuro-Interventional Procedures" },
  { title: "Flow Diverter Placement", category: "Neuro-Interventional Procedures" },
  { title: "AVM Embolization", category: "Neuro-Interventional Procedures" },
  { title: "Carotid Artery Stenting", category: "Neuro-Interventional Procedures" },
  { title: "Intracranial Stenting", category: "Neuro-Interventional Procedures" },
];

const services = procedureItems.map((item, index) => ({
  _id: `service-${slugify(item.title)}`,
  _type: "service",
  title: item.title,
  slug: { _type: "slug", current: slugify(item.title) },
  shortDescription: `Specialized interventional radiology procedure for ${item.title}.`,
  fullDescription: `A minimally invasive image-guided procedure performed as part of ${item.category.toLowerCase()}.`,
  icon: "Target",
  category: item.category,
  benefits: ["Minimally invasive", "Targeted treatment", "Short recovery"],
  proceduresIncluded: [item.title],
  featured: false,
  displayOrder: index + 1,
}));

async function createDocuments() {
  for (const doc of [...reviews, ...videos, ...services]) {
    await client.createIfNotExists(doc);
    console.log(`Seeded document ${doc._id}`);
  }
}

createDocuments().catch((error) => {
  console.error(error);
  process.exit(1);
});
