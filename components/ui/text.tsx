import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn"

const textVariants = cva(
  "font-body text-primary-900",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
      variant: {
        default: "text-primary-900",
        muted: "text-primary-700",
        light: "text-white/90",
      },
    },
    defaultVariants: {
      size: "base",
      variant: "default",
    },
  }
)

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div"
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, variant, as = "p", children, ...props }, ref) => {
    const Comp = as
    
    return (
      <Comp
        ref={ref}
        className={cn(textVariants({ size, variant, className }))}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Text.displayName = "Text"

export { Text, textVariants }
