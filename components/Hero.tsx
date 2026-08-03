"use client";

import { useEffect, useRef } from "react";
import { BadgeCheck, ChevronDown, ShieldCheck, Users } from "lucide-react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import Button from "./ui/Button";
import { fadeInUp, stagger, viewportOnce } from "../lib/motion";
import { phone, socialLinks } from "../lib/siteInfo";

const highlights = ["Specialist-led care", "Minimally invasive procedures", "Karachi clinic access"];

const stats: { label: string; target: number; icon: typeof BadgeCheck; format: (n: number) => string }[] = [
  { label: "Years Experience", target: 10, icon: BadgeCheck, format: (n) => `${n}+` },
  { label: "Procedures Completed", target: 5000, icon: Users, format: (n) => `${n.toLocaleString()}+` },
  { label: "Karachi Clinics", target: 2, icon: ShieldCheck, format: (n) => `${n}` },
];

function StatCounter({
  target,
  format,
  label,
  icon: Icon,
}: {
  target: number;
  format: (n: number) => string;
  label: string;
  icon: typeof BadgeCheck;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => format(Math.round(v)));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, target, { duration: 1.4, ease: "easeOut" });
    return controls.stop;
  }, [isInView, target, count]);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      className="rounded-card border border-white/80 bg-white/90 px-6 py-5 shadow-rest backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80"
    >
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-card bg-primary/10 text-primary">
        <Icon size={24} />
      </div>
      <motion.p className="mt-5 text-3xl font-semibold text-navy dark:text-white">{display}</motion.p>
      <p className="mt-2 text-small text-muted dark:text-slate-400">{label}</p>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface px-6 py-16 dark:bg-navy sm:px-8 lg:px-10 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_25%)]" />

      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger}
            className="order-2 lg:order-1"
          >
            <motion.div variants={fadeInUp} className="mb-6 flex items-center justify-start lg:hidden">
              <div className="flex gap-3 rounded-card border border-white/80 bg-white/80 p-3 shadow-rest backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-card border border-slate-200 bg-slate-50 text-slate-700 transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-slate-800"
                    >
                      <Icon size={16} className={social.color} />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            <div className="lg:flex lg:items-start lg:gap-4">
              <motion.div
                variants={fadeInUp}
                className="hidden flex-col gap-3 rounded-card border border-white/80 bg-white/80 p-3 shadow-rest backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80 lg:flex"
              >
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-card border border-slate-200 bg-slate-50 text-slate-700 transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-slate-800"
                    >
                      <Icon size={18} className={social.color} />
                    </a>
                  );
                })}
              </motion.div>

              <div className="flex-1">
                <motion.span
                  variants={fadeInUp}
                  className="inline-flex rounded-button bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-primary shadow-rest dark:bg-slate-900/90"
                >
                  Trusted Interventional Radiology Center
                </motion.span>

                <motion.h1
                  variants={fadeInUp}
                  className="mt-6 text-h1 font-black tracking-tight text-navy dark:text-white"
                >
                  Dr. Vicky Kumar — Advanced Interventional Radiology Care in Karachi
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="mt-3 text-small font-semibold uppercase tracking-[0.2em] text-muted dark:text-slate-400"
                >
                  MBBS, FCPS, Fellowship in Interventional Radiology
                </motion.p>
              </div>
            </div>

            <motion.p variants={fadeInUp} className="mt-6 max-w-2xl text-lead text-muted dark:text-slate-300">
              Delivering image-guided, minimally invasive treatment for vascular,
              pelvic, urological, and oncologic conditions — with faster recovery and
              compassionate, patient-first care.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-button border border-slate-200 bg-white/80 px-3.5 py-2 text-small font-medium text-navy shadow-rest dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
                >
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/appointment" variant="primary" className="px-6 py-4">
                Book Appointment
              </Button>

              <a
                href={`https://wa.me/${phone.whatsapp}?text=Hello%20Dr.%20Vicky%20Kumar,%20I%20would%20like%20to%20schedule%20an%20interventional%20radiology%20consultation.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-button border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-navy shadow-rest transition duration-300 hover:border-primary hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                WhatsApp Consultation
              </a>
            </motion.div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <StatCounter
                  key={stat.label}
                  target={stat.target}
                  format={stat.format}
                  label={stat.label}
                  icon={stat.icon}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeInUp}
            className="relative order-1 lg:order-2"
          >
            <div className="absolute inset-0 rounded-card bg-gradient-to-br from-white via-slate-100 to-cyan/20 blur-3xl dark:from-slate-800 dark:via-slate-900 dark:to-cyan/10" />

            <div className="relative overflow-hidden rounded-card border border-white/80 bg-white/90 p-4 shadow-hover dark:border-slate-700 dark:bg-slate-900/90">
              <div className="relative h-[560px] w-full overflow-hidden rounded-card bg-gradient-to-b from-cyan/10 to-surface">
                <Image
                  src="/doctors.png"
                  alt="Dr. Vicky Kumar, Interventional Radiologist, performing an image-guided procedure"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain object-top scale-105"
                />
              </div>
            </div>

            <div className="float-card absolute left-0 top-10 w-full px-4 sm:px-0">
              <div className="max-w-sm rounded-card border border-white/80 bg-white/90 p-4 shadow-hover backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90">
                <div className="flex items-center gap-2">
                  <span className="h-9 w-9 rounded-full border-2 border-white bg-primary" />
                  <span className="-ml-3 h-9 w-9 rounded-full border-2 border-white bg-cyan" />
                  <span className="-ml-3 h-9 w-9 rounded-full border-2 border-white bg-primary/70" />
                </div>

                <p className="mt-4 text-small font-semibold text-navy dark:text-white">Live Consultations</p>
                <p className="mt-1 text-small text-muted dark:text-slate-400">Dr. Vicky Kumar</p>
              </div>
            </div>

            <div className="float-card float-card-delay absolute bottom-10 right-0 w-full px-4 sm:px-0">
              <div className="ml-auto max-w-xs rounded-card border border-white/80 bg-white/90 p-4 shadow-hover backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      className="h-5 w-5 text-amber-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="mt-4 text-lead font-semibold text-navy dark:text-white">4.9 / 5.0</p>
                <p className="mt-1 text-small text-muted dark:text-slate-400">Trusted by Patients</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="mt-12 flex justify-center lg:mt-16"
        >
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-1.5 rounded-button border border-slate-200 bg-white/80 px-5 py-2.5 text-small font-medium text-navy shadow-rest backdrop-blur transition hover:border-primary/30 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
          >
            Scroll down to explore more
            <ChevronDown size={16} className="text-primary motion-safe:animate-bounce" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
