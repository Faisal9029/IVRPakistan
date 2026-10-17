import { ArrowRight, CalendarCheck, HeartPulse, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Container from "./ui/Container";

const maleProcedures = [
  { key: "prostate", href: "/services/prostate-artery-embolization" },
  { key: "venousLeak", href: "/services/venous-leak-embolization" },
  { key: "varicocele", href: "/services/varicocele-embolization" },
  { key: "varicoseVeins", href: "/#procedures" },
] as const;

const femaleProcedures = [
  { key: "fibroids", href: "/services/uterine-fibroid-embolization-ufe" },
  { key: "uterineAvm", href: "/#procedures" },
  { key: "ovarianCyst", href: "/#procedures" },
  { key: "fallopianTubes", href: "/#procedures" },
  { key: "peripheral", href: "/#procedures" },
] as const;

function ProcedureCard({
  title,
  href,
  index,
}: {
  title: string;
  href: string;
  index: number;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-[76px] items-center gap-4 rounded-2xl border border-slate-200/90 bg-white px-4 py-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-hover dark:border-slate-700 dark:bg-slate-900"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary transition group-hover:bg-primary group-hover:text-white">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="flex-1 text-sm font-semibold leading-6 text-navy dark:text-white">{title}</span>
      <ArrowRight size={17} className="shrink-0 text-primary transition group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

export default async function FeaturedProcedures() {
  const t = await getTranslations("FeaturedProcedures");

  return (
    <section id="featured-procedures" className="relative overflow-hidden border-y border-primary/10 bg-white py-16 dark:bg-navy sm:py-20">
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan/10 blur-3xl" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-button bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">
            <HeartPulse size={15} aria-hidden="true" />
            {t("eyebrow")}
          </span>
          <h2 className="mt-5 text-h2 font-bold tracking-tight text-navy dark:text-white">{t("heading")}</h2>
          <p className="mt-5 text-body leading-7 text-muted dark:text-slate-300">{t("description")}</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-primary/15 bg-[#fbf9fe] p-5 shadow-rest sm:p-6">
            <div className="flex items-center gap-4 border-b border-primary/10 pb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#27243a] text-white">
                <Users size={23} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">{t("maleLabel")}</p>
                <p className="mt-1 text-sm text-muted dark:text-slate-400">{t("maleDescription")}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {maleProcedures.map((procedure, index) => (
                <ProcedureCard key={procedure.key} title={t(`procedures.${procedure.key}`)} href={procedure.href} index={index} />
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-[#d9b6e6] bg-gradient-to-br from-[#fffafd] to-[#f5edf8] p-5 shadow-rest sm:p-6">
            <div className="flex items-center gap-4 border-b border-primary/10 pb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                <HeartPulse size={23} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">{t("femaleLabel")}</p>
                <p className="mt-1 text-sm text-muted dark:text-slate-400">{t("femaleDescription")}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {femaleProcedures.map((procedure, index) => (
                <ProcedureCard key={procedure.key} title={t(`procedures.${procedure.key}`)} href={procedure.href} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
          <Link href="/#procedures" className="inline-flex items-center gap-2 rounded-button border border-primary/20 bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:bg-primary/5 dark:bg-slate-900">
            {t("viewAll")} <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/appointment" className="inline-flex items-center gap-2 rounded-button bg-primary px-5 py-3 text-sm font-semibold text-white shadow-rest transition hover:-translate-y-0.5 hover:shadow-hover">
            <CalendarCheck size={17} aria-hidden="true" />
            {t("bookAppointment")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
