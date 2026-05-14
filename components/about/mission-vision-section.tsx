"use client";
import { motion, useInView } from "framer-motion";
import * as React from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Text } from "@/components/ui/text";
import { ABOUT_PAGE } from "@/constants";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/utils/use-reduced-motion";

export function MissionVisionSection({
  content = ABOUT_PAGE.missionVision,
}: {
  content?: typeof ABOUT_PAGE.missionVision;
}) {
  const shouldReduceMotion = useReducedMotion();
  const mRef = React.useRef<HTMLDivElement>(null);
  const vRef = React.useRef<HTMLDivElement>(null);
  const mInView = useInView(mRef, { once: true, amount: 0.2 });
  const vInView = useInView(vRef, { once: true, amount: 0.2 });

  const panels = content.panels.map((panel, index) => ({
    ...panel,
    ref: index === 0 ? mRef : vRef,
    inView: index === 0 ? mInView : vInView,
    circleColor: "bg-white/[0.04]",
    delay: index * 0.15,
  }));

  return (
    <Section spacing="lg" className="bg-primary-900 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_100%)]" />

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-xl">
            <SectionLabel className="mb-5 text-secondary-400">
              {content.label}
            </SectionLabel>
            <Heading as="h2" size="h2" className="text-white">
              {content.heading}
            </Heading>
          </div>
          <Text
            size="lg"
            className="max-w-sm text-primary-200/60 leading-relaxed md:pt-10"
          >
            {content.description}
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {panels.map((panel) => (
            <motion.div
              key={panel.num}
              ref={panel.ref}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 50 }}
              animate={panel.inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: panel.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn("group", panel.offsetClass)}
            >
              <div
                className={cn(
                  "relative rounded-3xl bg-linear-to-br p-10 md:p-14 overflow-hidden min-h-105 flex flex-col justify-end transition-shadow duration-700 hover:shadow-2xl hover:shadow-primary-500/20",
                  panel.gradient,
                )}
              >
                <div
                  className={cn(
                    "absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-110",
                    panel.circleColor,
                  )}
                />
                <div
                  className={cn(
                    "absolute top-1/2 -right-8 w-40 h-40 rounded-full pointer-events-none transition-transform duration-700 group-hover:translate-x-4",
                    panel.circleColor,
                  )}
                />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />

                <span
                  className="absolute -bottom-2 left-2 font-heading font-black text-[10rem] md:text-[12rem] leading-none select-none pointer-events-none tracking-tight transition-all duration-700 group-hover:-translate-y-1"
                  style={{
                    WebkitTextStroke: "2px rgba(255,255,255,0.12)",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {panel.num}
                </span>

                <div className="relative z-10">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 font-body mb-4 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm bg-white/6">
                    {panel.label}
                  </span>
                  <Heading
                    as="h3"
                    size="h3"
                    animated={false}
                    className="text-white mb-5 leading-snug! max-w-md"
                  >
                    {panel.heading}
                  </Heading>
                  <Text className="text-white/75! leading-[1.9] font-light max-w-lg">
                    {panel.body}
                  </Text>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
