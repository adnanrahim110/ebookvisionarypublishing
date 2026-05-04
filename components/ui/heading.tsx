"use client"
import * as React from "react"
import { motion, useInView } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn"
import { useReducedMotion } from "@/utils/use-reduced-motion"

const headingVariants = cva(
  "font-heading font-bold text-primary-950 tracking-tight",
  {
    variants: {
      size: {
        h1: "text-4xl md:text-5xl lg:text-6xl",
        h2: "text-3xl md:text-4xl lg:text-5xl",
        h3: "text-2xl md:text-3xl lg:text-4xl",
        h4: "text-xl md:text-2xl lg:text-3xl",
        h5: "text-lg md:text-xl",
        h6: "text-base md:text-lg",
      },
    },
    defaultVariants: {
      size: "h2",
    },
  }
)

function extractUnits(children: React.ReactNode): React.ReactNode[] {
  const units: React.ReactNode[] = []

  React.Children.forEach(children, (child) => {
    if (typeof child === "string") {
      child.split(/(\s+)/).forEach((part) => {
        if (part.trim()) units.push(part)
      })
    } else if (typeof child === "number") {
      units.push(String(child))
    } else if (React.isValidElement(child)) {
      units.push(child)
    }
  })

  return units
}

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  animated?: boolean
  staggerDelay?: number
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, as, children, animated = true, staggerDelay = 0.06, ...props }, ref) => {
    const Comp = as || (size as "h1" | "h2" | "h3" | "h4" | "h5" | "h6") || "h2"
    const shouldReduceMotion = useReducedMotion()
    const internalRef = React.useRef<HTMLHeadingElement>(null)
    const isInView = useInView(internalRef, { once: true, amount: 0.1 })

    const mergedRef = React.useCallback(
      (node: HTMLHeadingElement | null) => {
        (internalRef as React.MutableRefObject<HTMLHeadingElement | null>).current = node
        if (typeof ref === "function") ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLHeadingElement | null>).current = node
      },
      [ref]
    )

    if (!animated || shouldReduceMotion) {
      return (
        <Comp
          ref={mergedRef}
          className={cn(headingVariants({ size, className }))}
          {...props}
        >
          {children}
        </Comp>
      )
    }

    const units = extractUnits(children)

    return (
      <Comp
        ref={mergedRef}
        className={cn(headingVariants({ size }), "flex flex-wrap gap-x-[0.3em] gap-y-1", className)}
        {...props}
      >
        {units.map((unit, i) => (
          <span key={i} className="overflow-hidden inline-block pb-1">
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={isInView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
              transition={{
                duration: 0.7,
                delay: i * staggerDelay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {unit}
            </motion.span>
          </span>
        ))}
      </Comp>
    )
  }
)
Heading.displayName = "Heading"

export { Heading, headingVariants }
