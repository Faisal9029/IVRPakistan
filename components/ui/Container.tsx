import React from "react"

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ")
}

type ContainerProps = React.PropsWithChildren<{
  className?: string
}>

export default function Container({ children, className }: ContainerProps) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8", className)}>{children}</div>
}
