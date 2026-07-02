import {
  Mail,
  Phone,
  Clock3,
  Building2,
} from "lucide-react";

import {
  FaFacebook,
  FaTiktok,
  FaWhatsapp,
  FaSnapchat,
  FaYoutube,
} from "react-icons/fa";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-[#f0f8ff] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#1677ff]">
            Get In Touch
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Contact Us
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-600">
            Book appointments and connect with IVR Pakistan Karachi.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mx-auto mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Phone,
              label: "Phone",
              value: "+92 346 2236220",
              href: "tel:+923462236220",
            },
            {
              icon: Mail,
              label: "Email",
              value: "cathlabintervention@gmail.com",
              href: "mailto:cathlabintervention@gmail.com",
            }
          ].map((contact) => {
            const Icon = contact.icon;

            return (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-3xl border border-white bg-white p-8 text-center shadow-lg shadow-slate-200/30 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#eff6ff] text-[#1677ff]">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-slate-950">
                  {contact.label}
                </h3>

                <p className="mt-3 break-all text-sm text-slate-600">
                  {contact.value}
                </p>
              </a>
            );
          })}
        </div>

        {/* Clinic Locations */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">

          {/* IDC */}
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-[#1677ff]">
                <Building2 size={28} />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  IDC Lab Saddar Karachi
                </h3>

                <p className="text-sm text-slate-600">
                  Lucky Star Saddar Karachi, opposite Shell Petrol Pump
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 text-slate-700">
              <Clock3 className="mt-1 text-[#1677ff]" size={20} />

              <div>
                <p className="font-semibold">
                  OPD Days & Timings
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  Monday, Tuesday, Friday & Saturday
                </p>

                <p className="text-sm text-slate-600">
                  7:00 PM – 8:00 PM
                </p>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/vn1kpJQeugRFbAKr5"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-[#1677ff] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#125ee8]"
            >
              Open Google Map
            </a>
          </div>

          {/* NMC */}
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
                <Building2 size={28} />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  National Medical Centre (NMC)
                </h3>

                <p className="text-sm text-slate-600">
                  DHA Karachi
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 text-slate-700">
              <Clock3 className="mt-1 text-cyan-600" size={20} />

              <div>
                <p className="font-semibold">
                  OPD Days & Timings
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  Wednesday & Thursday
                </p>

                <p className="text-sm text-slate-600">
                  5:00 PM – 6:00 PM
                </p>
              </div>
            </div>

            <a
              href="https://share.google/qhLuVj34ZAdKAo37X"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
            >
              Open Google Map
            </a>
          </div>
        </div>

        {/* Subscribe */}
        <div className="mt-16 rounded-3xl bg-white p-8 shadow-lg">
          <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-[#f8fbff] p-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1677ff]">
              Subscribe
            </p>

            <p className="mt-3 text-base text-slate-700">
              Join our WhatsApp channel for updates, appointment notices, and clinic announcements.
            </p>

            <a
              href="https://whatsapp.com/channel/0029VbBN0Yq2v1Iq8uvsbT1Z"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center rounded-2xl bg-[#22c55e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16a34a]"
            >
              Subscribe on WhatsApp
            </a>
          </div>

          {/* Social Media */}
          <h3 className="mt-12 text-center text-2xl font-bold text-slate-900">
            Follow Us On Social Media
          </h3>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {[
              {
                href: "https://www.facebook.com/share/1HECzu9krf/",
                label: "Facebook",
                icon: FaFacebook,
                color: "text-blue-600",
              },
              {
                href: "https://vt.tiktok.com/ZSC9haJxW/",
                label: "TikTok",
                icon: FaTiktok,
                color: "text-black",
              },
              {
                href: "https://www.youtube.com/",
                label: "YouTube",
                icon: FaYoutube,
                color: "text-red-600",
              },
              {
                href: "https://whatsapp.com/channel/0029VbBN0Yq2v1Iq8uvsbT1Z",
                label: "WhatsApp",
                icon: FaWhatsapp,
                color: "text-green-600",
              },
              {
                href: "https://www.snapchat.com/add/ivr-pakistan?share_id=d_kM3i3iuNQ&locale=en-US",
                label: "Snapchat",
                icon: FaSnapchat,
                color: "text-yellow-500",
              },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-3xl border border-slate-200 bg-white text-slate-700 transition hover:bg-blue-50"
                >
                  <Icon size={24} className={social.color} />
                  <span className="sr-only">{social.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}