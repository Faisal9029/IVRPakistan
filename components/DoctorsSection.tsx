import Image from "next/image";
import { BriefcaseMedical, MapPin, Star } from "lucide-react";

const doctors = [
  {
    name: "Dr. Vicky Kumar",
    specialty: "Interventional Radiologist",
    credentials: "MBBS, FCPS, Fellowship in Interventional Radiology",
    description: "Penile Doppler ultrasound specialist with expert care and clear scheduling for patients in Karachi.",
    expertise: ["Penile Doppler Ultrasound", "Vascular Interventions", "Pelvic & Urological Procedures", "Oncologic Treatments"],
    location: "IDC Lab Lucky Star Saddar Karachi, near Shell petrol pump",
    address: "Lucky Star Saddar Karachi, opposite Shell petrol pump",
    rating: 4.9,
    avatar: "/doctors.png",
    mapLink: "https://maps.app.goo.gl/vn1kpJQeugRFbAKr5",
  },
];

export default function DoctorsSection() {
  return (
    <section id="clinics" className="relative bg-white py-20 dark:bg-navy lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            Our Specialist
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy dark:text-white sm:text-4xl">
            Dr. Vicky Kumar
          </h2>
          <p className="mt-6 text-base leading-8 text-muted dark:text-slate-300">
            A dedicated interventional radiologist delivering precise image-guided care with compassionate support and clear scheduling.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="overflow-hidden rounded-[36px] border border-slate-200 bg-slate-50 shadow-[0_30px_80px_-35px_rgba(15,98,255,0.35)] dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="grid gap-8 p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
                <div className="flex flex-col items-center justify-center rounded-[28px] bg-gradient-to-br from-[#dbeafe] to-[#cffafe] p-6 text-center dark:from-slate-800 dark:to-slate-800">
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-slate-700">
                    <Image src={doctor.avatar} alt={doctor.name} fill sizes="160px" className="object-cover" priority />
                  </div>
                  <div className="mt-6 flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={18} className="fill-current" />
                    ))}
                  </div>
                  <p className="mt-2 text-lg font-semibold text-navy dark:text-white">{doctor.rating.toFixed(1)} / 5.0</p>
                  <p className="text-sm text-muted dark:text-slate-400">Trusted by patients</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary">{doctor.specialty}</p>
                  <h3 className="mt-3 text-3xl font-semibold text-navy dark:text-white">{doctor.name}</h3>
                  <p className="mt-1 text-small font-medium text-muted dark:text-slate-400">{doctor.credentials}</p>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-muted dark:text-slate-300">{doctor.description}</p>

                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                      <div className="flex items-center gap-2 text-primary">
                        <BriefcaseMedical size={18} />
                        <p className="text-sm font-semibold text-navy dark:text-white">Areas of Expertise</p>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {doctor.expertise.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                      <div className="flex items-center gap-2 text-primary">
                        <MapPin size={18} />
                        <p className="text-sm font-semibold text-navy dark:text-white">Location</p>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-muted dark:text-slate-400">{doctor.address}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <a
                      href={doctor.mapLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
                    >
                      View Location
                    </a>
                    <p className="text-sm text-muted dark:text-slate-400">{doctor.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
