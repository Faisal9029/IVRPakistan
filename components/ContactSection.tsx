"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Building2, CalendarCheck, Clock3, Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { clinics, phone as clinicPhone, socialLinks } from "../lib/siteInfo";
import Button from "./ui/Button";

export default function ContactSection() {
  const t = useTranslations("Contact");
  const tCommon = useTranslations("Common");

  return (
    <section id="contact" className="relative bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_100%)] py-20 dark:bg-navy dark:bg-none lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">{t("eyebrow")}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy dark:text-white sm:text-4xl">{t("heading")}</h2>
          <p className="mt-6 text-base leading-8 text-muted dark:text-slate-300">
            Book a consultation with Dr. Vicky Kumar or reach out for clinic details, procedure guidance, and scheduling support.
          </p>
        </div>

        <div className="mx-auto mt-16 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} className="rounded-[32px] border border-white/70 bg-white p-8 shadow-[0_30px_80px_-34px_rgba(15,98,255,0.35)] dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{t("appointmentRequestLabel")}</p>
                <p className="text-lg font-semibold text-navy dark:text-white">{t("bookYourVisit")}</p>
              </div>
            </div>

            <p className="mt-6 text-body text-muted dark:text-slate-400">
              Fill out our appointment form with your name, phone, and a short note
              about your concern — our team confirms every request on WhatsApp.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/appointment" variant="primary" className="gap-2">
                <CalendarCheck size={18} />
                {tCommon("bookAppointment")}
              </Button>
              <a
                href={`https://wa.me/${clinicPhone.whatsapp}?text=Hello%20Dr.%20Vicky%20Kumar,%20I%20would%20like%20to%20schedule%20an%20interventional%20radiology%20consultation.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-button border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:border-primary/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <FaWhatsapp size={18} className="text-[#25D366]" />
                {t("whatsappUs")}
              </a>
            </div>
          </motion.div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/70 bg-white p-8 shadow-[0_30px_80px_-34px_rgba(15,98,255,0.25)] dark:border-slate-700 dark:bg-slate-900">
              <div className="flex flex-wrap gap-3">
                <a href="tel:+923462236220" className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  <Phone size={16} /> +92 346 2236220
                </a>
                <a href="mailto:cathlabintervention@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  <Mail size={16} /> cathlabintervention@gmail.com
                </a>
              </div>

              <div className="mt-8 space-y-4">
                {clinics.map((clinic) => (
                  <div key={clinic.title} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
                    <div className={`h-1.5 rounded-full bg-gradient-to-r ${clinic.accent}`} />
                    <h3 className="mt-4 text-lg font-semibold text-navy dark:text-white">{clinic.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted dark:text-slate-400">{clinic.detail}</p>
                    <div className="mt-3 flex items-start gap-2 text-sm text-muted dark:text-slate-400">
                      <Clock3 size={16} className="mt-0.5 text-primary" />
                      <span>{clinic.hours}</span>
                    </div>
                    <a href={clinic.mapLink} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
                      {tCommon("openGoogleMap")} &rarr;
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/70 bg-white p-8 shadow-[0_30px_80px_-34px_rgba(15,98,255,0.25)] dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Building2 size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{t("followUsLabel")}</p>
                  <p className="text-lg font-semibold text-navy dark:text-white">{t("joinCommunity")}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                      <Icon size={20} className={social.color} />
                    </a>
                  );
                })}
              </div>
              <a
                href={`https://wa.me/${clinicPhone.whatsapp}?text=Hello%20Dr.%20Vicky%20Kumar,%20I%20would%20like%20to%20schedule%20an%20interventional%20radiology%20consultation.`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-button bg-success px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
              >
                {tCommon("whatsappConsultation")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
