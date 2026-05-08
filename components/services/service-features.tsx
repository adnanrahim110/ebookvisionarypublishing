"use client";

import { motion } from "framer-motion";
import { CheckCircle, ChevronRight } from "lucide-react";
import * as React from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { useReducedMotion } from "@/utils/use-reduced-motion";
import { ServiceData } from "./types";

const FEATURE_IMAGES = [
  "https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1476275466078-4007374efac4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=800",
];

export function ServiceFeatures({ service }: { service: ServiceData }) {
  const shouldReduceMotion = useReducedMotion();
  const [activeFeature, setActiveFeature] = React.useState(0);

  return (
    <Section className="bg-white relative overflow-hidden" spacing="lg">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-600 text-xs font-bold tracking-widest uppercase mb-4 border border-primary-100 shadow-sm">
            {service.featuresLabel || "Capabilities"}
          </span>
          <Heading as="h2" size="h2" className="text-primary-950 mb-6">
            {service.featuresHeading || "Everything you need to succeed."}
          </Heading>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          <div className="w-full lg:w-1/3 flex flex-col gap-2">
            {service.features.map((feature, idx) => {
              const isActive = activeFeature === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveFeature(idx)}
                  className={`text-left px-6 py-5 rounded-2xl transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? "bg-primary-950 text-white shadow-md"
                      : "bg-transparent text-primary-600 hover:bg-primary-50 border border-transparent hover:border-primary-100"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary-500"
                    />
                  )}
                  <div className="flex items-center justify-between relative z-10">
                    <span
                      className={`font-semibold text-lg ${isActive ? "text-white" : "group-hover:text-primary-900"}`}
                    >
                      {feature.title}
                    </span>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform duration-300 ${isActive ? "text-secondary-400 translate-x-1" : "text-primary-300"}`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="w-full lg:w-2/3 min-h-100">
            <div className="bg-white border border-primary-100 rounded-4xl h-full flex flex-col md:flex-row relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="w-full md:w-1/2 p-10 md:p-12 flex flex-col justify-center relative z-10 bg-white order-2 md:order-1">
                <motion.div
                  key={activeFeature}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center border border-primary-100 shadow-sm mb-6">
                    <CheckCircle className="w-6 h-6 text-secondary-500" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary-950 mb-4 leading-tight">
                    {service.features[activeFeature].title}
                  </h3>
                  <Text className="text-base text-primary-700/80 leading-relaxed">
                    {service.features[activeFeature].description}
                  </Text>
                </motion.div>
              </div>

              <div className="w-full md:w-1/2 relative h-64 md:h-full order-1 md:order-2 bg-primary-50">
                {service.features.map((feature, idx) => (
                  <img
                    key={idx}
                    src={
                      feature.image ||
                      FEATURE_IMAGES[idx % FEATURE_IMAGES.length]
                    }
                    alt={feature.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      activeFeature === idx ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute inset-0 shadow-[inset_20px_0_40px_rgba(255,255,255,1)] hidden md:block" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
