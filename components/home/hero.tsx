"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useReducedMotion } from "@/utils/use-reduced-motion";

const Hero3D = dynamic(() => import("./hero-3d").then((mod) => mod.Hero3D), {
  ssr: false,
});

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-dvh flex items-center overflow-hidden bg-primary-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_70%_-10%,#084c72_0%,#06304b_35%,#021a2b_70%,#020e16_100%)]" />

      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_60%_at_60%_30%,black_10%,transparent_80%)]" />

      <div className="absolute -top-1/5 right-1/10 w-[50vw] h-[50vw] rounded-full bg-secondary-500/7 blur-[100px]" />
      <div className="absolute bottom-1/10 -left-1/10 w-[40vw] h-[40vw] rounded-full bg-primary-500/5 blur-[100px]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-[42%] w-px h-[60%] bg-linear-to-b from-transparent via-white/6 to-transparent rotate-15 origin-top hidden lg:block" />
        <div className="absolute top-1/5 right-[38%] w-px h-[50%] bg-linear-to-b from-transparent via-secondary-400/8 to-transparent rotate-15 origin-top hidden lg:block" />
      </div>

      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
        className="absolute top-[15%] right-[25%] w-16 h-16 border border-white/6 rotate-45 hidden lg:block"
      />

      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-[25%] right-[30%] w-3 h-3 rounded-full bg-secondary-400/30 hidden lg:block"
      />

      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.8 }}
        className="absolute top-[60%] right-[15%] w-24 h-24 rounded-full border border-white/4 hidden lg:block"
      />

      <div className="absolute top-[45%] right-[20%] w-32 h-px bg-linear-to-r from-transparent via-secondary-400/20 to-transparent hidden lg:block" />

      {!shouldReduceMotion && <Hero3D />}

      <div className="absolute inset-0 bg-linear-to-r from-[#020e16] via-[#020e16]/90 via-40% to-transparent pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-primary-950 to-transparent pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-3xl w-full py-32 lg:py-32 relative">
          <div className="absolute left-0 inset-y-24 w-px overflow-y-hidden bg-white/[0.07] hidden lg:block">
            {!shouldReduceMotion && (
              <motion.div
                className="absolute left-0 w-px h-20 bg-linear-to-b from-transparent via-secondary-400/60 to-transparent"
                style={{ boxShadow: "0 0 8px 1px rgba(44,199,228,0.15)" }}
                animate={{ top: ["-80px", "calc(100% + 80px)"] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 2,
                }}
              />
            )}
          </div>

          <div className="lg:pl-10">
            <motion.div
              {...(shouldReduceMotion ? {} : fadeUp(0.1))}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-sm bg-white/4 border border-white/8 backdrop-blur-sm mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-secondary-400" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-primary-200/80">
                Premium Publishing Studio
              </span>
            </motion.div>

            <Heading
              as="h1"
              size="h1"
              animated
              className="mb-8 max-w-2xl text-white! leading-[1.1]!"
            >
              Give Your Story The Voice It Deserves.
            </Heading>

            <motion.div {...(shouldReduceMotion ? {} : fadeUp(0.8))}>
              <Text
                size="xl"
                className="max-w-3xl mb-10 leading-relaxed text-primary-200/80! font-light"
              >
                Thoughtfully crafted, beautifully produced, and ready for the
                world. We bring your story to life with{" "}
                <span className="text-white font-medium">
                  premium publishing support
                </span>{" "}
                from start to finish.
              </Text>

              <div className="flex items-center gap-8 mb-10">
                {[
                  { value: "500+", label: "Books Published" },
                  { value: "98%", label: "Client Satisfaction" },
                  { value: "15+", label: "Years Experience" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-[11px] tracking-wider uppercase text-primary-300/60 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" href="/contact">
                  Start Publishing
                  <ArrowRight size={18} />
                </Button>
                <Button size="lg" variant="outline-white" href="/portfolio">
                  View Our Portfolio
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
