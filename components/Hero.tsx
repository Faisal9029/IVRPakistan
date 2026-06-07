"use client";

import {
  BadgeCheck,
  Calendar,
  ShieldCheck,
  Users,
} from "lucide-react";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const stats = [
  {
    label: "Years Experience",
    value: "10+",
    icon: BadgeCheck,
  },
  {
    label: "Procedures Completed",
    value: "5,000+",
    icon: Users,
  },
  {
    label: "Karachi Clinics",
    value: "2",
    icon: ShieldCheck,
  },
  {
    label: "Minimally Invasive",
    value: "Care",
    icon: Calendar,
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#eff9ff] px-6 py-16 sm:px-8 lg:px-10 lg:py-24">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_25%)]" />

      <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* MAIN GRID */}
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >

            {/* Badge */}
            <span className="inline-flex rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-[#0f62ff] shadow-md shadow-slate-200/50">
              Interventional Radiology Clinic
            </span>

            {/* Heading */}
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Advanced Interventional Radiology Treatments in Karachi
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Minimally invasive image-guided procedures with faster recovery
              and expert care by Dr. Vicky Kumar.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              {/* Appointment Button */}
              <Link
                href="/appointment"
                className="inline-flex items-center justify-center rounded-3xl bg-[#0f62ff] px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-[#0f62ff]/20 transition duration-300 hover:scale-[1.02] hover:bg-[#0c4ad8]"
              >
                Book Appointment
              </Link>

              {/* WhatsApp */}
              <a
                href="https://wa.me/923462236220?text=Hello%20Dr.%20Vicky%20Kumar,%20I%20would%20like%20to%20schedule%20an%20interventional%20radiology%20consultation."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-950 shadow-sm transition duration-300 hover:border-[#0f62ff] hover:bg-slate-50"
              >
                WhatsApp Consultation
              </a>

            </div>

            {/* Stats */}
            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-[28px] border border-white/80 bg-white/90 px-6 py-5 shadow-lg shadow-slate-200/40 backdrop-blur-xl"
                  >

                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e0f2fe] text-[#0f62ff]">
                      <Icon size={24} />
                    </div>

                    <p className="mt-5 text-3xl font-semibold text-slate-950">
                      {stat.value}
                    </p>

                    <p className="mt-2 text-sm text-slate-600">
                      {stat.label}
                    </p>

                  </motion.div>
                );
              })}

            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="order-1 lg:order-2 relative"
          >

            {/* Glow */}
            <div className="absolute inset-0 rounded-[50px] bg-gradient-to-br from-white via-slate-100 to-[#dbeafe] blur-3xl" />

            {/* Image Card */}
            <div className="relative overflow-hidden rounded-[50px] border border-white/80 bg-white/90 p-4 shadow-2xl shadow-slate-200/50">

              <div className="relative h-[560px] w-full overflow-hidden rounded-[40px] bg-gradient-to-b from-[#dbeafe] to-[#eff6ff]">

                <Image
                  src="/doctors.png"
                  alt="Dr Vicky Kumar"
                  fill
                  priority
                  className="object-contain object-top scale-105"
                />

              </div>
            </div>

            {/* Floating Card 1 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-0 top-10 hidden w-full px-4 sm:block sm:px-0"
            >

              <div className="max-w-sm rounded-3xl border border-white/80 bg-white/90 p-4 shadow-2xl shadow-slate-200/50 backdrop-blur-xl">

                <div className="flex items-center gap-2">

                  <span className="h-9 w-9 rounded-full border-2 border-white bg-[#1677ff]" />

                  <span className="-ml-3 h-9 w-9 rounded-full border-2 border-white bg-[#06b6d4]" />

                  <span className="-ml-3 h-9 w-9 rounded-full border-2 border-white bg-[#1d4ed8]" />

                </div>

                <p className="mt-4 text-sm font-semibold text-slate-900">
                  Live Consultations
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Dr. Vicky Kumar
                </p>

              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-10 right-0 hidden w-full px-4 sm:block sm:px-0"
            >

              <div className="ml-auto max-w-[18rem] rounded-3xl border border-white/80 bg-white/90 p-4 shadow-2xl shadow-slate-200/50 backdrop-blur-xl">

                {/* Stars */}
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

                <p className="mt-4 text-lg font-semibold text-slate-900">
                  4.9 / 5.0
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Trusted by Patients
                </p>

              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}