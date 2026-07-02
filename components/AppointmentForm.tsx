"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  preferredDate: "",
  service: "General Consultation",
  message: "",
};

const inputClass =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#1677ff] focus:ring-2 focus:ring-blue-100";

export default function AppointmentForm() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validation
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.preferredDate.trim() ||
      !formData.service.trim()
    ) {
      setFeedback("Please complete all required fields.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(
          err?.message || "Unable to submit appointment request."
        );
      }

      const result = await response.json();

      setFeedback(
        result.message ?? "Appointment request submitted successfully."
      );
      setStatus("success");

      // reset form
      setFormData(initialForm);

      // WhatsApp auto redirect
      const whatsappNumber = "923462236220";

      const message = `
New Appointment Request:

Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email}
Date: ${formData.preferredDate}
Service: ${formData.service}
Message: ${formData.message}
`;

      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;

      setTimeout(() => {
        window.open(whatsappURL, "_blank");
      }, 800);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong — please try again."
      );
    }
  };

  return (
    <section className="mx-auto max-w-4xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/30 sm:p-12">
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#1677ff]">
          Online Appointment
        </span>

        <h2 className="mt-4 text-3xl font-bold text-slate-950 sm:text-4xl">
          Book your visit in minutes
        </h2>

        <p className="mt-3 text-sm text-slate-500 sm:text-base">
          Fill out the form and our team will confirm your appointment shortly.
        </p>
      </div>

      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col text-sm font-medium text-slate-700">
            Full Name *
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter your full name"
            />
          </label>

          <label className="flex flex-col text-sm font-medium text-slate-700">
            Phone Number *
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="+92 300 1234567"
            />
          </label>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col text-sm font-medium text-slate-700">
            Email Address *
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="name@example.com"
            />
          </label>

          <label className="flex flex-col text-sm font-medium text-slate-700">
            Preferred Date *
            <input
              name="preferredDate"
              type="date"
              value={formData.preferredDate}
              onChange={handleChange}
              className={inputClass}
            />
          </label>
        </div>

        <label className="flex flex-col text-sm font-medium text-slate-700">
          Service / Department *
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={inputClass}
          >
            <option>General Consultation</option>
            <option>Pediatrics</option>
            <option>Cardiology</option>
            <option>Dermatology</option>
            <option>Dental Care</option>
            <option>Penile Doppler Ultrasound (with injection)</option>
            <option>OPD Visit</option>
            <option>Procedure Appointment</option>
          </select>
        </label>

        <label className="flex flex-col text-sm font-medium text-slate-700">
          Additional Notes
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={inputClass}
            placeholder="Tell us about your symptoms or concerns..."
          />
        </label>

        {feedback && (
          <div
            className={`rounded-2xl px-5 py-4 text-sm font-medium ${
              status === "success"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {feedback}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#1677ff] to-[#06b6d4] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#1677ff]/25 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <CheckCircle className="h-5 w-5" />
          )}

          {status === "loading"
            ? "Submitting..."
            : "Request Appointment"}
        </button>
      </form>
    </section>
  );
}