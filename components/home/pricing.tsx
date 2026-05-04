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
import { useReducedMotion } from "@/utils/use-reduced-motion";

const OFFERS = [
  {
    text: "Step-by-step publishing support",
    bold: "from manuscript to market",
  },
  {
    text: "Creative freedom",
    bold: "with professional guidance along the way",
  },
  { text: "Affordable editing, formatting,", bold: "and design packages" },
  {
    text: "Distribution to major platforms",
    bold: "like Amazon, Barnes & Noble, and Apple Books",
  },
  { text: "Marketing add-ons", bold: "to boost your visibility and reach" },
];

export function Pricing() {
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
                src="/images/author-publishing.png"
                alt="Author holding her published book"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary-950/30 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -right-4 md:right-6 bg-white rounded-xl shadow-xl border border-primary-100 p-5 flex items-center gap-4 z-10">
              <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center">
                <span className="font-heading font-black text-primary-600 text-lg">
                  100%
                </span>
              </div>
              <div>
                <p className="font-heading font-bold text-primary-900 text-sm">
                  Royalty Ownership
                </p>
                <p className="text-primary-400 text-xs">
                  You keep all your earnings
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
            <SectionLabel className="mb-4">Publishing Your Way</SectionLabel>

            <Heading as="h2" size="h2" className="mb-6">
              Every Step of Publishing.
            </Heading>

            <Text size="lg" className="text-neutral-700 mb-4 leading-relaxed">
              Publishing today isn&apos;t what it used to be. While traditional
              publishing can offer recognition, it often means surrendering
              creative control to industry gatekeepers. That&apos;s why more
              authors are choosing self-publishing where the power stays with
              you.
            </Text>

            <Text className="text-neutral-600 mb-10 leading-relaxed">
              Whether you&apos;re launching the next bestseller or sharing a
              passion project, our ebook and print publishing services make it
              easy to publish your book your way.
            </Text>

            <div className="mb-10">
              <Heading as="h3" size="h5" animated={false} className="mb-6">
                What We Offer:
              </Heading>

              <ul className="flex flex-col gap-4">
                {OFFERS.map((item, i) => (
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
                        {item.text}
                      </strong>{" "}
                      {item.bold}
                    </Text>
                  </motion.li>
                ))}
              </ul>
            </div>

            <Button href="/contact" size="lg" className="group">
              Start Your Journey
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
