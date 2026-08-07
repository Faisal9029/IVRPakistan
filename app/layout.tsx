import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import WhatsAppFloatingButton from "../components/WhatsAppFloatingButton";
import ChatbotWidget from "../components/ChatbotWidget";
import MotionProvider from "../components/MotionProvider";
import { buildMetadata, SITE_NAME, SITE_URL } from "../lib/seo";
import { clinics, email, phone } from "../lib/siteInfo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({
    title: "IVR Pakistan Karachi | Interventional Radiology",
    description:
      "Dr. Vicky Kumar delivers advanced image-guided interventional radiology treatments in Karachi with minimally invasive care.",
    path: "/",
  }),
};

const medicalClinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: SITE_NAME,
  url: SITE_URL,
  telephone: phone.tel,
  email,
  medicalSpecialty: "Interventional Radiology",
  department: clinics.map((clinic) => ({
    "@type": "MedicalClinic",
    name: clinic.title,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.detail,
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(medicalClinicJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var s=localStorage.getItem('ivrp-theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();",
          }}
        />
        <MotionProvider>
          {children}
          <WhatsAppFloatingButton />
          <ChatbotWidget />
        </MotionProvider>
        <Script
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6462611446094651"
        />
      </body>
    </html>
  );
}