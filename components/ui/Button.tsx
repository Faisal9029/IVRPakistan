import React from "react"
import Link from "next/link"

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ")
}

export type ButtonVariant = "primary" | "secondary" | "ghost"

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white shadow-rest hover:shadow-hover hover:-translate-y-0.5",
  secondary:
    "border border-primary/20 bg-white text-primary hover:bg-primary/5 dark:bg-slate-900 dark:text-white dark:border-slate-700",
  ghost: "text-navy hover:bg-navy/5 dark:text-slate-100 dark:hover:bg-white/10",
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-button px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:pointer-events-none"

type ButtonProps = {
  variant?: ButtonVariant
  className?: string
  children: React.ReactNode
  href?: string
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">

export default function Button({
  variant = "primary",
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variantClasses[variant], className)

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
