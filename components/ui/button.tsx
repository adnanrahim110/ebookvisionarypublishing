import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import * as React from "react";

import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 relative isolate overflow-hidden group [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary-500 text-white shadow-sm border border-transparent",
        secondary:
          "bg-secondary-400 text-white shadow-sm border border-transparent",
        outline:
          "border-2 border-primary-950 bg-transparent text-primary-950",
        ghost: "text-primary-900",
        white:
          "bg-white text-primary-950 shadow-sm border border-transparent",
        "outline-white":
          "border-2 border-white bg-transparent text-white",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-10 rounded-sm px-4 text-xs",
        lg: "h-14 rounded-sm px-8 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type BaseProps = VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function getWipeClasses(variant: string | null | undefined) {
  switch (variant) {
    case "secondary":
      return { bg: "bg-secondary-600", hoverText: "group-hover:text-white" };
    case "outline":
      return { bg: "bg-primary-950", hoverText: "group-hover:text-white" };
    case "ghost":
      return { bg: "bg-primary-100", hoverText: "group-hover:text-primary-950" };
    case "white":
      return { bg: "bg-primary-950", hoverText: "group-hover:text-white" };
    case "outline-white":
      return { bg: "bg-white", hoverText: "group-hover:text-primary-950" };
    default:
      return { bg: "bg-primary-950", hoverText: "group-hover:text-white" };
  }
}

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  if (asChild) {
    return (
      <Slot
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as React.Ref<HTMLElement>}
        {...(props as any)}
      />
    );
  }

  const { bg, hoverText } = getWipeClasses(variant);

  const innerContent = (
    <>
      {/* Single skewed wipe — slides in from left with a diagonal leading edge, then straightens to fill */}
      <div
        className={cn(
          "absolute inset-[-2px] -z-10 origin-left -translate-x-[110%] skew-x-[-24deg] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0 group-hover:skew-x-0 pointer-events-none scale-y-[1.4]",
          bg,
        )}
      />
      <span
        className={cn(
          "relative z-10 flex items-center justify-center gap-2 transition-colors duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]",
          hoverText,
        )}
      >
        {props.children}
      </span>
    </>
  );

  if ("href" in props && props.href !== undefined) {
    return (
      <Link
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...(props as ButtonAsLink)}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {innerContent}
    </button>
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
