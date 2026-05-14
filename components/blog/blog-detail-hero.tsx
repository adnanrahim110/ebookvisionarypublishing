"use client";

import { Container } from "@/components/ui/container";
import { BLOG_DETAIL_CONTENT } from "@/constants/blogs";
import { useReducedMotion } from "@/utils/use-reduced-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const EASE = [0.16, 1, 0.3, 1] as const;
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatLong(input: string) {
  const d = new Date(input);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function extractWatermark(title: string) {
  const words = title
    .replace(/[^a-zA-Z\s]/g, "")
    .trim()
    .split(/\s+/);
  const word = words.find((w) => w.length >= 5) || words[0] || "EVP";
  return word.toUpperCase();
}

interface BlogDetailHeroProps {
  title: string;
  publishedAt: string;
  categories?: string[];
  author?: {
    name: string;
    imageUrl?: string;
  };
  mainImage?: {
    asset?: {
      url: string;
    };
  };
  readTime?: number;
  issueNumber?: number;
  content?: typeof BLOG_DETAIL_CONTENT;
}

export function BlogDetailHero({
  title,
  publishedAt,
  categories,
  author,
  mainImage,
  readTime,
  issueNumber = 1,
  content = BLOG_DETAIL_CONTENT,
}: BlogDetailHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const watermark = extractWatermark(title);
  const minutes = readTime ?? Math.max(4, Math.floor(title.length / 10));
  const issuePad = String(issueNumber).padStart(2, "0");

  const hasImage = !!mainImage?.asset?.url;

  return (
    <section
      ref={ref}
      className="relative bg-primary-950 pt-36 md:pt-48 pb-24 md:pb-36 overflow-hidden isolate"
    >
      {hasImage ? (
        <motion.div
          aria-hidden
          style={shouldReduceMotion ? undefined : { scale: imageScale }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={mainImage!.asset!.url}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary-950/55" />
          <div className="absolute inset-0 bg-linear-to-b from-black/80 to-black/45" />
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,#084c72_0%,#06304b_40%,#021a2b_75%,#020e16_100%)]" />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[5rem_5rem] mask-[radial-gradient(ellipse_70%_50%_at_50%_50%,black_10%,transparent_80%)]" />
      <div className="absolute -top-1/5 left-[8%] w-[45vw] h-[45vw] rounded-full bg-[radial-gradient(circle,rgba(6,176,248,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-30%] right-[3%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(44,199,228,0.06)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        style={shouldReduceMotion ? undefined : { opacity: watermarkOpacity }}
        className="absolute bottom-[6%] left-0 w-full pointer-events-none select-none overflow-hidden will-change-[opacity]"
      >
        <span
          className="block font-heading font-black text-[20vw] lg:text-[15vw] leading-none whitespace-nowrap tracking-tighter"
          style={{
            WebkitTextStroke: hasImage
              ? "1px rgba(255,255,255,0.06)"
              : "1px rgba(255,255,255,0.045)",
            WebkitTextFillColor: "transparent",
          }}
        >
          {watermark}.
        </span>
      </motion.div>

      <motion.div
        style={shouldReduceMotion ? undefined : { y: contentY }}
        className="relative z-10 will-change-transform"
      >
        <Container>
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-12 md:mb-14"
          >
            <Link
              href="/blogs"
              className="group/back inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/55 hover:text-secondary-300 focus-visible:text-secondary-300 transition-colors duration-300 outline-none"
            >
              <span className="relative inline-flex w-9 h-9 items-center justify-center rounded-full border border-white/15 bg-white/3 backdrop-blur-sm overflow-hidden transition-[background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/back:border-secondary-300/40 group-hover/back:bg-secondary-400/10 group-hover/back:-translate-x-0.5 group-focus-visible/back:border-secondary-300/40">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/back:-translate-x-0.5" />
                <span className="absolute inset-0 rounded-full bg-secondary-400/15 scale-0 group-hover/back:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10" />
              </span>
              <span className="relative">
                {content.backToArchiveLabel}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-secondary-300 origin-left scale-x-0 group-hover/back:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-8 md:mb-12"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 border border-white/15 backdrop-blur-md">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-secondary-400 opacity-70 animate-ping" />
                <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-secondary-400" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-secondary-300">
                {categories?.[0] || content.fallbackCategory}
              </span>
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
              {content.issueLabel} No. {issuePad}
            </span>

            <span className="w-px h-4 bg-white/15" />

            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
              {formatLong(publishedAt)}
            </span>

            <span className="w-px h-4 bg-white/15" />

            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
              <Clock3 className="w-3 h-3" />
              {minutes} {content.readTimeSuffix}
            </span>
          </motion.div>

          <motion.h1
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.2, ease: EASE }}
            className="font-heading font-medium text-4xl md:text-6xl lg:text-[5rem] xl:text-[5.5rem] leading-[1.02] tracking-tight text-white max-w-5xl"
          >
            {title}
          </motion.h1>

          <motion.div
            initial={shouldReduceMotion ? {} : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className="w-20 h-0.75 rounded-full bg-linear-to-r from-secondary-400 to-primary-400 origin-left mt-10 md:mt-14"
          />

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
            className="mt-10 md:mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              {author?.imageUrl ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/15 shadow-md">
                  <Image
                    src={author.imageUrl}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-white/6 border border-white/15 text-white flex items-center justify-center font-heading font-bold backdrop-blur-md">
                  {(author?.name || "EVP").charAt(0)}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/45">
                  {content.authoredByLabel}
                </span>
                <span className="text-base font-medium text-white mt-1">
                  {author?.name || content.fallbackAuthor}
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-white/40">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                {content.scrollLabel}
              </span>
              <ScrollIndicator />
            </div>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}

function ScrollIndicator() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <span className="relative w-7 h-10 rounded-full border border-white/20 overflow-hidden">
      <motion.span
        initial={{ y: 0, opacity: 1 }}
        animate={shouldReduceMotion ? {} : { y: 14, opacity: 0 }}
        transition={{
          duration: 1.6,
          repeat: shouldReduceMotion ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1 h-1.5 bg-secondary-400 rounded-full"
      />
    </span>
  );
}
