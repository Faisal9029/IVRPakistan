"use client";

import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { phone as clinicPhone } from "../lib/siteInfo";

const initialForm = {
  fullName: "",
  phone: "",
  city: "",
  preferredDate: "",
  reasonForVisit: "",
  message: "",
  website: "", // honeypot — real users never see or fill this
};

function todayISODate() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 10);
}

const cityOptions = [
  { value: "Karachi", labelKey: "cityKarachi" },
  { value: "Lahore", labelKey: "cityLahore" },
  { value: "Peshawar (Coming Soon)", labelKey: "cityPeshawar" },
] as const;

const reasonOptions = [
  { value: "OPD Consultation", labelKey: "reasonOpd" },
  { value: "Penile Doppler Ultrasound", labelKey: "reasonDoppler" },
  { value: "Interventional Radiology Procedure", labelKey: "reasonProcedure" },
  { value: "Other Services", labelKey: "reasonOther" },
] as const;

type FormErrors = Partial<
  Record<"fullName" | "phone" | "city" | "preferredDate" | "reasonForVisit", string>
>;

function validate(data: typeof initialForm, t: (key: string) => string): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = t("fullNameRequired");
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = t("fullNameTooShort");
  }

  const phoneDigits = data.phone.replace(/[^\d]/g, "");
  if (!data.phone.trim()) {
    errors.phone = t("phoneRequired");
  } else if (phoneDigits.length < 7) {
    errors.phone = t("phoneInvalid");
  }

  if (!data.city) {
    errors.city = t("cityRequired");
  }

  if (!data.preferredDate) {
    errors.preferredDate = t("dateRequired");
  } else if (data.preferredDate < todayISODate()) {
    errors.preferredDate = t("datePast");
  }

  if (!data.reasonForVisit) {
    errors.reasonForVisit = t("reasonRequired");
  }

  return errors;
}

const inputClass =
  "mt-2 w-full rounded-card border border-slate-200 bg-slate-50 px-4 py-3 text-navy outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 dark:border-slate-700 dark:bg-slate-800 dark:text-white";
const inputErrorClass = "border-red-300 focus:border-red-400 focus:ring-red-100";

