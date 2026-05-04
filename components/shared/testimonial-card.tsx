"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import { useReducedMotion } from "@/utils/use-reduced-motion"

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  index?: number
}

export function TestimonialCard({ name, role, content, index = 0 }: TestimonialCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full border-primary-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between bg-primary-50/50 relative overflow-hidden group">
        <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
          <Quote size={80} className="text-primary-500" />
        </div>
        <CardContent className="p-8 pt-10 relative z-10 flex flex-col h-full justify-between gap-8">
          <Text size="lg" className="text-primary-900 leading-relaxed italic relative z-10">
            "{content}"
          </Text>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-heading font-bold text-xl shrink-0">
              {name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <Heading as="h4" size="h6" className="text-primary-950 leading-tight">
                {name}
              </Heading>
              <Text size="sm" className="text-primary-600 mt-1">
                {role}
              </Text>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
