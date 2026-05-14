"use client";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Text } from "@/components/ui/text";
import { PRICING_SECTION } from "@/constants";
import { useReducedMotion } from "@/utils/use-reduced-motion";

export function Pricing({
  content = PRICING_SECTION,
}: {
  content?: typeof PRICING_SECTION;
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section spacing="lg" className="bg-white overflow-hidden">
      <Container>
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center"
        >
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-4/5 shadow-2xl">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary-950/30 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -right-4 md:right-6 bg-white rounded-xl shadow-xl border border-primary-100 p-5 flex items-center gap-4 z-10">
              <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center">
                <span className="font-heading font-black text-primary-600 text-lg">
                  {content.badge.value}
                </span>
              </div>
              <div>
                <p className="font-heading font-bold text-primary-900 text-sm">
                  {content.badge.title}
                </p>
                <p className="text-primary-400 text-xs">
                  {content.badge.description}
                </p>
              </div>
            </div>

            <div className="absolute -top-4 -left-4 w-20 h-20 border-l-[3px] border-t-[3px] border-primary-200 rounded-tl-2xl pointer-events-none" />
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel className="mb-4">{content.label}</SectionLabel>

            <Heading as="h2" size="h2" className="mb-6">
              {content.heading}
            </Heading>

            <Text size="lg" className="text-neutral-700 mb-4 leading-relaxed">
              {content.paragraphs[0]}
            </Text>

            <Text className="text-neutral-600 mb-10 leading-relaxed">
              {content.paragraphs[1]}
            </Text>

            <div className="mb-10">
              <Heading as="h3" size="h5" animated={false} className="mb-6">
                {content.offerHeading}
              </Heading>

              <ul className="flex flex-col gap-4">
                {content.offers.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: shouldReduceMotion ? 0 : 0.3 + i * 0.08,
                    }}
                    className="flex items-start gap-3 group"
                  >
                    <CheckCircle
                      className="text-secondary-500 shrink-0 mt-0.5"
                      size={18}
                      strokeWidth={2}
                    />
                    <Text size="sm" className="text-primary-700">
                      <strong className="font-semibold text-primary-900">
                        {item}
                      </strong>{" "}
                    </Text>
                  </motion.li>
                ))}
              </ul>
            </div>

            <Button href={content.cta.href} size="lg" className="group">
              {content.cta.label}
              <ArrowRight
                size={16}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