export default function AppointmentForm() {
  const t = useTranslations("AppointmentForm");
  const tCommon = useTranslations("Common");
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name in errors) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(formData, t);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      setFeedback(t("fixErrors"));
      return;
    }

    setStatus("loading");
    setFeedback("");
    setErrors({});

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.message || t("genericError"));
      }

      const result = await response.json();

      setFeedback(result.message ?? t("defaultSuccess"));
      setStatus("success");

      const message = `New Appointment Request:\n\nName: ${formData.fullName}\nPhone: ${formData.phone}\nCity: ${formData.city}\nPreferred Date: ${formData.preferredDate}\nAppointment For: ${formData.reasonForVisit}\nMessage: ${formData.message || "(none provided)"}`;

      const whatsappURL = `https://wa.me/${clinicPhone.whatsapp}?text=${encodeURIComponent(message)}`;

      setFormData(initialForm);

      setTimeout(() => {
        window.open(whatsappURL, "_blank");
      }, 800);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : t("genericErrorFallback"));
    }
  };

  return (
    <section className="mx-auto max-w-4xl rounded-card border border-slate-200 bg-white p-8 shadow-hover dark:border-slate-700 dark:bg-slate-900 sm:p-12">
      <div className="mb-10 text-center">
        <span className="text-small font-semibold uppercase tracking-[0.32em] text-primary">
          {t("eyebrow")}
        </span>

        <h2 className="mt-4 text-h2 font-bold text-navy dark:text-white">{t("heading")}</h2>

        <p className="mt-3 text-body text-muted dark:text-slate-400">{t("subheading")}</p>
      </div>

      <form className="grid gap-6" onSubmit={handleSubmit} noValidate>
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
        >
          <label htmlFor="website">Leave this field empty</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <label className="flex flex-col text-small font-medium text-navy dark:text-slate-300">
          {t("fullNameLabel")}
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`${inputClass} ${errors.fullName ? inputErrorClass : ""}`}
            placeholder={t("fullNamePlaceholder")}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName && (
            <span id="fullName-error" className="mt-1.5 flex items-center gap-1.5 text-small text-red-600">
              <AlertCircle size={14} /> {errors.fullName}
            </span>
          )}
        </label>

        <label className="flex flex-col text-small font-medium text-navy dark:text-slate-300">
          {t("phoneLabel")}
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`${inputClass} ${errors.phone ? inputErrorClass : ""}`}
            placeholder={t("phonePlaceholder")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <span id="phone-error" className="mt-1.5 flex items-center gap-1.5 text-small text-red-600">
              <AlertCircle size={14} /> {errors.phone}
            </span>
          )}
        </label>

        <label className="flex flex-col text-small font-medium text-navy dark:text-slate-300">
          {t("cityLabel")}
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`${inputClass} ${errors.city ? inputErrorClass : ""}`}
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "city-error" : undefined}
          >
            <option value="" disabled>
              {t("cityPlaceholder")}
            </option>
            {cityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.labelKey)}
              </option>
            ))}
          </select>
          {errors.city && (
            <span id="city-error" className="mt-1.5 flex items-center gap-1.5 text-small text-red-600">
              <AlertCircle size={14} /> {errors.city}
            </span>
          )}
        </label>

        <label className="flex flex-col text-small font-medium text-navy dark:text-slate-300">
          {t("dateLabel")}
          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            min={todayISODate()}
            className={`${inputClass} ${errors.preferredDate ? inputErrorClass : ""}`}
            aria-invalid={!!errors.preferredDate}
            aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
          />
          {errors.preferredDate && (
            <span id="preferredDate-error" className="mt-1.5 flex items-center gap-1.5 text-small text-red-600">
              <AlertCircle size={14} /> {errors.preferredDate}
            </span>
          )}
        </label>

        <label className="flex flex-col text-small font-medium text-navy dark:text-slate-300">
          {t("reasonLabel")}
          <select
            name="reasonForVisit"
            value={formData.reasonForVisit}
            onChange={handleChange}
            className={`${inputClass} ${errors.reasonForVisit ? inputErrorClass : ""}`}
            aria-invalid={!!errors.reasonForVisit}
            aria-describedby={errors.reasonForVisit ? "reasonForVisit-error" : undefined}
          >
            <option value="" disabled>
              {t("reasonPlaceholder")}
            </option>
            {reasonOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.labelKey)}
              </option>
            ))}
          </select>
          {errors.reasonForVisit && (
            <span id="reasonForVisit-error" className="mt-1.5 flex items-center gap-1.5 text-small text-red-600">
              <AlertCircle size={14} /> {errors.reasonForVisit}
            </span>
          )}
        </label>

        <label className="flex flex-col text-small font-medium text-navy dark:text-slate-300">
          {t("messageLabel")}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={inputClass}
            placeholder={t("messagePlaceholder")}
          />
        </label>

        {feedback && (
          <div
            role={status === "error" ? "alert" : "status"}
            className={`flex items-start gap-2 rounded-card px-5 py-4 text-small font-medium ${
              status === "success"
                ? "bg-success/10 text-emerald-700 dark:text-emerald-400"
                : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400"
            }`}
          >
            {status === "success" ? (
              <CheckCircle size={18} className="mt-0.5 shrink-0" />
            ) : (
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
            )}
            {feedback}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="inline-flex items-center justify-center gap-3 rounded-button bg-gradient-to-r from-primary to-cyan px-6 py-4 text-sm font-semibold text-white shadow-hover transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <CheckCircle className="h-5 w-5" />
          )}

          {status === "loading" ? tCommon("submitting") : tCommon("requestAppointment")}
        </button>
      </form>
    </section>
  );
}
