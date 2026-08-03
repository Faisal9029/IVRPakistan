import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { clinics, email, phone, socialLinks } from "../lib/siteInfo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#procedures" },
  { label: "Blog", href: "/blog" },
  { label: "Clinics", href: "/#clinics" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Appointment", href: "/appointment" },
  { label: "Contact", href: "/#contact" },
];

const newsletterLink =
  socialLinks.find((social) => social.label === "WhatsApp")?.href ?? "#";

export default function Footer() {
  return (
    <footer className="bg-navy text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-small font-semibold uppercase tracking-[0.28em] text-cyan">
              IVR Pakistan Karachi
            </p>
            <p className="mt-4 max-w-xs text-small leading-7 text-slate-300">
              Leading interventional radiology care in Karachi with compassionate
              support, modern imaging, and minimally invasive procedures.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-card border border-slate-800 bg-slate-900 text-slate-300 transition hover:border-cyan hover:text-cyan"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-small font-semibold uppercase tracking-[0.24em] text-slate-200">
              Contact
            </h3>
            <ul className="mt-6 space-y-3 text-small text-slate-300">
              <li>
                <a
                  href={`tel:${phone.tel}`}
                  className="inline-flex items-center gap-2 transition hover:text-cyan"
                >
                  <Phone size={14} /> {phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${phone.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-cyan"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 transition hover:text-cyan"
                >
                  <Mail size={14} /> {email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-small font-semibold uppercase tracking-[0.24em] text-slate-200">
              Locations
            </h3>
            <ul className="mt-6 space-y-4 text-small text-slate-300">
              {clinics.map((clinic) => (
                <li key={clinic.title}>
                  <p className="font-semibold text-slate-100">{clinic.title}</p>
                  <p className="mt-1">{clinic.hours}</p>
                  <a
                    href={clinic.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-cyan transition hover:text-cyan/80"
                  >
                    <MapPin size={13} /> Open Google Maps
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-small font-semibold uppercase tracking-[0.24em] text-slate-200">
              Quick Links
            </h3>
            <ul className="mt-6 space-y-3 text-small text-slate-300">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition hover:text-cyan">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-small font-semibold uppercase tracking-[0.24em] text-slate-200">
              Stay Updated
            </h3>
            <a
              href={newsletterLink}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-button bg-success px-4 py-2 text-small font-semibold text-white transition hover:brightness-95"
            >
              Join our WhatsApp channel
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-8 text-small text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} IVR Pakistan Karachi. All rights reserved. Design by Faisal.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy-policy" className="transition hover:text-cyan">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="transition hover:text-cyan">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
