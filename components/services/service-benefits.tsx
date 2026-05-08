"use client";

import { motion } from "framer-motion";
import * as React from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { useReducedMotion } from "@/utils/use-reduced-motion";
import { ServiceData } from "./types";

const BENEFIT_IMAGES = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000",
];

export function ServiceBenefits({ service }: { service: ServiceData }) {
  const shouldReduceMotion = useReducedMotion();
  const [activeBenefit, setActiveBenefit] = React.useState(0);

  return (
    <Section className="bg-white relative pt-0" spacing="lg">
      <Container>
        <div className="border-t border-primary-100 pt-16 md:pt-24 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="max-w-2xl">
            <Heading as="h2" size="h2" className="text-primary-950">
              {service.benefitsHeading || "Why Choose Us?"}
            </Heading>
          </div>
          <Text className="text-primary-700/70 max-w-sm md:text-right">
            {service.benefitsSubheading ||
              "Discover the exclusive advantages of partnering with our visionary experts."}
          </Text>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative items-start">
          <div className="hidden lg:block lg:w-1/2 h-150 sticky top-32 rounded-4xl overflow-hidden shadow-2xl border border-primary-100">
            {service.benefits.map((_, idx) => (
              <img
                key={idx}
                src={
                  (service.benefitImages && service.benefitImages[idx]) ||
                  BENEFIT_IMAGES[idx % BENEFIT_IMAGES.length]
                }
                alt="Benefit Visual"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                  activeBenefit === idx
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-linear-to-t from-primary-950/40 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col pb-32">
            {service.benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                viewport={{ amount: 0.5, margin: "-10% 0px -10% 0px" }}
                onViewportEnter={() => setActiveBenefit(idx)}
                className={`flex flex-col justify-center relative cursor-default border-b border-primary-100 py-16 lg:py-32 transition-all duration-700 ${
                  activeBenefit === idx ? "opacity-100" : "opacity-30"
                }`}
              >
                <div
                  className={`text-4xl md:text-5xl font-black mb-6 font-mono tracking-tighter transition-colors duration-500 ${
                    activeBenefit === idx
                      ? "text-transparent bg-clip-text bg-linear-to-br from-primary-400 to-secondary-500"
                      : "text-primary-300"
                  }`}
                >
                  0{idx + 1}
                </div>

                <h3
                  className={`text-2xl md:text-4xl font-bold leading-snug transition-colors duration-500 ${
                    activeBenefit === idx
                      ? "text-primary-950"
                      : "text-primary-500"
                  }`}
                >
                  {benefit}
                </h3>

                <div
                  className={`lg:hidden w-full h-64 rounded-2xl overflow-hidden mt-8 transition-all duration-500 shadow-lg ${
                    activeBenefit === idx ? "block" : "hidden"
                  }`}
                >
                  <img
                    src={
                      (service.benefitImages && service.benefitImages[idx]) ||
                      BENEFIT_IMAGES[idx % BENEFIT_IMAGES.length]
                    }
                    alt="Benefit Visual"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
