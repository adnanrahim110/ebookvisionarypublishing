"use client"
import * as React from "react"
import { motion, useInView } from "framer-motion"
import { ShieldCheck, TrendingUp, Heart } from "lucide-react"

import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import { SectionLabel } from "@/components/ui/section-label"
import { useReducedMotion } from "@/utils/use-reduced-motion"

const features = [
  {
    icon: ShieldCheck,
    title: "Complete Ownership",
    description: "You retain 100% of your royalties and creative rights. We provide the expertise, but the story is entirely yours.",
    accent: "from-primary-500 to-secondary-400",
  },
  {
    icon: TrendingUp,
    title: "Global Distribution",
    description: "Reach readers worldwide through Amazon, Barnes & Noble, Apple Books, and extended distribution networks seamlessly.",
    accent: "from-secondary-400 to-primary-400",
  },
  {
    icon: Heart,
    title: "Editorial Excellence",
    description: "Our dedicated team polishes every word, ensuring your book stands out in a crowded market with premium quality.",
    accent: "from-primary-600 to-secondary-500",
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const shouldReduceMotion = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      {/* Gradient top border */}
      <div className={`h-[2px] w-full bg-linear-to-r ${feature.accent} mb-8 origin-left transition-transform duration-500 group-hover:scale-x-100 scale-x-[0.3]`} />

      {/* Number watermark */}
      <span className="absolute top-6 right-0 text-[7rem] font-heading font-bold leading-none text-primary-950/[0.03] select-none pointer-events-none transition-all duration-500 group-hover:text-primary-500/[0.06] group-hover:translate-x-2">
        0{index + 1}
      </span>

      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-14 h-14 rounded-lg bg-primary-50 flex items-center justify-center text-primary-500 transition-all duration-500 group-hover:bg-primary-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary-500/20 group-hover:-translate-y-1">
          <feature.icon size={26} strokeWidth={1.5} />
        </div>
      </div>

      {/* Content */}
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

      {/* Bottom arrow link hint */}
      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary-500 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <span>Learn more</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </motion.div>
  )
}

export function WhyPublish() {
  return (
    <Section spacing="lg" className="bg-white">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8">
          <div className="max-w-2xl">
            <SectionLabel className="mb-5">Why Choose Us</SectionLabel>
            <Heading as="h2" size="h2">Publish With Confidence.</Heading>
          </div>
          <Text size="lg" className="max-w-sm text-primary-700/80 leading-relaxed md:pt-10">
            We simplify the complex world of publishing so you can focus on what matters most — your writing.
          </Text>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
