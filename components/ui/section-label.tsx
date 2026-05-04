import * as React from "react"
import { cn } from "@/utils/cn"

export interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const SectionLabel = React.forwardRef<HTMLDivElement, SectionLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-secondary-600",
          className
        )}
        {...props}
      >
        <span className="h-[2px] w-8 bg-secondary-400" />
        {children}
      </div>
    )
  }
)
SectionLabel.displayName = "SectionLabel"
