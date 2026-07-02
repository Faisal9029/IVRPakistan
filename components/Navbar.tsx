"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { FaFacebook, FaTiktok, FaWhatsapp, FaSnapchat, FaYoutube } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Procedures", href: "#procedures" },
  { label: "Clinics", href: "#clinics" },
  { label: "FAQs", href: "#faq" },
  { label: "Contact", href: "#contact" },
  { label: "Appointment", href: "/appointment" },
];

const socialLinks = [
  { href: "https://www.facebook.com/share/1HECzu9krf/", label: "Facebook", icon: FaFacebook },
  { href: "https://vt.tiktok.com/ZSC9haJxW/", label: "TikTok", icon: FaTiktok },
  { href: "https://www.youtube.com/", label: "YouTube", icon: FaYoutube },
  { href: "https://whatsapp.com/channel/0029VbBN0Yq2v1Iq8uvsbT1Z", label: "WhatsApp", icon: FaWhatsapp },
  { href: "https://www.snapchat.com/add/ivr-pakistan?share_id=d_kM3i3iuNQ&locale=en-US", label: "Snapchat", icon: FaSnapchat },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/40 backdrop-blur-xl shadow-sm shadow-slate-200/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">

        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative h-12 w-12 overflow-hidden rounded-3xl bg-white/80 shadow-lg shadow-blue-200/40 ring-1 ring-white/80">
            <Image
              src="/logo.png"
              alt="IVR Pakistan logo"
              fill
              className="object-contain"
            />
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight text-slate-950">
              IVR Pakistan Karachi
            </p>
            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
              Interventional Radiology Center
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
          {navLinks.slice(0, 6).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors duration-200 hover:text-[#0f62ff]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
            Follow
          </span>
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:+923462236220"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-[#0f62ff] transition hover:bg-blue-50"
          >
            <Phone size={16} />
            +92 346 2236220
          </a>

          <Link
            href="/appointment"
            className="inline-flex items-center justify-center rounded-2xl bg-[#0f62ff] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0f62ff]/20 transition hover:bg-[#0c4ad8]"
          >
            Book Appointment
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 lg:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-white/20 bg-white/90 px-6 py-5 shadow-xl backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-slate-700 transition hover:text-[#0f62ff]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5">
            <span className="w-full text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
              Follow us
            </span>
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
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100"
                >
                  <Icon size={18} />
                </a>
              );
            })}

            <a
              href="tel:+923462236220"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#0f62ff] transition hover:bg-blue-50"
            >
              <Phone size={16} />
              +92 346 2236220
            </a>

            <Link
              href="/appointment"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center rounded-2xl bg-[#0f62ff] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0c4ad8]"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}