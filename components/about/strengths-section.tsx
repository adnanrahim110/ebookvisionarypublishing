"use client";
import { motion, useInView } from "framer-motion";
import { Award, BookOpen, DollarSign, Users } from "lucide-react";
import * as React from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Text } from "@/components/ui/text";
import { useReducedMotion } from "@/utils/use-reduced-motion";

const strengths = [
  {
    icon: Award,
    title: "Best Seller Ghostwriters",
    description:
      "Our top-notch ghostwriters work tirelessly to deliver a best-selling novel, crafting narratives that captivate readers from the first page to the last.",
  },
  {
    icon: Users,
    title: "Experienced Professionals",
    description:
      "With experienced professionals and over a decade of expertise in digital publishing, we bring unmatched skill to every project we undertake.",
  },
  {
    icon: BookOpen,
    title: "1200+ Books Published",
    description:
      "We have successfully released more than 1,200 books on renowned platforms including Amazon, Barnes & Noble, and Apple Books worldwide.",
  },
  {
    icon: DollarSign,
    title: "Affordability Is Our Strength",
    description:
      "We offer different affordable packages with absolutely no compromise on quality, making premium publishing services accessible to every author.",
  },
];

function StrengthCard({
  item,
  index,
}: {
  item: (typeof strengths)[0];
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
    >
      <div className="h-0.5 w-full bg-linear-to-r from-primary-500 to-secondary-400 mb-10 origin-left transition-transform duration-700 group-hover:scale-x-100 scale-x-[0.2]" />

      <span className="absolute top-8 right-0 text-[7rem] font-heading font-bold leading-none text-primary-950/3 select-none pointer-events-none transition-all duration-700 group-hover:text-primary-500/6">
        0{index + 1}
      </span>

      <div className="relative mb-6">
        <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500 transition-all duration-500 group-hover:bg-primary-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary-500/20 group-hover:-translate-y-1">
          <Icon size={26} strokeWidth={1.5} />
        </div>
      </div>

      <Heading
        as="h3"
        size="h5"
        animated={false}
        className="mb-3 transition-colors duration-300 group-hover:text-primary-600"
      >
        {item.title}
      </Heading>
      <Text className="text-primary-700/80 leading-relaxed">
        {item.description}
      </Text>
    </motion.div>
  );
}

export function StrengthsSection() {
  return (
    <Section spacing="lg" className="bg-white">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8">
          <div className="max-w-2xl">
            <SectionLabel className="mb-5">Why Choose Us</SectionLabel>
            <Heading as="h2" size="h2">
              What Sets Us Apart.
            </Heading>
          </div>
          <Text
            size="lg"
            className="max-w-sm text-primary-700/80 leading-relaxed md:pt-10"
          >
            We combine creative excellence with affordable pricing to deliver
            publishing solutions that truly make a difference.
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {strengths.map((item, i) => (
            <StrengthCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
