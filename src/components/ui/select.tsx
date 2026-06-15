import * as React from "react"

import { cn } from "@/lib/utils"

function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      data-slot="select"
      className={cn(
        "h-10 w-full min-w-0 rounded-xl border border-input bg-white px-3 py-2 text-sm text-foreground transition-all outline-none appearance-none cursor-pointer",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "dark:bg-muted/50",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}

export { Select }
