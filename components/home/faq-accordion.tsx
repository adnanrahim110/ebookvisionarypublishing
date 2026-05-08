"use client"
import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { SectionLabel } from "@/components/ui/section-label"

const FAQS = [
  {
    question: "Do I keep the rights to my book?",
    answer: "Absolutely! We specialize in helping first-time authors navigate every step — from editing to publishing. You retain 100% of your royalties and creative rights."
  },
  {
    question: "How long does the publishing process take?",
    answer: "The timeline varies depending on the level of editing and design required. Typically, a fully edited manuscript can be published within 4 to 8 weeks."
  },
  {
    question: "Do you offer marketing services?",
    answer: "Yes. We offer comprehensive book marketing services including author website creation, social media promotion, and Amazon ad campaigns."
  },
  {
    question: "What genres do you publish?",
    answer: "We publish a wide variety of genres including Fiction, Non-Fiction, Biographies, Children's Books, Self-Help, and Religious texts."
  }
]

export function FaqAccordion({ faqs = FAQS }: { faqs?: { question: string, answer: string }[] }) {
  // On desktop, the first item is open by default.
  // On mobile, they can all be closed.
  const [activeIndex, setActiveIndex] = React.useState<number | null>(0)

  return (
    <Section spacing="lg" className="bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center lg:hidden">
          <SectionLabel className="mb-4">FAQ</SectionLabel>
          <Heading as="h2" size="h2" className="justify-center">
            Got Questions?
          </Heading>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start max-w-7xl mx-auto">
          
          {/* LEFT SIDE: Navigation List (Desktop) & Accordion (Mobile) */}
          <div className="w-full lg:w-[45%] flex flex-col gap-2 lg:sticky lg:top-32">
            <div className="hidden lg:flex flex-col items-start mb-8 pl-6">
              <SectionLabel className="mb-4">FAQ</SectionLabel>
              <Heading as="h2" size="h2">
                Got Questions?
              </Heading>
            </div>

            <div className="flex flex-col gap-2">
              {faqs.map((faq, index) => {
                const isActive = activeIndex === index

                return (
                  <div key={index} className="relative group border-b border-primary-900/10 lg:border-none last:border-0">
                    
                    {/* Desktop Active Highlight Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeFaqBackground"
                        className="hidden lg:block absolute inset-0 bg-primary-50 rounded-2xl -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    <button
                      onClick={() => {
                        // Desktop: Always keep one open. Mobile: Allow toggling off.
                        if (window.innerWidth >= 1024) {
                          setActiveIndex(index)
                        } else {
                          setActiveIndex(isActive ? null : index)
                        }
                      }}
                      className="w-full text-left py-6 lg:p-6 flex items-center justify-between outline-none relative z-10"
                    >
                      <div className="flex items-center gap-6">
                        <span className={`font-mono text-sm transition-colors duration-300 ${isActive ? "text-primary-900 font-bold" : "text-primary-600 font-medium"}`}>
                          0{index + 1}
                        </span>
                        <h3 className={`text-xl font-heading font-semibold transition-colors duration-300
                          ${isActive ? "text-primary-950" : "text-primary-700 group-hover:text-primary-950"}
                        `}>
                          {faq.question}
                        </h3>
                      </div>

                      {/* Mobile Only Toggle Icon */}
                      <div className="lg:hidden shrink-0 ml-4">
                        {isActive ? (
                          <Minus className="w-5 h-5 text-primary-950" />
                        ) : (
                          <Plus className="w-5 h-5 text-primary-600" />
                        )}
                      </div>
                    </button>

                    {/* Mobile Only Answer Dropdown */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="lg:hidden overflow-hidden"
                        >
                          <p className="pb-8 text-primary-700 leading-relaxed pl-[3.25rem] pr-4">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>

          {/* RIGHT SIDE: The Answer Display (Desktop Only) */}
          <div className="hidden lg:block w-full lg:w-[55%] relative min-h-[500px]">
             <div className="bg-primary-50 rounded-[2.5rem] p-16 h-full relative overflow-hidden flex flex-col justify-center">
                
                {/* Decorative Bloom */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-secondary-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-200/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  {activeIndex !== null && (
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="relative z-10"
                    >
                      {/* Accent Number Badge */}
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-10 shadow-sm border border-primary-900/5">
                        <span className="font-mono text-xl font-bold text-primary-900">
                          0{activeIndex + 1}
                        </span>
                      </div>

                      <h4 className="text-3xl lg:text-4xl font-heading font-bold text-primary-950 mb-6 leading-[1.2]">
                        {faqs[activeIndex]?.question}
                      </h4>
                      
                      <p className="text-primary-800 text-xl leading-relaxed font-light">
                        {faqs[activeIndex]?.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>

        </div>
      </Container>
    </Section>
  )
}
