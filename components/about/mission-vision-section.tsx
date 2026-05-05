"use client";
import { motion, useInView } from "framer-motion";
import * as React from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Text } from "@/components/ui/text";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/utils/use-reduced-motion";

export function MissionVisionSection() {
  const shouldReduceMotion = useReducedMotion();
  const mRef = React.useRef<HTMLDivElement>(null);
  const vRef = React.useRef<HTMLDivElement>(null);
  const mInView = useInView(mRef, { once: true, amount: 0.2 });
  const vInView = useInView(vRef, { once: true, amount: 0.2 });

  const panels = [
    {
      ref: mRef,
      inView: mInView,
      num: "01",
      label: "Our Mission",
      heading: "Empowering Authors to Publish With Excellence.",
      body: "At Ebook Visionary, our mission is to empower authors by providing top-tier publishing services that turn creative visions into reality. We are dedicated to excellence, innovation, and integrity, ensuring every book we touch meets the highest standards of quality. Our goal is to simplify the publishing process, making it accessible and rewarding for writers of all backgrounds.",
      gradient: "from-amber-700 via-amber-600 to-yellow-600",
      circleColor: "bg-white/[0.04]",
      delay: 0,
      offsetClass: "lg:mt-0",
    },
    {
      ref: vRef,
      inView: vInView,
      num: "02",
      label: "Our Vision",
      heading: "Redefining the Future of Independent Publishing.",
      body: "Our vision is to be the global leader in independent publishing, known for our unwavering commitment to author success and literary excellence. We envision a world where every story has the opportunity to be told and every writer can find their audience. By leveraging cutting-edge technology and a team of passionate experts, we aim to redefine the publishing landscape.",
      gradient: "from-[#064e3b] via-[#047857] to-[#059669]",
      circleColor: "bg-white/[0.04]",
      delay: 0.15,
      offsetClass: "lg:mt-20",
    },
  ];

  return (
    <Section spacing="lg" className="bg-primary-900 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_100%)]" />

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-xl">
            <SectionLabel className="mb-5 text-secondary-400">
              What Drives Us
            </SectionLabel>
            <Heading as="h2" size="h2" className="text-white">
              Purpose & Perspective.
            </Heading>
          </div>
          <Text
            size="lg"
            className="max-w-sm text-primary-200/60 leading-relaxed md:pt-10"
          >
            The foundation of everything we do — clarity of purpose, boldness of
            vision.
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
