"use client";
import type { LucideIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/utils/cn";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  label: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ icon: Icon, label, className, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("relative group", className)}>
        <div
          className={cn(
            "relative flex items-center rounded-xl border-2 transition-all duration-400",
            isFocused
              ? "border-primary-500 bg-white shadow-lg shadow-primary-500/[0.06]"
              : "border-primary-200 bg-white hover:border-primary-300 hover:shadow-md hover:shadow-primary-900/[0.02]"
          )}
        >
          {Icon && (
            <div className="pl-5 pr-0 flex items-center">
              <Icon
                className={cn(
                  "w-[18px] h-[18px] transition-colors duration-400",
                  isFocused ? "text-primary-500" : "text-primary-400"
                )}
              />
            </div>
          )}
          <div className="relative flex-1">
            <input
              ref={ref}
              id={inputId}
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => {
                setIsFocused(false);
                setHasValue(e.target.value.length > 0);
              }}
              className="w-full bg-transparent pt-6 pb-2 px-5 text-primary-950 focus:outline-none font-body text-[15px] peer"
              placeholder=" "
              {...props}
            />
            <label
              htmlFor={inputId}
              className={cn(
                "absolute left-5 transition-all duration-300 pointer-events-none font-body",
                isFocused || hasValue
                  ? "top-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-500"
                  : "top-1/2 -translate-y-1/2 text-sm text-primary-400"
              )}
            >
              {label}
            </label>
          </div>
        </div>
        <div
          className={cn(
            "absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-primary-500 to-secondary-400 transition-transform duration-500 origin-left",
            isFocused ? "scale-x-100" : "scale-x-0"
          )}
        />
      </div>
    );
  }
);
FormInput.displayName = "FormInput";
