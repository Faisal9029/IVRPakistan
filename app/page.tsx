import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import VideoSection from "../components/VideoSection";
import ServicesSection from "../components/ServicesSection";
import DoctorsSection from "../components/DoctorsSection";
import ReviewsSection from "../components/ReviewsSection";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0f8ff]">
      <Navbar />
      <Hero />
      <VideoSection />
      <AboutSection />
      <ServicesSection />
      <DoctorsSection />
      <ReviewsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
