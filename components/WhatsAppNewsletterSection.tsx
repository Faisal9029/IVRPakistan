import Link from "next/link";
import { ArrowRight, MessageCircleMore } from "lucide-react";

export default function WhatsAppNewsletterSection() {
  return (
    <section className="bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_100%)] py-20 dark:bg-navy dark:bg-none lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_35px_90px_-35px_rgba(15,98,255,0.35)] dark:border-slate-700 dark:bg-slate-900 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
                Stay Connected
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy dark:text-white sm:text-4xl">
                Join our WhatsApp channel for updates, appointment notices, and clinic announcements
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted dark:text-slate-300">
                Receive timely reminders, procedure updates, and clinic information directly on WhatsApp.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
              <div className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                <MessageCircleMore size={24} />
              </div>
              <p className="mt-5 text-lg font-semibold text-navy dark:text-white">
                Subscribe on WhatsApp
              </p>
              <p className="mt-3 text-sm leading-7 text-muted dark:text-slate-400">
                Follow our channel for direct updates and quick support from the IVR Pakistan team.
              </p>
              <Link
                href="https://whatsapp.com/channel/0029VbBN0Yq2v1Iq8uvsbT1Z"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#22c55e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16a34a]"
              >
                Subscribe on WhatsApp
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
