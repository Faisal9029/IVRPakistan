"use client";

import { AlertCircle, CheckCircle, Loader2, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, type ChangeEvent, type FormEvent } from "react";

type FormData = {
  name: string;
  rating: number;
  review: string;
  consentGiven: boolean;
  website: string;
};

const initialForm: FormData = {
  name: "",
  rating: 0,
  review: "",
  consentGiven: false,
  website: "",
};

const inputClass =
  "mt-2 w-full rounded-card border border-slate-200 bg-slate-50 px-4 py-3 text-navy outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900";

export default function ReviewSubmissionForm() {
  const t = useTranslations("ReviewForm");
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    const nextValue = type === "checkbox" ? (event.target as HTMLInputElement).checked : value;
    setFormData((previous) => ({ ...previous, [name]: nextValue }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message ?? t("error"));
      }

      setStatus("success");
      setFeedback(result?.message ?? t("success"));
      setFormData(initialForm);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : t("error"));
    }
  };

  return (
    <div className="mx-auto mt-12 max-w-3xl rounded-card border border-slate-200 bg-white p-6 shadow-rest dark:border-slate-700 dark:bg-slate-900 sm:p-8">
      <div className="text-center">
        <h3 className="text-h3 font-semibold text-navy dark:text-white">{t("heading")}</h3>
        <p className="mt-2 text-small leading-6 text-muted dark:text-slate-400">{t("subheading")}</p>
      </div>

      <form className="mt-8 grid gap-5" onSubmit={handleSubmit} noValidate>
        <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="review-website">Leave this field empty</label>
          <input
            id="review-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <label className="flex flex-col text-small font-medium text-navy dark:text-slate-300">
          {t("nameLabel")}
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            placeholder={t("namePlaceholder")}
            maxLength={80}
            required
          />
        </label>

        <fieldset>
          <legend className="text-small font-medium text-navy dark:text-slate-300">{t("ratingLabel")}</legend>
          <div className="mt-2 flex gap-1" role="radiogroup" aria-label={t("ratingLabel")}>
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={formData.rating === value}
                aria-label={`${value} ${t("stars")}`}
                onClick={() => setFormData((previous) => ({ ...previous, rating: value }))}
                className="rounded-md p-1 transition hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:hover:bg-amber-950/30"
              >
                <Star
                  size={28}
                  className={formData.rating >= value ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-600"}
                />
              </button>
            ))}
          </div>
        </fieldset>

        <label className="flex flex-col text-small font-medium text-navy dark:text-slate-300">
          {t("reviewLabel")}
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            rows={5}
            minLength={10}
            maxLength={1200}
            className={inputClass}
            placeholder={t("reviewPlaceholder")}
            required
          />
          <span className="mt-1 text-right text-xs font-normal text-muted dark:text-slate-500">
            {formData.review.length}/1200
          </span>
        </label>

        <label className="flex items-start gap-3 text-small leading-6 text-muted dark:text-slate-400">
          <input
            type="checkbox"
            name="consentGiven"
            checked={formData.consentGiven}
            onChange={handleChange}
            className="mt-1 h-4 w-4 shrink-0 accent-primary"
            required
          />
          <span>{t("consent")}</span>
        </label>

        {feedback && (
          <div
            role={status === "error" ? "alert" : "status"}
            className={`flex items-start gap-2 rounded-card px-4 py-3 text-small font-medium ${
              status === "success"
                ? "bg-success/10 text-emerald-700 dark:text-emerald-400"
                : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400"
            }`}
          >
            {status === "success" ? <CheckCircle size={18} className="mt-0.5 shrink-0" /> : <AlertCircle size={18} className="mt-0.5 shrink-0" />}
            {feedback}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-button bg-gradient-to-r from-primary to-cyan px-5 py-3.5 text-sm font-semibold text-white shadow-hover transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
          {status === "loading" ? t("submitting") : t("submit")}
        </button>
      </form>
    </div>
  );
}
