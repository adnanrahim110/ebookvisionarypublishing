"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/utils/cn";

interface FormSelectProps {
  icon?: LucideIcon;
  label: string;
  options: { label: string; value: string }[];
  className?: string;
}

export function FormSelect({ icon: Icon, label, options, className }: FormSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string | null>(null);
  const selectRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === selected)?.label;

  return (
    <div className={cn("relative group z-20", className)} ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative w-full flex items-center rounded-xl border-2 transition-all duration-400 text-left",
          isOpen
            ? "border-primary-500 bg-white shadow-lg shadow-primary-500/[0.06]"
            : "border-primary-200 bg-white hover:border-primary-300 hover:shadow-md hover:shadow-primary-900/[0.02]"
        )}
      >
        {Icon && (
          <div className="pl-5 pr-0 flex items-center">
            <Icon
              className={cn(
                "w-[18px] h-[18px] transition-colors duration-400",
                isOpen ? "text-primary-500" : "text-primary-400"
              )}
            />
          </div>
        )}
        <div className="relative flex-1">
          <div className="pt-6 pb-2 px-5 text-[15px] font-body">
            <span className={selected ? "text-primary-950" : "text-transparent"}>
              {selectedLabel || "—"}
            </span>
          </div>
          <span
            className={cn(
              "absolute left-5 transition-all duration-300 pointer-events-none font-body",
              isOpen || selected
                ? "top-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-500"
                : "top-1/2 -translate-y-1/2 text-sm text-primary-400"
            )}
          >
            {label}
          </span>
        </div>
        <div className="pr-5">
          <ChevronDown
            className={cn(
              "w-4 h-4 text-primary-400 transition-transform duration-400",
              isOpen && "rotate-180 text-primary-500"
            )}
          />
        </div>
      </button>

      <div
        className={cn(
          "absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-primary-500 to-secondary-400 transition-transform duration-500 origin-left",
          isOpen ? "scale-x-100" : "scale-x-0"
        )}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white border border-primary-100 shadow-xl shadow-primary-900/[0.06] rounded-xl overflow-hidden py-1 z-30"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full text-left px-5 py-3 text-sm font-body flex items-center justify-between transition-colors duration-200",
                  selected === option.value
                    ? "bg-primary-50 text-primary-600 font-medium"
                    : "hover:bg-primary-50/60 text-primary-800"
                )}
              >
                <span>{option.label}</span>
                {selected === option.value && (
                  <Check className="w-4 h-4 text-primary-500" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
