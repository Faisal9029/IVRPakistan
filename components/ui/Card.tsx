import React from "react"

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ")
}

type CardProps = React.ComponentPropsWithoutRef<"div">

export default function Card({ children, className, ...rest }: CardProps) {
  return (
    <div className={cn(className)} {...rest}>
      {children}
    </div>
  )
}
