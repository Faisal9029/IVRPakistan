import Image from "next/image";
import { Star } from "lucide-react";

const doctors = [
  {
    name: "Dr. Vicky Kumar",
    specialty: "Interventional Radiologist",
    schedule: "Mon, Tue, Fri, Sat · 7pm–8pm",
    details: "IDC Lab Lucky Star Saddar Karachi, near Shell petrol pump",
    price: "Interventional radiology consultation and procedure planning",
    location: "https://maps.app.goo.gl/vn1kpJQeugRFbAKr5",
    rating: 4.9,
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=VickyKumar",
  },
];

export default function DoctorsSection() {
  return (
    <section id="doctors" className="relative bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#1677ff]">
            Our Specialist
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Dr. Vicky Kumar
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-600">
            Penile Doppler ultrasound specialist with expert care and clear scheduling information.
          </p>
        </div>

        <div className="mx-auto mt-16 grid gap-8 sm:grid-cols-1 lg:grid-cols-1">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden shadow-sm transition hover:shadow-md"
            >
              <div className="relative h-52 w-full bg-gradient-to-br from-[#dbeafe] to-[#cffafe] overflow-hidden flex items-center justify-center">
                <Image
                  src={doctor.avatar}
                  alt={doctor.name}
                  width={300}
                  height={300}
                  className="w-32 h-32 rounded-full object-cover"
                  unoptimized
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-950">{doctor.name}</h3>
                <p className="mt-2 text-sm font-medium text-[#1677ff]">{doctor.specialty}</p>

                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-900">OPD Time:</span> {doctor.schedule}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Location:</span> {doctor.details}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Charges:</span> {doctor.price}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <a
                    href={doctor.location}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl bg-[#1677ff] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1260d4]"
                  >
                    View Location
                  </a>
                  <div className="flex items-center gap-1 text-sm font-semibold text-slate-950">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                    <span>{doctor.rating}</span>
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
