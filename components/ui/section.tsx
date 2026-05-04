import * as React from "react"
import { cn } from "@/utils/cn"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "md" | "lg" | "none"
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = "md", ...props }, ref) => {
    // Ensuring strict 8px vertical rhythm intervals (e.g., 48px, 64px, 96px, 128px)
    const spacingClasses = {
      none: "",
      sm: "py-12 md:py-16", // 48px to 64px
      md: "py-16 md:py-24", // 64px to 96px
      lg: "py-24 md:py-32", // 96px to 128px
    }

    return (
      <section
        ref={ref}
        className={cn("relative w-full", spacingClasses[spacing], className)}
        {...props}
      />
    )
  }
)
Section.displayName = "Section"
