"use client";
import { motion, useInView } from "framer-motion";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Text } from "@/components/ui/text";
import { ABOUT_PAGE } from "@/constants";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/utils/use-reduced-motion";

function BentoCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function StorySection({
  content = ABOUT_PAGE.story,
}: {
  content?: typeof ABOUT_PAGE.story;
}) {
  return (
    <Section spacing="lg" className="bg-primary-50/50 overflow-hidden">
      <Container>
        <div className="max-w-2xl mb-16">
          <SectionLabel className="mb-5">{content.label}</SectionLabel>
          <Heading as="h2" size="h2">
            {content.heading}
          </Heading>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <BentoCard delay={0} className="lg:col-span-7 group">
            <div className="relative h-full rounded-2xl bg-white border border-primary-100/80 p-10 md:p-14 overflow-hidden transition-shadow duration-700 hover:shadow-xl hover:shadow-primary-900/4">
              <div className="absolute top-6 right-6 font-heading font-black text-[10rem] leading-none text-primary-950/2 select-none pointer-events-none tracking-tighter transition-all duration-700 group-hover:text-primary-500/4">
                &ldquo;
              </div>

              <div className="relative z-10">
                <Text
                  size="lg"
                  className="text-primary-800 leading-loose font-light mb-8"
                >
                  <span className="float-left font-heading font-bold text-6xl leading-[0.8] mr-3 mt-1 text-primary-500">
                    E
                  </span>
                  {content.paragraphs[0].slice(1)}
                </Text>

                <Text
                  size="lg"
                  className="text-primary-700/80 leading-loose font-light mb-8"
                >
                  {content.paragraphs[1]}
                </Text>

                <Text
                  size="lg"
                  className="text-primary-700/80 leading-loose font-light"
                >
                  {content.paragraphs[2]}
                </Text>
              </div>

              <div className="h-0.5 w-full bg-linear-to-r from-primary-200 via-secondary-300/40 to-transparent mt-10 origin-left scale-x-[0.4] group-hover:scale-x-100 transition-transform duration-700" />
            </div>
          </BentoCard>

          <div className="lg:col-span-5 flex flex-col gap-5">
            <BentoCard delay={0.1} className="group flex-1">
              <div className="relative h-full rounded-2xl bg-primary-950 p-10 md:p-12 overflow-hidden transition-shadow duration-700 hover:shadow-xl hover:shadow-primary-950/30">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_20%_-20%,#084c72_0%,transparent_70%)]" />
                <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-secondary-500/5 blur-[60px] pointer-events-none" />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <span className="inline-block font-heading font-black text-7xl leading-none text-secondary-400/20 mb-4 select-none">
                      &ldquo;
                    </span>
                    <Text
                      size="xl"
                      className="text-white/90! font-heading font-medium leading-[1.6] italic"
                    >
                      {content.quote}
                    </Text>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <span className="text-secondary-400 text-sm font-semibold font-heading tracking-wide">
                      {content.quoteAuthor}
                    </span>
                    <span className="block text-white/40 text-xs font-body mt-1">
                      {content.quoteRole}
                    </span>
                  </div>
                </div>
              </div>
            </BentoCard>

            <BentoCard delay={0.2} className="group">
              <div className="relative rounded-2xl bg-white border border-primary-100/80 p-8 overflow-hidden transition-shadow duration-700 hover:shadow-xl hover:shadow-primary-900/4">
                <div className="grid grid-cols-3 divide-x divide-primary-100">
                  {content.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col items-center text-center px-3"
                    >
                      <span className="font-heading font-black text-3xl md:text-4xl text-primary-800 tracking-tight leading-none">
                        {stat.value}
                      </span>
                      <div className="mt-3 mb-2 h-px w-6 rounded-full bg-secondary-400/40" />
                      <span className="text-primary-500 text-[10px] font-semibold uppercase tracking-[0.2em]">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>
          </div>

          <BentoCard delay={0.25} className="lg:col-span-5 group">
            <div className="relative h-full rounded-2xl bg-white border border-primary-100/80 p-10 md:p-12 overflow-hidden flex flex-col justify-center transition-shadow duration-700 hover:shadow-xl hover:shadow-primary-900/4">
              <div className="absolute -bottom-4 -right-4 opacity-[0.025] pointer-events-none select-none">
                <span className="font-heading font-black text-[12rem] leading-none tracking-tighter text-primary-950">
                  EVP
                </span>
              </div>

              <div className="relative z-10">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary-500 font-body mb-4 block">
                  {content.beliefLabel}
                </span>
                <Heading
                  as="h3"
                  size="h4"
                  animated={false}
                  className="mb-4 leading-snug!"
                >
                  {content.beliefHeading}
                </Heading>
                <Text className="text-primary-700/70 leading-relaxed">
                  {content.beliefDescription}
                </Text>
              </div>
            </div>
          </BentoCard>

          <BentoCard delay={0.3} className="lg:col-span-7">
            <div className="relative h-full rounded-2xl bg-linear-to-br from-primary-950 to-primary-900 p-10 md:p-12 overflow-hidden transition-shadow duration-700 hover:shadow-xl hover:shadow-primary-950/30">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(44,199,228,0.06)_0%,transparent_50%,rgba(6,176,248,0.04)_100%)]" />
              <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-secondary-400/30 to-transparent" />

              <div className="relative z-10 flex flex-col items-start justify-between gap-4 h-full">
                <Heading
                  as="h3"
                  size="h4"
                  animated={false}
                  className="text-white leading-snug!"
                >
                  {content.ctaHeading}
                </Heading>
                <Text className="text-primary-200/60 leading-relaxed">
                  {content.ctaDescription}
                </Text>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Button size="lg" href={content.primaryCta.href}>
                    {content.primaryCta.label}
                  </Button>
                  <Button size="lg" variant="outline-white" href={content.secondaryCta.href}>
                    {content.secondaryCta.label}
                  </Button>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </Container>
    </Section>
  );
}
