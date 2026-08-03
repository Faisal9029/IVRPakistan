"use client";

import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "ivrp-theme";

export default function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const isDark = root.classList.toggle("dark");
    window.localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="inline-flex h-10 w-10 items-center justify-center rounded-button border border-slate-200 bg-white text-navy transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
    >
      <Sun className="block dark:hidden" size={18} />
      <Moon className="hidden dark:block" size={18} />
    </button>
  );
}
