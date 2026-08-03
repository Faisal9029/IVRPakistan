import { getServices, groupServicesByCategory } from "../lib/sanity";
import ServicesSectionClient from "./ServicesSectionClient";

export default async function ServicesSection() {
  const procedures = await getServices();
  const categories = groupServicesByCategory(procedures);

  return <ServicesSectionClient categories={categories} />;
}
