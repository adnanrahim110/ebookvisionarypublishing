"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import * as React from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { useReducedMotion } from "@/utils/use-reduced-motion";

import {
  AlignLeft,
  Edit3,
  Feather,
  Image as ImageIcon,
  Layout,
  PenTool,
} from "lucide-react";
import { ServiceData } from "./types";

const iconMap: Record<string, React.ElementType<any>> = {
  feather: Feather,
  "edit-3": Edit3,
  "align-left": AlignLeft,
  layout: Layout,
  image: ImageIcon,
  "pen-tool": PenTool,
  "book-open": BookOpen,
};

export function ServiceOverview({ service }: { service: ServiceData }) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = (iconMap[service.icon] || BookOpen) as any;

  return (
    <Section className="bg-primary-50 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,#ffffff_0%,transparent_100%)] opacity-30 pointer-events-none" />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-primary-100 mb-8">
              <Icon className="w-5 h-5 text-secondary-500" />
              <span className="text-sm font-semibold tracking-wider text-primary-800 uppercase font-heading">
                {service.overviewLabel || "Overview"}
              </span>
            </div>
            <Heading as="h2" size="h2" className="text-primary-950 mb-6">
              {service.overviewHeading || (
                <>
                  Exceptional{" "}
                  <span className="text-secondary-500">{service.title}</span>{" "}
                  Services
                </>
              )}
            </Heading>
            <Text className="text-primary-700/70 text-lg leading-relaxed">
              {service.overview}
            </Text>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-linear-to-tr from-secondary-500/20 to-primary-500/20 blur-2xl rounded-[3rem] opacity-50" />
            <div className="relative aspect-square sm:aspect-video lg:aspect-4/3 rounded-3xl bg-white border border-primary-100 overflow-hidden flex items-center justify-center shadow-sm">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,48,75,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,48,75,0.03)_1px,transparent_1px)] bg-size-[2rem_2rem]" />
              <Icon className="w-32 h-32 text-secondary-500/30" />
              <div className="absolute inset-0 bg-linear-to-tr from-primary-50/80 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
