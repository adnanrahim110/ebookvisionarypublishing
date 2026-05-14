"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileText,
  MessageSquare,
  Rocket,
  type LucideIcon,
  Wand2,
} from "lucide-react";
import * as React from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Text } from "@/components/ui/text";
import { ABOUT_PAGE } from "@/constants";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/utils/use-reduced-motion";

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const iconMap: Record<string, LucideIcon> = {
  "message-square": MessageSquare,
  "file-text": FileText,
  "wand-2": Wand2,
  rocket: Rocket,
};

export function ProcessSection({
  content = ABOUT_PAGE.process,
}: {
  content?: typeof ABOUT_PAGE.process;
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const shouldReduceMotion = useReducedMotion();
  const processSteps = content.steps.map((step) => ({
    ...step,
    icon: iconMap[step.icon] || MessageSquare,
  }));

  return (
    <Section spacing="lg" className="bg-primary-950 overflow-hidden relative">
      <div
        className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 50%, ${hexToRgba(processSteps[activeIndex].accent, 0.06)} 0%, transparent 100%)`,
        }}
      />

      <Container className="relative z-10">
        <div className="text-center mb-16 lg:mb-20 flex flex-col items-center">
          <SectionLabel className="mb-4 text-secondary-400">
            {content.label}
          </SectionLabel>
          <Heading as="h2" size="h2" className="text-white justify-center">
            {content.heading}
          </Heading>
        </div>

        <div className="hidden lg:flex gap-3 h-130">
          {processSteps.map((step, i) => {
            const isActive = i === activeIndex;
            const Icon = step.icon;

            return (
              <motion.div
                key={step.num}
                layout={!shouldReduceMotion}
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
                aria-label={`Step ${step.num}: ${step.title}`}
                className={cn(
                  "relative rounded-2xl overflow-hidden cursor-pointer",
                  "border outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                  isActive ? "border-white/10" : "border-white/6",
                )}
                animate={{
                  flex: isActive ? 5 : 1,
                }}
                transition={{
                  type: shouldReduceMotion ? "tween" : "spring",
                  stiffness: 250,
                  damping: 28,
                  duration: shouldReduceMotion ? 0 : undefined,
                }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-0.75 z-10"
                  style={{ backgroundColor: step.accent }}
                  animate={{ opacity: isActive ? 1 : 0.35 }}
                  transition={{ duration: 0.4 }}
                />

                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: `radial-gradient(ellipse 80% 60% at 20% 80%, ${hexToRgba(step.accent, 0.1)} 0%, transparent 70%)`,
                  }}
                />

                <div
                  className="absolute inset-0 transition-colors duration-500"
                  style={{
                    backgroundColor: isActive
                      ? hexToRgba(step.accent, 0.06)
                      : "rgba(255,255,255,0.02)",
                  }}
                />

                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div
                      key={`expanded-${step.num}`}
                      initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="relative z-10 p-10 xl:p-14 h-full flex flex-col justify-between"
                    >
                      <div>
                        <span
                          className="font-heading font-black text-[7rem] xl:text-[9rem] leading-none block select-none pointer-events-none tracking-tighter"
                          style={{ color: hexToRgba(step.accent, 0.15) }}
                        >
                          {step.num}
                        </span>

                        <Heading
                          as="h3"
                          size="h3"
                          animated={false}
                          className="text-white mb-5 leading-snug! max-w-md mt-4"
                        >
                          {step.title}
                        </Heading>
                        <Text className="text-white/60! leading-[1.9] font-light max-w-lg">
                          {step.description}
                        </Text>
                      </div>

                      <div className="flex items-center gap-5 mt-8">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: hexToRgba(step.accent, 0.12),
                          }}
                        >
                          <Icon
                            className="w-6 h-6"
                            style={{ color: step.accent }}
                          />
                        </div>
                        <div
                          className="h-px flex-1 max-w-32"
                          style={{
                            background: `linear-gradient(to right, ${hexToRgba(step.accent, 0.35)}, transparent)`,
                          }}
                        />
                        <span
                          className="text-[10px] font-bold uppercase tracking-[0.3em] font-body"
                          style={{ color: hexToRgba(step.accent, 0.5) }}
                        >
                          Step {step.num}
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`collapsed-${step.num}`}
                      initial={shouldReduceMotion ? {} : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={shouldReduceMotion ? {} : { opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 h-full flex flex-col items-center justify-between gap-6 py-10 px-3"
                    >
                      <div className="flex flex-col gap-4">
                        <span
                          className="font-heading font-bold text-xl"
                          style={{ color: hexToRgba(step.accent, 0.6) }}
                        >
                          {step.num}
                        </span>

                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{
                            backgroundColor: hexToRgba(step.accent, 0.1),
                          }}
                        >
                          <Icon
                            className="w-4 h-4"
                            style={{ color: hexToRgba(step.accent, 0.5) }}
                          />
                        </div>
                      </div>

                      <span
                        className="font-heading font-bold grow text-lg tracking-[0.2em] uppercase whitespace-nowrap text-white/80"
                        style={{
                          writingMode:
                            "vertical-lr" as React.CSSProperties["writingMode"],
                        }}
                      >
                        {step.title}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="lg:hidden space-y-3">
          {processSteps.map((step, i) => {
            const isActive = i === activeIndex;
            const Icon = step.icon;

            return (
              <motion.div
                key={step.num}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(isActive ? -1 : i)}
                  className={cn(
                    "relative w-full rounded-2xl overflow-hidden text-left border transition-colors duration-500 outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                    isActive ? "border-white/10" : "border-white/4",
                  )}
                  style={{
                    backgroundColor: isActive
                      ? hexToRgba(step.accent, 0.06)
                      : "rgba(255,255,255,0.02)",
                  }}
                >
                  <div
                    className="absolute top-0 left-0 w-full h-0.5"
                    style={{
                      backgroundColor: step.accent,
                      opacity: isActive ? 1 : 0.3,
                    }}
                  />

                  <div className="p-5 flex items-center gap-4">
                    <span
                      className="font-heading font-bold text-lg shrink-0"
                      style={{
                        color: isActive
                          ? step.accent
                          : hexToRgba(step.accent, 0.5),
                      }}
                    >
                      {step.num}
                    </span>
                    <Heading
                      as="h3"
                      size="h5"
                      animated={false}
                      className={cn(
                        "transition-colors duration-300",
                        isActive ? "text-white" : "text-white/50",
                      )}
                    >
                      {step.title}
                    </Heading>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center ml-auto shrink-0"
                      style={{
                        backgroundColor: hexToRgba(
                          step.accent,
                          isActive ? 0.15 : 0.08,
                        ),
                      }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{
                          color: isActive
                            ? step.accent
                            : hexToRgba(step.accent, 0.45),
                        }}
                      />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: shouldReduceMotion ? 0 : 0.35 },
                          opacity: {
                            duration: shouldReduceMotion ? 0 : 0.25,
                            delay: shouldReduceMotion ? 0 : 0.1,
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0 pl-13">
                          <Text className="text-white/55! leading-[1.8] font-light text-sm!">
                            {step.description}
                          </Text>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center justify-center gap-3 mt-12">
          {processSteps.map((step, i) => (
            <button
              key={step.num}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to step ${step.num}`}
              className="group/dot relative p-1.5 outline-none"
            >
              <motion.div
                className="w-2 h-2 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor:
                    i === activeIndex ? step.accent : "rgba(255,255,255,0.2)",
                }}
                animate={{
                  scale: i === activeIndex ? 1.4 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
              {i === activeIndex && (
                <motion.div
                  layoutId="process-dot-ring"
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: hexToRgba(step.accent, 0.4) }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </Container>
    </Section>
  );
}
