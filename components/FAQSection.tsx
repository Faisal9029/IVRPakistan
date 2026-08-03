"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Section from "./ui/Section";
import Container from "./ui/Container";
import { fadeInUp, stagger, viewportOnce } from "../lib/motion";

const faqs = [
  {
    q: "What is interventional radiology?",
    a: "Interventional radiology uses imaging guidance — such as ultrasound, CT, or fluoroscopy — to perform minimally invasive procedures through small incisions, often as an alternative to open surgery.",
  },
  {
    q: "Will I be awake during my procedure?",
    a: "Most interventional radiology procedures use local anesthesia or conscious sedation rather than general anesthesia. Your care team will explain the specific approach for your procedure during consultation.",
  },
  {
    q: "How long does recovery take?",
    a: "Recovery time depends on the specific procedure. Many minimally invasive treatments allow a quicker return to daily activity than open surgery — your care team will walk you through what to expect for your treatment.",
  },
  {
    q: "How do I book an appointment?",
    a: "You can book through our website, call +92 346 2236220, or use the WhatsApp consultation button.",
  },
  {
    q: "What are your clinic hours?",
    a: "IDC Lab Saddar Karachi: Mon, Tue, Fri & Sat, 7PM–8PM. National Medical Centre (NMC) DHA Karachi: Wed & Thu, 5PM–6PM.",
  },
  {
    q: "Do you offer online consultations?",
    a: "Yes, selected services are available online for convenience and follow-up care.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <Section id="faq" className="bg-surface dark:bg-navy">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Container className="max-w-5xl">
        <div className="rounded-card border border-white/70 bg-white/90 p-8 shadow-hover dark:border-slate-700 dark:bg-slate-900/90 sm:p-10 lg:p-12">
          <div className="text-center">
            <p className="text-small font-semibold uppercase tracking-[0.32em] text-primary">Help Center</p>
            <h2 className="mt-3 text-h2 font-bold text-navy dark:text-white">Frequently Asked Questions</h2>
            <p className="mx-auto mt-5 max-w-2xl text-body text-muted dark:text-slate-300">
              Quick answers regarding procedures, clinic visits, hours, and treatment planning.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger}
            className="mt-12 space-y-4"
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const buttonId = `${baseId}-faq-button-${index}`;
              const panelId = `${baseId}-faq-panel-${index}`;

              return (
                <motion.div
                  key={faq.q}
                  variants={fadeInUp}
                  className="rounded-card border border-slate-200 bg-slate-50/80 shadow-rest dark:border-slate-700 dark:bg-slate-800/60"
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left"
                    >
                      <span className="text-base font-semibold text-navy dark:text-white">{faq.q}</span>
                      <ChevronDown
                        size={20}
                        aria-hidden="true"
                        className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-slate-400"}`}
                      />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="px-6 pb-5 text-small leading-7 text-muted dark:text-slate-300"
                  >
                    {faq.a}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
