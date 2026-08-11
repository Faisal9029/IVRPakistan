"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Bot,
  CalendarCheck,
  Clock3,
  MapPin,
  MessageCircle,
  Stethoscope,
  X,
  type LucideIcon,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { clinics, phone } from "../lib/siteInfo";

type ChatMessage = {
  id: string;
  from: "bot" | "user";
  content: ReactNode;
};

type QuickOption = {
  id: string;
  label: string;
  icon: LucideIcon;
  reply: ReactNode;
};

const whatsappHref = `https://wa.me/${phone.whatsapp}?text=${encodeURIComponent(
  "Hello IVR Pakistan, I have a question."
)}`;

export default function ChatbotWidget() {
  const t = useTranslations("Chatbot");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const quickOptions: QuickOption[] = [
    {
      id: "timings",
      label: t("optionTimings"),
      icon: Clock3,
      reply: (
        <ul className="space-y-2">
          {clinics.map((clinic) => (
            <li key={clinic.title}>
              <span className="font-semibold text-navy dark:text-white">{clinic.title}:</span>{" "}
              {clinic.hours}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "locations",
      label: t("optionLocations"),
      icon: MapPin,
      reply: (
        <ul className="space-y-3">
          {clinics.map((clinic) => (
            <li key={clinic.title}>
              <p className="font-semibold text-navy dark:text-white">{clinic.title}</p>
              <p>{clinic.detail}</p>
              <a
                href={clinic.mapLink}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                {t("openInMaps")}
              </a>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "services",
      label: t("optionServices"),
      icon: Stethoscope,
      reply: (
        <div className="space-y-2">
          <p>{t("servicesReply")}</p>
          <Link href="/#procedures" className="font-semibold text-primary hover:underline">
            {t("servicesLink")}
          </Link>
        </div>
      ),
    },
    {
      id: "appointment",
      label: t("optionAppointment"),
      icon: CalendarCheck,
      reply: (
        <div className="space-y-2">
          <p>{t("appointmentReply")}</p>
          <Link href="/appointment" className="font-semibold text-primary hover:underline">
            {t("appointmentLink")}
          </Link>
        </div>
      ),
    },
  ];

  const handleOptionClick = (option: QuickOption) => {
    setMessages((prev) => [
      ...prev,
      { id: `${option.id}-q-${prev.length}`, from: "user", content: option.label },
      { id: `${option.id}-a-${prev.length}`, from: "bot", content: option.reply },
    ]);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="false"
            aria-labelledby={`${baseId}-title`}
            className="fixed bottom-44 right-6 z-50 flex max-h-[70vh] w-[92vw] max-w-sm flex-col overflow-hidden rounded-card border border-slate-200 bg-white shadow-hover dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-primary to-cyan px-5 py-4 text-white">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                  <Bot size={18} />
                </span>
                <div>
                  <p id={`${baseId}-title`} className="text-sm font-semibold">
                    {t("title")}
                  </p>
                  <p className="text-xs text-white/80">{t("subtitle")}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("closeLabel")}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/90 transition hover:bg-white/20"
              >
                <X size={18} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 text-small leading-6 text-navy dark:bg-slate-800 dark:text-slate-200">
                  {t("greeting")}
                </div>
              </div>

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={
                      message.from === "user"
                        ? "max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-small leading-6 text-white"
                        : "max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 text-small leading-6 text-navy dark:bg-slate-800 dark:text-slate-200"
                    }
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 p-4 dark:border-slate-800">
              <div className="flex flex-wrap gap-2">
                {quickOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleOptionClick(option)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-navy transition hover:border-primary/40 hover:bg-primary/5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      <Icon size={13} className="text-primary" />
                      {option.label}
                    </button>
                  );
                })}
              </div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-button bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
              >
                <FaWhatsapp size={16} />
                {t("whatsappCta")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? t("closeAssistantLabel") : t("openLabel")}
        aria-expanded={open}
        className="fixed bottom-24 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-slate-950/15 transition duration-200 hover:scale-105 hover:ring-4 hover:ring-primary/30"
      >
        {open ? <X size={22} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
}
