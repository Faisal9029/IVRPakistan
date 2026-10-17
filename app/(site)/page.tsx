import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getPosts } from "@/lib/sanity";
import LatestBlogPopup from "@/components/LatestBlogPopup";
import Hero from "@/components/Hero";
import FeaturedProcedures from "@/components/FeaturedProcedures";
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
  title: "Interventional Radiologist in Karachi, Pakistan | IVR Pakistan",
  description:
    "IVR Pakistan provides image-guided interventional radiology in Karachi, including venous leak, uterine fibroid, prostate artery and varicocele embolization consultations.",
  path: "/",
  keywords: [
    "interventional radiologist Karachi",
    "best interventional radiologist Karachi",
    "experienced interventional radiologist Karachi",
    "Dr Vicky Kumar interventional radiologist",
    "interventional radiology clinic Karachi",
    "interventional radiology Pakistan",
    "venous leak embolization Karachi",
    "uterine fibroid embolization Karachi",
    "prostate artery embolization Karachi",
    "varicocele embolization Pakistan",
  ],
});

export default async function Home() {
  const posts = await getPosts();
  const latestPost = posts[0] ?? null;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fbf9fe_0%,#f5f3fa_100%)] text-slate-950">
      <LatestBlogPopup post={latestPost} />
      <Hero />
      <FeaturedProcedures />
      <AboutSection />
      <ServicesSection />
      <CategoryServicesSection />
      <DoctorsSection />
      <ReviewsSection />
      <FAQSection />
      <BlogSection />
      <VideoSection />
      <ContactSection />
      <WhatsAppNewsletterSection />
    </main>
  );
}
