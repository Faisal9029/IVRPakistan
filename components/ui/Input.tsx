import React from "react"

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ")
}

type InputProps =
  | (React.InputHTMLAttributes<HTMLInputElement> & { as?: "input" })
  | (React.TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" })
  | (React.SelectHTMLAttributes<HTMLSelectElement> & { as: "select" })

const baseClass =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#1677ff] focus:ring-2 focus:ring-blue-100"

export default function Input({ as = "input", className, ...rest }: InputProps) {
  const classes = cn(baseClass, className)

  if (as === "textarea") {
    return (
      <textarea
        className={classes}
        {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    )
  }

  if (as === "select") {
    return (
      <select
        className={classes}
        {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
      />
    )
  }

  return (
    <input className={classes} {...(rest as React.InputHTMLAttributes<HTMLInputElement>)} />
  )
}
