import { CheckCircle } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#0f62ff]">
            About Dr. Vicky Kumar
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Interventional Radiology Expertise in Karachi
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-600">
            Dr. Vicky Kumar is a dedicated Interventional Radiologist specializing in minimally invasive, image-guided procedures for vascular, pelvic, urological, and oncologic care.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl gap-8 lg:max-w-none lg:grid-cols-3">
          {[
            {
              title: "Image-Guided Precision",
              desc: "Advanced interventions using CT, ultrasound, and fluoroscopy guidance.",
            },
            {
              title: "Minimally Invasive Care",
              desc: "Faster recovery and less discomfort than traditional surgery.",
            },
            {
              title: "Specialized Procedures",
              desc: "From embolization to angioplasty and cancer-directed treatments.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:shadow-md hover:border-[#0f62ff]/20">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[#e0f2fe] text-[#0f62ff]">
                <CheckCircle size={24} />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
