import Image from "next/image";
import { Activity, HeartHandshake, ScanLine, Target, Zap } from "lucide-react";
import Section from "./ui/Section";
import Container from "./ui/Container";
import Card from "./ui/Card";

const expertise = [
  {
    icon: ScanLine,
    title: "Image-Guided Precision",
    desc: "Advanced interventions using CT, ultrasound, and fluoroscopy guidance.",
  },
  {
    icon: Activity,
    title: "Minimally Invasive Care",
    desc: "Faster recovery and less discomfort than traditional surgery.",
  },
  {
    icon: Target,
    title: "Specialized Procedures",
    desc: "From embolization to angioplasty and cancer-directed treatments.",
  },
];

const whyChooseUs = [
  {
    icon: ScanLine,
    title: "Advanced image-guided procedures",
    desc: "Every intervention is planned and performed under real-time CT, ultrasound, or fluoroscopy guidance for precision and safety.",
  },
  {
    icon: Zap,
    title: "Fast recovery pathways",
    desc: "Minimally invasive access means shorter procedures, outpatient options, and quicker return to daily life.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized care",
    desc: "Treatment plans are built around each patient's specific condition, with clear guidance from consultation through follow-up.",
  },
];

export default function AboutSection() {
  return (
    <Section id="about" className="bg-white dark:bg-navy">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-card bg-gradient-to-br from-primary/10 via-transparent to-cyan/20 blur-3xl" />
            <div className="relative h-[420px] overflow-hidden rounded-card border border-slate-200 shadow-rest dark:border-slate-700 lg:h-[520px]">
              <Image
                src="/doctors.png"
                alt="Dr. Vicky Kumar performing an image-guided interventional radiology procedure"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div>
            <span className="text-small font-semibold uppercase tracking-[0.32em] text-primary">
              About Dr. Vicky Kumar
            </span>
            <h2 className="mt-4 text-h2 font-bold tracking-tight text-navy dark:text-white">
              Interventional Radiology Expertise in Karachi
            </h2>
            <p className="mt-3 text-small font-semibold uppercase tracking-[0.2em] text-muted dark:text-slate-400">
              MBBS, FCPS, Fellowship in Interventional Radiology
            </p>
            <p className="mt-4 text-body text-muted dark:text-slate-300">
              Dr. Vicky Kumar is a dedicated Interventional Radiologist specializing in
              minimally invasive, image-guided procedures for vascular, pelvic,
              urological, and oncologic care.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {expertise.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.title}
                    className="rounded-card border border-slate-200 bg-slate-50 p-6 shadow-rest transition hover:shadow-hover hover:border-primary/20 dark:border-slate-700 dark:bg-slate-900"
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-card bg-primary/10 text-primary">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-navy dark:text-white">{item.title}</h3>
                    <p className="mt-2 text-small text-muted dark:text-slate-400">{item.desc}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-small font-semibold uppercase tracking-[0.32em] text-primary">
              Why Patients Choose IVR Pakistan
            </span>
            <h3 className="mt-4 text-h3 font-semibold tracking-tight text-navy dark:text-white">
              Modern treatment planning with comfort, clarity, and confidence.
            </h3>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3">
            {whyChooseUs.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  className="rounded-card border border-slate-200 bg-surface p-6 shadow-rest transition hover:shadow-hover dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-card bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>
                  <h4 className="mt-4 text-lg font-semibold text-navy dark:text-white">{item.title}</h4>
                  <p className="mt-2 text-small text-muted dark:text-slate-400">{item.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
