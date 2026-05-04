"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { useReducedMotion } from "@/utils/use-reduced-motion"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"

export function CTABanner() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Section spacing="lg" className="bg-primary-950 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary-500 rounded-full mix-blend-screen filter blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-500 rounded-full mix-blend-screen filter blur-3xl" />
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto flex flex-col items-center gap-6"
        >
          <Heading as="h2" size="h2" className="text-white justify-center">
            Ready to Share Your Story With the World?
          </Heading>
          <Text variant="light" size="lg" className="text-primary-100 max-w-2xl">
            Join hundreds of successful authors who trusted Ebook Visionary Publishing to bring their books to life. Your masterpiece deserves premium treatment.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button size="lg" href="/contact">Get a Free Consultation</Button>
            <Button size="lg" variant="outline-white" href="/services">
              Explore Our Services
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
