"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  ContentSection,
  ContentBlock,
  ContentSegment,
} from "@/constants/blogs";
import { useReducedMotion } from "@/utils/use-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function DummyContentRenderer({
  content,
}: {
  content: ContentSection[];
}) {
  return (
    <div className="font-body text-neutral-700 text-base md:text-[1.05rem] leading-[1.8]">
      {content.map((section, sectionIdx) => (
        <Section
          key={sectionIdx}
          section={section}
          sectionIndex={sectionIdx}
        />
      ))}
    </div>
  );
}

function Section({
  section,
  sectionIndex,
}: {
  section: ContentSection;
  sectionIndex: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.section
      ref={ref}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      className="mb-14 md:mb-20"
    >
      {section.heading && (
        <SectionHeading
          heading={section.heading}
          index={sectionIndex}
          isInView={isInView}
        />
      )}
      {section.blocks.map((block, i) => (
        <Block
          key={i}
          block={block}
          isFirstParagraph={
            sectionIndex === 0 && i === 0 && !section.heading
          }
        />
      ))}
    </motion.section>
  );
}

function SectionHeading({
  heading,
  index,
  isInView,
}: {
  heading: string;
  index: number;
  isInView: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="mb-7 md:mb-10 mt-12 md:mt-16 first:mt-0">
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, x: -8 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex items-center gap-3 mb-4"
      >
        <span className="font-heading font-black text-secondary-500 text-sm tabular-nums tracking-tight">
          §{pad(index + 1)}
        </span>
        <span className="h-px w-10 bg-primary-500/40" />
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary-700/55">
          Chapter {pad(index + 1)}
        </span>
      </motion.div>
      <motion.h2
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className="font-heading font-medium text-2xl md:text-3xl lg:text-[2.25rem] text-primary-950 leading-[1.15] tracking-tight max-w-3xl"
      >
        {heading}
      </motion.h2>
    </div>
  );
}

function Block({
  block,
  isFirstParagraph,
}: {
  block: ContentBlock;
  isFirstParagraph: boolean;
}) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="mb-6 md:mb-7 max-w-3xl">
          {isFirstParagraph ? (
            <FirstParagraph segments={block.segments} />
          ) : (
            block.segments.map((s, i) => <Segment key={i} segment={s} />)
          )}
        </p>
      );
    case "blockquote":
      return <PullQuote text={block.text} author={block.author} />;
    case "list":
      return <RefinedList items={block.items} />;
    default:
      return null;
  }
}

function FirstParagraph({ segments }: { segments: ContentSegment[] }) {
  const [first, ...rest] = segments;
  if (first?.type === "text" && first.text.length > 0) {
    const firstChar = first.text.charAt(0);
    const restOfFirst = first.text.slice(1);
    return (
      <>
        <span
          aria-hidden
          className="float-left font-heading font-bold text-[4.5rem] md:text-[5.5rem] leading-[0.78] mr-3 mt-2 text-primary-950 select-none"
          style={{
            background:
              "linear-gradient(135deg, #06304b 0%, #06b0f8 60%, #2cc7e4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {firstChar}
        </span>
        <span>{restOfFirst}</span>
        {rest.map((s, i) => (
          <Segment key={i} segment={s} />
        ))}
      </>
    );
  }
  return (
    <>
      {segments.map((s, i) => (
        <Segment key={i} segment={s} />
      ))}
    </>
  );
}

function Segment({ segment }: { segment: ContentSegment }) {
  switch (segment.type) {
    case "text":
      return <>{segment.text}</>;
    case "bold":
      return (
        <strong className="font-semibold text-neutral-900">
          {segment.text}
        </strong>
      );
    case "italic":
      return (
        <em className="italic text-neutral-600 font-normal">
          {segment.text}
        </em>
      );
    case "link":
      return <InlineLink href={segment.href}>{segment.text}</InlineLink>;
    default:
      return null;
  }
}

function InlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group/link relative inline-flex items-baseline gap-0.5 font-medium text-neutral-900 hover:text-primary-700 transition-colors duration-300 outline-none"
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-primary-700 origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        />
        <span
          aria-hidden
          className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-secondary-300/70 group-hover/link:opacity-0 transition-opacity duration-300"
        />
      </span>
      <ArrowUpRight
        aria-hidden
        className="w-3 h-3 self-center -mb-0.5 opacity-60 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:opacity-100 group-hover/link:rotate-45"
      />
    </Link>
  );
}

function PullQuote({ text, author }: { text: string; author?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLQuoteElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.blockquote
      ref={ref}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative my-12 md:my-16 max-w-3xl"
    >
      <span
        aria-hidden
        className="absolute -top-6 md:-top-10 -left-2 md:-left-4 font-heading font-black text-[6rem] md:text-[8rem] leading-none tracking-tighter text-secondary-300/40 select-none pointer-events-none"
      >
        &ldquo;
      </span>

      <div className="relative pl-6 md:pl-10 border-l-2 border-secondary-400/70">
        <p className="font-heading font-medium text-xl md:text-2xl lg:text-[1.7rem] leading-[1.35] text-neutral-900 italic tracking-tight">
          {text}
        </p>
        {author && (
          <footer className="mt-5 flex items-center gap-3">
            <span className="h-px w-8 bg-primary-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary-500">
              {author}
            </span>
          </footer>
        )}
      </div>

      <span
        aria-hidden
        className="absolute -bottom-3 right-2 md:right-6 font-heading font-black text-4xl md:text-6xl leading-none tracking-tighter text-secondary-300/30 select-none pointer-events-none rotate-180"
      >
        &ldquo;
      </span>
    </motion.blockquote>
  );
}

function RefinedList({ items }: { items: string[] }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLUListElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <ul ref={ref} className="my-8 md:my-10 space-y-4 md:space-y-5 max-w-3xl">
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.05 + i * 0.08,
            ease: EASE,
          }}
          className="group/item relative pl-9 md:pl-12"
        >
          <span
            aria-hidden
            className="absolute left-0 top-[0.55em] flex items-center gap-2"
          >
            <span className="font-heading font-bold text-[10px] tabular-nums text-secondary-600 leading-none">
              {pad(i + 1)}
            </span>
            <span className="h-px w-3 md:w-5 bg-primary-500/50 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:scale-x-150 group-hover/item:bg-primary-500" />
          </span>
          <span className="text-neutral-700 leading-relaxed">{item}</span>
        </motion.li>
      ))}
    </ul>
  );
}
