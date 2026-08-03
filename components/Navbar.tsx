"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Button from "./ui/Button";
import { phone } from "../lib/siteInfo";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "glass shadow-rest" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-card bg-white/80 shadow-rest ring-1 ring-white/80">
            <Image src="/logo.png" alt="IVR Pakistan logo" fill sizes="48px" className="object-contain" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-bold tracking-tight text-navy dark:text-white">
              IVR Pakistan Karachi
            </p>
            <p className="hidden truncate text-[11px] uppercase tracking-[0.35em] text-muted dark:text-slate-400 sm:block">
              Interventional Radiology Center
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-navy dark:text-slate-200 lg:flex">
          <Link href="/" className="transition-colors duration-200 hover:text-primary">
            Home
          </Link>
          <Link href="/#about" className="transition-colors duration-200 hover:text-primary">
            About
          </Link>
          <Link href="/#procedures" className="transition-colors duration-200 hover:text-primary">
            Services
          </Link>
          <Link href="/blog" className="transition-colors duration-200 hover:text-primary">
            Blogs
          </Link>
          <Link href="/#clinics" className="transition-colors duration-200 hover:text-primary">
            Clinics
          </Link>
          <Link href="/#contact" className="transition-colors duration-200 hover:text-primary">
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${phone.tel}`}
            className="inline-flex items-center gap-2 rounded-button border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/5 dark:border-slate-700 dark:bg-slate-900"
          >
            <Phone size={16} />
            {phone.display}
          </a>

          <a
            href={`https://wa.me/${phone.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="inline-flex h-10 w-10 items-center justify-center rounded-button bg-[#25D366] text-white transition hover:brightness-95"
          >
            <FaWhatsapp size={18} />
          </a>

          <Button href="/appointment" variant="primary" className="px-5 py-3">
            Book Appointment
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-button border border-slate-200 bg-white text-navy shadow-rest transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white lg:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white dark:bg-navy lg:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-card bg-white/80 shadow-rest ring-1 ring-white/80">
                <Image src="/logo.png" alt="IVR Pakistan logo" fill sizes="40px" className="object-contain" />
              </div>
              <p className="text-base font-bold tracking-tight text-navy dark:text-white">
                IVR Pakistan Karachi
              </p>
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation"
              className="inline-flex h-10 w-10 items-center justify-center rounded-button border border-slate-200 text-navy dark:border-slate-700 dark:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-1 px-6 py-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-card px-4 py-3 text-lg font-medium text-navy transition hover:bg-primary/5 dark:text-white"
            >
              Home
            </Link>
            <Link
              href="/#about"
              onClick={() => setMenuOpen(false)}
              className="rounded-card px-4 py-3 text-lg font-medium text-navy transition hover:bg-primary/5 dark:text-white"
            >
              About
            </Link>
            <Link
              href="/#procedures"
              onClick={() => setMenuOpen(false)}
              className="rounded-card px-4 py-3 text-lg font-medium text-navy transition hover:bg-primary/5 dark:text-white"
            >
              Services
            </Link>
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="rounded-card px-4 py-3 text-lg font-medium text-navy transition hover:bg-primary/5 dark:text-white"
            >
              Blogs
            </Link>
            <Link
              href="/#clinics"
              onClick={() => setMenuOpen(false)}
              className="rounded-card px-4 py-3 text-lg font-medium text-navy transition hover:bg-primary/5 dark:text-white"
            >
              Clinics
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="rounded-card px-4 py-3 text-lg font-medium text-navy transition hover:bg-primary/5 dark:text-white"
            >
              Contact
            </Link>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-6 dark:border-slate-800">
            <a
              href={`tel:${phone.tel}`}
              className="inline-flex items-center justify-center gap-2 rounded-button border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-primary dark:border-slate-700 dark:bg-slate-900"
            >
              <Phone size={16} />
              {phone.display}
            </a>
            <a
              href={`https://wa.me/${phone.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-button bg-[#25D366] px-4 py-3 text-sm font-semibold text-white"
            >
              <FaWhatsapp size={16} />
              WhatsApp
            </a>
            <Button href="/appointment" variant="primary">
              Book Appointment
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
