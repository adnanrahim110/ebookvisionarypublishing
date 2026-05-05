"use client";
import type { LucideIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/utils/cn";

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: LucideIcon;
  label: string;
}

export const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FormTextareaProps
>(({ icon: Icon, label, className, id, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);
  const textareaId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={cn("relative group", className)}>
      <div
        className={cn(
          "relative flex items-start rounded-xl border-2 transition-all duration-400",
          isFocused
            ? "border-primary-500 bg-white shadow-lg shadow-primary-500/[0.06]"
            : "border-primary-200 bg-white hover:border-primary-300 hover:shadow-md hover:shadow-primary-900/[0.02]"
        )}
      >
        {Icon && (
          <div className="pl-5 pr-0 pt-5 flex items-start">
            <Icon
              className={cn(
                "w-[18px] h-[18px] transition-colors duration-400",
                isFocused ? "text-primary-500" : "text-primary-400"
              )}
            />
          </div>
        )}
        <div className="relative flex-1">
          <textarea
            ref={ref}
            id={textareaId}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(e.target.value.length > 0);
            }}
            rows={5}
            className="w-full bg-transparent pt-7 pb-3 px-5 text-primary-950 focus:outline-none font-body text-[15px] resize-none"
            placeholder=" "
            {...props}
          />
          <label
            htmlFor={textareaId}
            className={cn(
              "absolute left-5 transition-all duration-300 pointer-events-none font-body",
              isFocused || hasValue
                ? "top-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-500"
                : "top-5 text-sm text-primary-400"
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
});
FormTextarea.displayName = "FormTextarea";
