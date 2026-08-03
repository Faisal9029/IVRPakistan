import React from "react"

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ")
}

type SectionProps = React.PropsWithChildren<{
  id?: string
  className?: string
  muted?: boolean
}>

export default function Section({ id, children, className, muted }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-20 lg:py-24", muted && "bg-surface/60 dark:bg-white/[0.02]", className)}
    >
      {children}
    </section>
  )
}
