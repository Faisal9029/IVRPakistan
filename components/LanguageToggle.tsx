"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { localeCookieName, type Locale } from "../lib/locale";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("Language");

  function switchLocale(next: Locale) {
    if (next === locale) return;
    document.cookie = `${localeCookieName}=${next}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  }

  return (
    <div
      role="group"
      aria-label={t("toggleLabel")}
      className="inline-flex items-center rounded-button border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900"
    >
      <button
        type="button"
        onClick={() => switchLocale("en")}
        aria-pressed={locale === "en"}
        className={`rounded-button px-2.5 py-1.5 text-xs font-semibold transition ${
          locale === "en"
            ? "bg-primary text-white"
            : "text-navy hover:text-primary dark:text-slate-300"
        }`}
      >
        {t("english")}
      </button>
      <button
        type="button"
        onClick={() => switchLocale("ur")}
        aria-pressed={locale === "ur"}
        className={`rounded-button px-2.5 py-1.5 text-xs font-semibold transition ${
          locale === "ur"
            ? "bg-primary text-white"
            : "text-navy hover:text-primary dark:text-slate-300"
        }`}
      >
        {t("urdu")}
      </button>
    </div>
  );
}
