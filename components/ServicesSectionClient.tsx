"use client";

import { useState } from "react";
import { Target } from "lucide-react";
import type { Service } from "../sanity/lib/queries";

type CategoryGroup = {
  name: string;
  count: number;
  procedures: Service[];
};

type ServicesSectionClientProps = {
  categories: CategoryGroup[];
};

export default function ServicesSectionClient({ categories }: ServicesSectionClientProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.name ?? "");
  const activeGroup = categories.find((group) => group.name === activeCategory) ?? categories[0];

  return (
    <section id="procedures" className="relative bg-[#f5fbff] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#0f62ff]">
            Procedure Categories
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Tap a category to reveal linked procedures
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Select a category to view the procedures it contains without leaving the homepage.
          </p>
        </div>

        <div className="mx-auto mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => {
            const isActive = category.name === activeCategory;
            return (
              <button
                key={category.name}
                type="button"
                onClick={() => setActiveCategory(category.name)}
                className={`rounded-3xl border px-4 py-4 text-left transition ${
                  isActive
                    ? "border-[#0f62ff] bg-white shadow-sm shadow-slate-200/70"
                    : "border-transparent bg-white/90 hover:border-slate-200 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{category.name}</p>
                    <p className="mt-1 text-xs text-slate-600">{category.count} procedure{category.count === 1 ? "" : "s"}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e0f2fe] text-[#0f62ff]">
                    <Target size={18} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {activeGroup?.procedures.map((procedure) => (
            <div
              key={procedure._id}
              className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-950">{procedure.title}</p>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-600">
                  {procedure.category ?? "General"}
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-600">{procedure.shortDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
