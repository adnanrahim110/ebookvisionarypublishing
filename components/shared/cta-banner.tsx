"use client";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { useReducedMotion } from "@/utils/use-reduced-motion";

export function CTABanner() {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <Section spacing="lg" className="bg-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary-200 to-transparent" />

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
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary-600 font-body">
                  Start Your Journey
                </span>
              </div>

              <Heading as="h2" size="h1" className="leading-[1.1]!">
                Ready to share your{" "}
                <em className="not-italic bg-linear-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                  story
                </em>{" "}
                with the world?
              </Heading>

              <Text className="text-primary-700/60 leading-relaxed mt-6 max-w-2xl">
                Join hundreds of successful authors who trusted us to bring
                their books to life. Your masterpiece deserves premium
                treatment.
              </Text>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-8 shrink-0 lg:pb-2">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" href="/contact">
                  Get a Free Consultation
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button size="lg" variant="outline" href="/services">
                  Our Services
                </Button>
              </div>

              <div className="flex items-center gap-6 text-primary-400">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-lg text-primary-800">
                    1,200+
                  </span>
                  <span className="text-xs text-primary-500/70 font-body">
                    Books Published
                  </span>
                </div>
                <span className="w-px h-4 bg-primary-200" />
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-lg text-primary-800">
                    98%
                  </span>
                  <span className="text-xs text-primary-500/70 font-body">
                    Satisfaction
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
