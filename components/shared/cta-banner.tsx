"use client";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { DEFAULT_CTA_BANNER } from "@/constants";
import { useReducedMotion } from "@/utils/use-reduced-motion";

interface CtaData {
  label?: string;
  title: string;
  highlight: string;
  description: string;
  suffix?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  stats?: { value: string; label: string }[];
}

export function CTABanner({ 
  theme = "light", 
  ctaData 
}: { 
  theme?: "light" | "dark",
  ctaData?: CtaData
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isDark = theme === "dark";

  return (
    <Section spacing="lg" className={`${isDark ? 'bg-primary-950' : 'bg-white'} overflow-hidden relative`}>
      <div className={`absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent ${isDark ? 'via-primary-800' : 'via-primary-200'} to-transparent`} />

      <Container>
        <motion.div
          ref={ref}
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-10 h-0.5 bg-secondary-400" />
                <span className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? 'text-secondary-400' : 'text-secondary-600'} font-body`}>
                  {ctaData?.label || DEFAULT_CTA_BANNER.label}
                </span>
              </div>

              <Heading as="h2" size="h1" className={`leading-[1.1]! ${isDark ? 'text-white' : ''}`}>
                {ctaData ? ctaData.title : DEFAULT_CTA_BANNER.title}{" "}
                <em className="not-italic bg-linear-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                  {ctaData ? ctaData.highlight : DEFAULT_CTA_BANNER.highlight}
                </em>{" "}
                {ctaData ? ctaData.suffix || "" : DEFAULT_CTA_BANNER.suffix}
              </Heading>

              <Text className={`${isDark ? 'text-primary-200/60' : 'text-primary-700/60'} leading-relaxed mt-6 max-w-2xl`}>
                {ctaData ? ctaData.description : DEFAULT_CTA_BANNER.description}
              </Text>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-8 shrink-0 lg:pb-2">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" href={ctaData?.primaryCta?.href || DEFAULT_CTA_BANNER.primaryCta.href}>
                  {ctaData?.primaryCta?.label || DEFAULT_CTA_BANNER.primaryCta.label}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button size="lg" variant={isDark ? "secondary" : "outline"} href={ctaData?.secondaryCta?.href || DEFAULT_CTA_BANNER.secondaryCta.href}>
                  {ctaData?.secondaryCta?.label || DEFAULT_CTA_BANNER.secondaryCta.label}
                </Button>
              </div>

              <div className={`flex items-center gap-6 ${isDark ? 'text-primary-300' : 'text-primary-400'}`}>
                <div className="flex items-center gap-2">
                  <span className={`font-heading font-bold text-lg ${isDark ? 'text-white' : 'text-primary-800'}`}>
                    {(ctaData?.stats || DEFAULT_CTA_BANNER.stats)[0].value}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-primary-300/70' : 'text-primary-500/70'} font-body`}>
                    {(ctaData?.stats || DEFAULT_CTA_BANNER.stats)[0].label}
                  </span>
                </div>
                <span className={`w-px h-4 ${isDark ? 'bg-primary-800' : 'bg-primary-200'}`} />
                <div className="flex items-center gap-2">
                  <span className={`font-heading font-bold text-lg ${isDark ? 'text-white' : 'text-primary-800'}`}>
                    {(ctaData?.stats || DEFAULT_CTA_BANNER.stats)[1].value}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-primary-300/70' : 'text-primary-500/70'} font-body`}>
                    {(ctaData?.stats || DEFAULT_CTA_BANNER.stats)[1].label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
