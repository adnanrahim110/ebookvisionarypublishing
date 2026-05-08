"use client";
import { motion, useInView } from "framer-motion";
import * as React from "react";

import { useReducedMotion } from "@/utils/use-reduced-motion";

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
  theme?: "light" | "dark";
}

function StatItem({ value, suffix = "", label, delay = 0, theme = "light" }: StatItemProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = React.useState(0);
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  React.useEffect(() => {
    if (isInView) {
      if (shouldReduceMotion) {
        setCount(value);
        return;
      }
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else setCount(Math.floor(start));
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value, shouldReduceMotion]);

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative flex flex-col items-center text-center px-6 py-8"
    >
      <div className="flex items-baseline gap-1">
        <span className={`font-heading font-black text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-none ${isDark ? 'text-white' : 'text-primary-800'}`}>
          {count}
        </span>
        {suffix && (
          <span className="font-heading font-bold text-3xl md:text-4xl text-primary-400">
            {suffix}
          </span>
        )}
      </div>

      <div className={`mt-4 mb-3 h-px w-8 rounded-full ${isDark ? 'bg-primary-700' : 'bg-primary-300'}`} />

      <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? 'text-primary-300' : 'text-primary-400'}`}>
        {label}
      </p>
    </motion.div>
  );
}

interface StatsRowProps {
  theme?: "light" | "dark";
  statsData?: { value: number; suffix?: string; label: string }[];
}

const DEFAULT_STATS = [
  { value: 1200, suffix: "+", label: "Books Published" },
  { value: 98, suffix: "%", label: "Satisfaction Rate" },
  { value: 50, suffix: "+", label: "Awards Won" },
  { value: 10, suffix: "Y+", label: "Experience" },
];

export function StatsRow({ theme = "light", statsData = DEFAULT_STATS }: StatsRowProps) {
  const isDark = theme === "dark";

  return (
    <section className={`relative overflow-hidden ${isDark ? 'bg-primary-950' : 'bg-primary-50/60'}`}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className={`grid grid-cols-2 md:grid-cols-4 md:divide-x ${isDark ? 'md:divide-primary-800' : 'md:divide-primary-200'}`}>
          {statsData.map((stat, i) => (
            <StatItem key={stat.label} {...stat} delay={i * 0.1} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}
