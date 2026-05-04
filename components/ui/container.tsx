import * as React from "react"
import { cn } from "@/utils/cn"

export const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl w-full", className)}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"
