"use client";

import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { phone as clinicPhone } from "../lib/siteInfo";

const initialForm = {
  fullName: "",
  phone: "",
  city: "",
  reasonForVisit: "",
  message: "",
  website: "", // honeypot — real users never see or fill this
};

const cityOptions = ["Karachi", "Lahore", "Peshawar (Coming Soon)"];

const reasonOptions = [
  "OPD Consultation",
  "Penile Doppler Ultrasound",
  "Interventional Radiology Procedure",
  "Other Services",
];

type FormErrors = Partial<Record<"fullName" | "phone" | "city" | "reasonForVisit", string>>;

function validate(data: typeof initialForm): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = "Name must be at least 2 characters.";
  }

  const phoneDigits = data.phone.replace(/[^\d]/g, "");
  if (!data.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (phoneDigits.length < 7) {
    errors.phone = "Enter a valid phone number, e.g. +92 300 1234567.";
  }

  if (!data.city) {
    errors.city = "Please select which city you need the appointment in.";
  }

  if (!data.reasonForVisit) {
    errors.reasonForVisit = "Please select what your appointment is for.";
  }

  return errors;
}

const inputClass =
  "mt-2 w-full rounded-card border border-slate-200 bg-slate-50 px-4 py-3 text-navy outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 dark:border-slate-700 dark:bg-slate-800 dark:text-white";
const inputErrorClass = "border-red-300 focus:border-red-400 focus:ring-red-100";

export default function AppointmentForm() {
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

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      setFeedback("Please fix the highlighted fields below and try again.");
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
        throw new Error(
          err?.message || "Unable to submit your request — please try again in a moment."
        );
      }

      const result = await response.json();

      setFeedback(
        result.message ??
          "Request received. We'll confirm your appointment on WhatsApp shortly."
      );
      setStatus("success");

      const message = `New Appointment Request:\n\nName: ${formData.fullName}\nPhone: ${formData.phone}\nCity: ${formData.city}\nAppointment For: ${formData.reasonForVisit}\nMessage: ${formData.message || "(none provided)"}`;

      const whatsappURL = `https://wa.me/${clinicPhone.whatsapp}?text=${encodeURIComponent(message)}`;

      setFormData(initialForm);

      setTimeout(() => {
        window.open(whatsappURL, "_blank");
      }, 800);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong — please try again, or WhatsApp us directly."
      );
    }
  };

  return (
    <section className="mx-auto max-w-4xl rounded-card border border-slate-200 bg-white p-8 shadow-hover dark:border-slate-700 dark:bg-slate-900 sm:p-12">
      <div className="mb-10 text-center">
        <span className="text-small font-semibold uppercase tracking-[0.32em] text-primary">
          Online Appointment
        </span>

        <h2 className="mt-4 text-h2 font-bold text-navy dark:text-white">
          Book your visit in minutes
        </h2>

        <p className="mt-3 text-body text-muted dark:text-slate-400">
          Share your details and our team will confirm your appointment on WhatsApp shortly.
        </p>
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
          Full Name *
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`${inputClass} ${errors.fullName ? inputErrorClass : ""}`}
            placeholder="Enter your full name"
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
          Phone Number *
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`${inputClass} ${errors.phone ? inputErrorClass : ""}`}
            placeholder="+92 300 1234567"
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
          City *
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`${inputClass} ${errors.city ? inputErrorClass : ""}`}
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "city-error" : undefined}
          >
            <option value="" disabled>
              Select the city for your appointment
            </option>
            {cityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
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
          Appointment For *
          <select
            name="reasonForVisit"
            value={formData.reasonForVisit}
            onChange={handleChange}
            className={`${inputClass} ${errors.reasonForVisit ? inputErrorClass : ""}`}
            aria-invalid={!!errors.reasonForVisit}
            aria-describedby={errors.reasonForVisit ? "reasonForVisit-error" : undefined}
          >
            <option value="" disabled>
              Select a reason for your visit
            </option>
            {reasonOptions.map((option) => (
              <option key={option} value={option}>
                {option}
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
          Message
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={inputClass}
            placeholder="Tell us about your symptoms, concerns, or preferred visit time..."
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

          {status === "loading" ? "Submitting..." : "Request Appointment"}
        </button>
      </form>
    </section>
  );
}
