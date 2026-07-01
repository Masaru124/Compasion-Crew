import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full px-3 py-0.5 text-xs font-mono font-medium uppercase tracking-wider whitespace-nowrap transition-all focus-visible:ring-[3px] focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground border border-border/50",
        accent:
          "bg-terracotta text-white",
        destructive:
          "bg-destructive/10 text-destructive",
        outline:
          "border border-border text-foreground",
        ghost:
          "text-muted-foreground hover:bg-muted",
        success:
          "bg-success/10 text-success",
        warning:
          "bg-warning/10 text-warning",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
