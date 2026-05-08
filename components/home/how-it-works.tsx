"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lightbulb, Map, PenTool, Rocket, Sparkles } from "lucide-react";
import * as React from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Text } from "@/components/ui/text";

const DEFAULT_STEPS = [
  {
    title: "Shape the Big Idea",
    description:
      "We begin by understanding the heart of your book, its themes, purpose, and message. This foundational step ensures your vision is crystal clear before we write a single word.",
    icon: "lightbulb",
  },
  {
    title: "Plan with Purpose",
    description:
      "Our team researches, outlines, and organizes your book's direction. We build a comprehensive roadmap that ensures every chapter flows naturally and purposefully.",
    icon: "map",
  },
  {
    title: "Write with Confidence",
    description:
      "We guide you through each draft, helping you strengthen your voice while maintaining structure. Our collaborative process brings your ideas to life on the page.",
    icon: "pen-tool",
  },
  {
    title: "Polish Every Page",
    description:
      "Our expert editors refine your manuscript with careful attention to tone, clarity, pacing, and grammar. We polish your work until it shines, ready for readers.",
    icon: "sparkles",
  },
  {
    title: "Publish with Impact",
    description:
      "Your book is completed with professional formatting, custom cover design, and a seamless publishing process. We help you launch your masterpiece to the world.",
    icon: "rocket",
  },
];

const ACCENTS = [
  {
    bg: "bg-[#06b0f8]/10",
    border: "border-[#06b0f8]/50",
    text: "text-[#06b0f8]",
    shadow: "shadow-[0_0_30px_rgba(6,176,248,0.4)]",
  },
  {
    bg: "bg-[#a78bfa]/10",
    border: "border-[#a78bfa]/50",
    text: "text-[#a78bfa]",
    shadow: "shadow-[0_0_30px_rgba(167,139,250,0.4)]",
  },
  {
    bg: "bg-[#f59e0b]/10",
    border: "border-[#f59e0b]/50",
    text: "text-[#f59e0b]",
    shadow: "shadow-[0_0_30px_rgba(245,158,11,0.4)]",
  },
  {
    bg: "bg-[#34d399]/10",
    border: "border-[#34d399]/50",
    text: "text-[#34d399]",
    shadow: "shadow-[0_0_30px_rgba(52,211,153,0.4)]",
  },
  {
    bg: "bg-[#fb7185]/10",
    border: "border-[#fb7185]/50",
    text: "text-[#fb7185]",
    shadow: "shadow-[0_0_30px_rgba(251,113,133,0.4)]",
  },
];

export function HowItWorks({
  processSteps = DEFAULT_STEPS,
}: {
  processSteps?: { title: string; description: string; icon: string }[];
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <Section spacing="lg" className="bg-primary-950 overflow-hidden">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-24 flex flex-col items-center relative z-10">
          <SectionLabel className="mb-4 text-secondary-400">
            The Process
          </SectionLabel>
          <Heading as="h2" size="h2" className="text-white justify-center">
            How It Works.
          </Heading>
        </div>

        <div className="relative max-w-6xl mx-auto py-10" ref={containerRef}>
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/5 md:-translate-x-1/2 rounded-full" />

          <motion.div
            className="absolute left-8 md:left-1/2 top-0 w-1 bg-linear-to-b from-primary-400 to-secondary-400 origin-top shadow-[0_0_15px_rgba(6,176,248,0.8)] md:-translate-x-1/2 rounded-full z-0"
            style={{
              scaleY: scrollYProgress,
              height: "100%",
            }}
          />

          <div className="flex flex-col gap-24 md:gap-40">
            {processSteps.map((step, i) => (
              <TimelineStep key={i} step={step} i={i} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

interface TimelineStepProps {
  step: (typeof DEFAULT_STEPS)[0];
  i: number;
}

const iconMap: Record<string, React.ElementType<any>> = {
  lightbulb: Lightbulb,
  map: Map,
  "pen-tool": PenTool,
  sparkles: Sparkles,
  rocket: Rocket,
};

function TimelineStep({ step, i }: TimelineStepProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isEven = i % 2 === 0;
  const accent = ACCENTS[i % ACCENTS.length];
  const Icon = (iconMap[step.icon] || Lightbulb) as any;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "center 50%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  const activeOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <div ref={ref} className="relative flex w-full">
      <div className="absolute left-8 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
        <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-primary-950 border-2 border-white/10 flex items-center justify-center transition-colors">
          <Icon className="h-5 w-5 md:h-6 md:w-6 text-white/20" />
        </div>

        <motion.div
          style={{ opacity: activeOpacity }}
          className={`absolute inset-0 rounded-full ${accent.bg} border-2 ${accent.border} flex items-center justify-center ${accent.shadow} backdrop-blur-sm`}
        >
          <Icon className={`h-6 w-6 md:h-7 md:w-7 ${accent.text}`} />
        </motion.div>
      </div>

      <div
        className={`flex w-full flex-col md:flex-row ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center`}
      >
        <motion.div
          style={{ opacity, y, scale }}
          className={`w-full pl-24 md:pl-0 md:w-1/2 ${isEven ? "md:pr-24 md:text-right" : "md:pl-24 md:text-left"} pt-1 md:pt-0`}
        >
          <span
            className={`text-xs md:text-sm font-heading font-bold tracking-widest uppercase ${accent.text} mb-3 block`}
          >
            Phase 0{i + 1}
          </span>
          <Heading
            as="h3"
            size="h3"
            animated={false}
            className="text-white mb-4"
          >
            {step.title}
          </Heading>
          <Text className="text-primary-200/60 text-base md:text-lg leading-relaxed">
            {step.description}
          </Text>
        </motion.div>

        <div className="hidden md:block md:w-1/2 relative h-50">
          <motion.div
            style={{ opacity: activeOpacity, scale, y }}
            className={`absolute top-1/2 -translate-y-1/2 ${isEven ? "left-24" : "right-24"} text-[14rem] lg:text-[18rem] font-heading font-black text-white/2 select-none pointer-events-none tracking-tighter`}
          >
            0{i + 1}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
