"use client";

import { motion, useInView } from "framer-motion";
import { Heart, ShieldCheck, TrendingUp, type LucideIcon } from "lucide-react";
import * as React from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Text } from "@/components/ui/text";
import { WHY_PUBLISH } from "@/constants";
import { useReducedMotion } from "@/utils/use-reduced-motion";

const iconMap: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  "trending-up": TrendingUp,
  heart: Heart,
};

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof WHY_PUBLISH.features)[0];
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const Icon = iconMap[feature.icon] || ShieldCheck;

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
    >
      <div
        className={`h-0.5 w-full bg-linear-to-r ${feature.accent} mb-8 origin-left transition-transform duration-500 group-hover:scale-x-100 scale-x-[0.3]`}
      />

      <span className="absolute top-6 right-0 text-[7rem] font-heading font-bold leading-none text-primary-950/3 select-none pointer-events-none transition-all duration-500 group-hover:text-primary-500/6 group-hover:translate-x-2">
        0{index + 1}
      </span>

      <div className="relative mb-6">
        <div className="w-14 h-14 rounded-lg bg-primary-50 flex items-center justify-center text-primary-500 transition-all duration-500 group-hover:bg-primary-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary-500/20 group-hover:-translate-y-1">
          <Icon size={26} strokeWidth={1.5} />
        </div>
      </div>

      <Heading
        as="h3"
        size="h5"
        animated={false}
        className="mb-3 transition-colors duration-300 group-hover:text-primary-600"
      >
        {feature.title}
      </Heading>
      <Text className="text-primary-700/80 leading-relaxed">
        {feature.description}
      </Text>
    </motion.div>
  );
}

export function WhyPublish({
  content = WHY_PUBLISH,
}: {
  content?: typeof WHY_PUBLISH;
}) {
  return (
    <Section spacing="lg" className="bg-white">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8">
          <div className="max-w-xl">
            <SectionLabel className="mb-5">{content.label}</SectionLabel>
            <Heading as="h2" size="h2">
              {content.heading}
            </Heading>
          </div>
          <Text
            size="lg"
            className="max-w-lg text-primary-700/80 leading-relaxed md:pt-10"
          >
            {content.description}
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {content.features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
