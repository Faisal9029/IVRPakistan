"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const faqs = [
  {
    q: "How do I book an appointment?",
    a: "You can book an appointment through our website or call +92 346 2236220.",
  },
  {
    q: "What are your clinic hours?",
    a: "Monday to Saturday 9AM–6PM, Sunday 10AM–2PM.",
  },
  {
    q: "Do you offer online consultations?",
    a: "Yes, selected services are available online.",
  },
  {
    q: "What insurance plans do you accept?",
    a: "We accept most major insurance plans. Please confirm via call.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  // filtered FAQs
  const filteredFaqs = useMemo(() => {
    return faqs.filter(
      (f) =>
        f.q.toLowerCase().includes(search.toLowerCase()) ||
        f.a.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <section id="faq" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-6">

        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1677ff]">
            Help Center
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
            Frequently Asked Questions
          </h2>

          {/* Search */}
          <div className="relative mx-auto mt-8 max-w-md">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#1677ff] focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* FAQ List */}
        <div className="mt-12 space-y-4">
          {filteredFaqs.length === 0 && (
            <p className="text-center text-sm text-slate-500">
              No results found.
            </p>
          )}

          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold text-slate-950 hover:text-[#1677ff]"
                >
                  {faq.q}

                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid overflow-hidden px-6 text-sm text-slate-600 transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] py-4 opacity-100"
                      : "grid-rows-[0fr] py-0 opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">{faq.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}