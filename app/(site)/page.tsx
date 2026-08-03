import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import CategoryServicesSection from "@/components/CategoryServicesSection";
import DoctorsSection from "@/components/DoctorsSection";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import WhatsAppNewsletterSection from "@/components/WhatsAppNewsletterSection";

export const metadata: Metadata = buildMetadata({
  title: "IVR Pakistan Karachi | Interventional Radiology",
  description:
    "Dr. Vicky Kumar delivers advanced image-guided interventional radiology treatments in Karachi with minimally invasive care.",
  path: "/",
});

export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6fbff_0%,#eef8ff_100%)] text-slate-950">
      <Hero />
      <VideoSection />
      <AboutSection />
      <ServicesSection />
      <CategoryServicesSection />
      <DoctorsSection />
      <ReviewsSection />
      <FAQSection />
      <BlogSection />
      <ContactSection />
      <WhatsAppNewsletterSection />
    </main>
  );
}
