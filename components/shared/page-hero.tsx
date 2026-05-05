"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/utils/use-reduced-motion";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  label?: string;
  breadcrumbs?: Breadcrumb[];
  alignment?: "left" | "center";
}

function extractWatermarkWord(title: string): string {
  const words = title
    .replace(/[^a-zA-Z\s]/g, "")
    .trim()
    .split(/\s+/);
  const word =
    words.find((w) => w.length >= 5) || words[words.length - 1] || "EVP";
  return word.toUpperCase();
}

export function PageHero({
  title,
  subtitle,
  label,
  breadcrumbs,
  alignment = "center",
}: PageHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const alignCenter = alignment === "center";
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const watermark = extractWatermarkWord(title);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70dvh] flex items-end overflow-hidden bg-primary-950 pb-24 pt-48"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,#084c72_0%,#06304b_40%,#021a2b_75%,#020e16_100%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[5rem_5rem] mask-[radial-gradient(ellipse_70%_50%_at_50%_50%,black_10%,transparent_80%)]" />

      <div className="absolute -top-1/5 left-[10%] w-[45vw] h-[45vw] rounded-full bg-[radial-gradient(circle,rgba(6,176,248,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-30%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(44,199,228,0.06)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        initial={shouldReduceMotion ? {} : { scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-24 left-8 lg:left-16 w-24 h-px bg-linear-to-r from-secondary-400/60 to-transparent origin-left"
      />
      <motion.div
        initial={shouldReduceMotion ? {} : { scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-24 left-8 lg:left-16 w-px h-24 bg-linear-to-b from-secondary-400/60 to-transparent origin-top"
      />
      <motion.div
        initial={shouldReduceMotion ? {} : { scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-12 right-8 lg:right-16 w-24 h-px bg-linear-to-l from-secondary-400/40 to-transparent origin-right"
      />
      <motion.div
        initial={shouldReduceMotion ? {} : { scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-12 right-8 lg:right-16 w-px h-24 bg-linear-to-t from-secondary-400/40 to-transparent origin-bottom"
      />

      <motion.div
        style={shouldReduceMotion ? {} : { opacity: watermarkOpacity }}
        className="absolute bottom-[10%] left-0 w-full pointer-events-none select-none overflow-hidden will-change-[opacity]"
      >
        <span
          className="block font-heading font-black text-[18vw] lg:text-[14vw] leading-none whitespace-nowrap tracking-tighter"
          style={{
            WebkitTextStroke: "1px rgba(255,255,255,0.04)",
            WebkitTextFillColor: "transparent",
          }}
        >
          {watermark}.
        </span>
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? {} : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent",
          alignCenter ? "origin-center" : "origin-left",
        )}
      />

      <motion.div
        style={shouldReduceMotion ? {} : { y: contentY }}
        className="w-full relative z-10 will-change-transform"
      >
        <Container
          className={cn(
            alignCenter && "text-center flex flex-col items-center",
          )}
        >
          {breadcrumbs && breadcrumbs.length > 0 && (
            <motion.nav
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              aria-label="Breadcrumb"
              className="mb-10"
            >
              <ol
                className={cn(
                  "flex items-center gap-2 text-sm font-body",
                  alignCenter && "justify-center",
                )}
              >
                {breadcrumbs.map((crumb, i) => (
                  <li key={i} className="flex items-center gap-2">
                    {i > 0 && (
                      <ChevronRight className="w-3.5 h-3.5 text-white/25" />
                    )}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="text-white/40 hover:text-secondary-400 transition-colors duration-300"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-secondary-400 font-medium">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </motion.nav>
          )}

          {label && (
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-secondary-400 font-body">
                <span className="h-px w-8 bg-secondary-400/60" />
                {label}
                <span className="h-px w-8 bg-secondary-400/60" />
              </span>
            </motion.div>
          )}

          <Heading
            as="h1"
            size="h1"
            animated
            className={cn(
              "text-white! max-w-5xl leading-[1.08]! mb-8",
              alignCenter && "justify-center",
            )}
          >
            {title}
          </Heading>

          <motion.div
            initial={shouldReduceMotion ? {} : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "w-16 h-0.75 rounded-full bg-linear-to-r from-secondary-400 to-primary-400 mb-8",
              alignCenter ? "origin-center" : "origin-left",
            )}
          />

          {subtitle && (
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Text
                size="lg"
                className="max-w-2xl text-white/60! font-light leading-relaxed"
              >
                {subtitle}
              </Text>
            </motion.div>
          )}
        </Container>
      </motion.div>
    </section>
  );
}
