"use client";

import * as React from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUp, Check, Clock3 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useReducedMotion } from "@/utils/use-reduced-motion";
import { cn } from "@/utils/cn";
import { DummyContentRenderer } from "@/components/blog/dummy-content-renderer";
import { BLOG_DETAIL_CONTENT, type ContentSection } from "@/constants/blogs";
import { urlForImage } from "@/sanity/lib/image";

const EASE = [0.16, 1, 0.3, 1] as const;

interface BlogArticleSectionProps {
  title: string;
  author?: { name: string; imageUrl?: string };
  readTime?: number;
  content?: ContentSection[];
  portableContent?: unknown[];
  fallback?: React.ReactNode;
  labels?: typeof BLOG_DETAIL_CONTENT;
}

export function BlogArticleSection({
  title,
  author,
  readTime,
  content,
  portableContent,
  fallback,
  labels = BLOG_DETAIL_CONTENT,
}: BlogArticleSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const articleRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start 20%", "end 60%"],
  });
  const progressX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const minutes =
    readTime ?? Math.max(4, Math.floor(title.length / 10));

  return (
    <>
      <motion.div
        aria-hidden
        style={shouldReduceMotion ? undefined : { scaleX: progressX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-secondary-400 via-primary-400 to-primary-500 origin-left z-50 pointer-events-none"
      />

      <div className="relative bg-[#FBFAF6]">
        <div
          aria-hidden
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_15%_30%,rgba(6,176,248,0.045)_0%,transparent_60%)]" />
          <div
            className="absolute inset-0 opacity-50 mix-blend-multiply"
            style={{
              backgroundImage:
                "radial-gradient(rgba(6,48,75,0.06) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 85%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 85%)",
            }}
          />
        </div>

        <div
          ref={articleRef}
          className="relative pt-20 md:pt-28 pb-24 md:pb-32"
        >
          <Container>
            <div className="relative grid grid-cols-12 gap-8 lg:gap-12 xl:gap-16">
              <aside className="hidden lg:block lg:col-span-3 xl:col-span-3 self-start sticky top-32 h-fit">
                <ArticleAside
                  author={author}
                  title={title}
                  minutes={minutes}
                  labels={labels}
                />
              </aside>

              <div className="col-span-12 lg:col-span-9 xl:col-span-9 min-w-0">
                <MobileMeta
                  author={author}
                  minutes={minutes}
                  title={title}
                  labels={labels}
                />

                {Array.isArray(portableContent) && portableContent.length > 0 ? (
                  <PortableContentRenderer value={portableContent} />
                ) : content ? (
                  <DummyContentRenderer content={content} />
                ) : (
                  fallback
                )}

                <ArticleEndmark />
                <ArticleFooter labels={labels} />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

function PortableContentRenderer({ value }: { value: unknown[] }) {
  return (
    <div className="font-body text-neutral-700 text-base md:text-[1.05rem] leading-[1.8]">
      {value.map((block, index) => (
        <PortableBlock key={index} block={block} index={index} />
      ))}
    </div>
  );
}

function PortableBlock({ block, index }: { block: any; index: number }) {
  if (!block || typeof block !== "object") return null;

  if (block._type === "image") {
    const src = urlForImage(block)?.width(1200).url();
    if (!src) return null;

    return (
      <figure className="my-10 md:my-14 max-w-4xl">
        <div className="relative aspect-16/9 overflow-hidden rounded-3xl border border-primary-950/10 bg-primary-100">
          <Image
            src={src}
            alt={block.alt || ""}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover"
          />
        </div>
        {block.caption && (
          <figcaption className="mt-3 text-xs text-primary-700/55">
            {block.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (block._type !== "block") return null;

  const children = (
    <>
      {block.children?.map((child: any, childIndex: number) => (
        <PortableSpan
          key={child._key || childIndex}
          child={child}
          markDefs={block.markDefs || []}
        />
      ))}
    </>
  );

  if (block.listItem) {
    return (
      <ul className="my-6 md:my-8 space-y-3 max-w-3xl list-disc pl-6 marker:text-secondary-500">
        <li>{children}</li>
      </ul>
    );
  }

  if (block.style === "h2") {
    return (
      <h2 className="font-heading font-medium text-2xl md:text-3xl lg:text-[2.25rem] text-primary-950 leading-[1.15] tracking-tight max-w-3xl mt-12 mb-6">
        {children}
      </h2>
    );
  }

  if (block.style === "h3") {
    return (
      <h3 className="font-heading font-semibold text-xl md:text-2xl text-primary-950 leading-tight max-w-3xl mt-10 mb-5">
        {children}
      </h3>
    );
  }

  if (block.style === "blockquote") {
    return (
      <blockquote className="relative my-12 md:my-16 max-w-3xl pl-6 md:pl-10 border-l-2 border-secondary-400/70">
        <p className="font-heading font-medium text-xl md:text-2xl lg:text-[1.7rem] leading-[1.35] text-neutral-900 italic tracking-tight">
          {children}
        </p>
      </blockquote>
    );
  }

  return (
    <p className="mb-6 md:mb-7 max-w-3xl">
      {index === 0 ? <FirstPortableParagraph>{children}</FirstPortableParagraph> : children}
    </p>
  );
}

function FirstPortableParagraph({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function PortableSpan({ child, markDefs }: { child: any; markDefs: any[] }) {
  let node: React.ReactNode = child.text || "";

  for (const mark of child.marks || []) {
    const markDef = markDefs.find((def) => def._key === mark);

    if (mark === "strong") node = <strong className="font-semibold text-neutral-900">{node}</strong>;
    if (mark === "em") node = <em className="italic text-neutral-600 font-normal">{node}</em>;
    if (markDef?._type === "link" && markDef.href) {
      node = (
        <Link
          href={markDef.href}
          className="font-medium text-neutral-900 underline decoration-secondary-300 underline-offset-4 hover:text-primary-700"
        >
          {node}
        </Link>
      );
    }
  }

  return <>{node}</>;
}

function ArticleAside({
  author,
  title,
  minutes,
  labels,
}: {
  author?: { name: string; imageUrl?: string };
  title: string;
  minutes: number;
  labels: typeof BLOG_DETAIL_CONTENT;
}) {
  return (
    <div className="flex flex-col gap-9 pb-4">
      <div>
        <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-primary-700/50 mb-3">
          {labels.authoredByLabel}
        </span>
        <div className="flex items-center gap-3">
          {author?.imageUrl ? (
            <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
              <Image
                src={author.imageUrl}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-11 h-11 rounded-full bg-primary-950 text-white flex items-center justify-center font-heading font-bold shadow-md">
              {(author?.name || labels.fallbackAuthor).charAt(0)}
            </div>
          )}
          <span className="text-sm font-medium text-primary-950 leading-tight">
            {author?.name || labels.fallbackAuthor}
          </span>
        </div>
      </div>

      <div>
        <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-primary-700/50 mb-2">
          {labels.readTimeLabel}
        </span>
        <div className="flex items-baseline gap-1.5 text-primary-950">
          <Clock3 className="w-4 h-4 text-primary-500 self-center" />
          <span className="font-heading font-medium text-2xl tabular-nums leading-none">
            {minutes}
          </span>
          <span className="text-xs text-primary-700/55">
            {labels.readTimeShortSuffix.toLowerCase()}
          </span>
        </div>
      </div>

      <div>
        <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-primary-700/50 mb-3">
          {labels.shareLabel}
        </span>
        <ShareGroup title={title} labels={labels} />
      </div>

      <div className="pt-7 border-t border-primary-950/10">
        <BackToTopButton labels={labels} />
      </div>
    </div>
  );
}

function MobileMeta({
  author,
  minutes,
  title,
  labels,
}: {
  author?: { name: string; imageUrl?: string };
  minutes: number;
  title: string;
  labels: typeof BLOG_DETAIL_CONTENT;
}) {
  return (
    <div className="lg:hidden mb-10 pb-8 border-b border-primary-950/10 flex flex-wrap items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        {author?.imageUrl ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
            <Image
              src={author.imageUrl}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary-950 text-white flex items-center justify-center text-sm font-heading font-bold shadow-md">
            {(author?.name || labels.fallbackAuthor).charAt(0)}
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary-700/55">
            {labels.authoredByLabel}
          </span>
          <span className="text-sm font-medium text-primary-950 mt-0.5">
            {author?.name || labels.fallbackAuthor}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-primary-700/65">
          <Clock3 className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
            {minutes} {labels.readTimeShortSuffix}
          </span>
        </div>
        <div className="hidden sm:block">
          <ShareGroup title={title} compact labels={labels} />
        </div>
      </div>
    </div>
  );
}

function ShareGroup({
  title,
  compact = false,
  labels,
}: {
  title: string;
  compact?: boolean;
  labels: typeof BLOG_DETAIL_CONTENT;
}) {
  const [copied, setCopied] = React.useState(false);
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const handleCopy = async () => {
    if (typeof navigator === "undefined") return;
    const target = url || window.location.href;
    try {
      await navigator.clipboard.writeText(target);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // graceful fail
    }
  };

  const tw = url
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    : "#";
  const li = url
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    : "#";
  const fb = url
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    : "#";

  const size = compact ? "w-9 h-9 text-[11px]" : "w-10 h-10 text-xs";

  return (
    <div className={cn("flex items-center", compact ? "gap-1.5" : "gap-2")}>
      <ShareTile
        href={tw}
        label="X"
        ariaLabel={`Share ${title} on X`}
        size={size}
      />
      <ShareTile
        href={li}
        label="in"
        ariaLabel={`Share ${title} on LinkedIn`}
        size={size}
      />
      <ShareTile
        href={fb}
        label="f"
        ariaLabel={`Share ${title} on Facebook`}
        size={size}
      />
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? labels.copiedAriaLabel : labels.copyAriaLabel}
        className={cn(
          "group/copy relative inline-flex items-center justify-center rounded-full border border-primary-950/15 bg-white text-primary-950 font-heading font-bold transition-[background-color,color,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-primary-950 hover:text-white hover:border-primary-950 hover:shadow-[0_12px_28px_-10px_rgba(6,48,75,0.35)] hover:-translate-y-0.5 outline-none focus-visible:bg-primary-950 focus-visible:text-white",
          size,
        )}
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-secondary-400" />
        ) : (
          <span className="leading-none tracking-tight">↗</span>
        )}
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-[0.25em] text-primary-700/65 opacity-0 group-hover/copy:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          {copied ? labels.copiedLabel : labels.copyLabel}
        </span>
      </button>
    </div>
  );
}

function ShareTile({
  href,
  label,
  ariaLabel,
  size,
}: {
  href: string;
  label: string;
  ariaLabel: string;
  size: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={ariaLabel}
      className={cn(
        "group/tile relative inline-flex items-center justify-center rounded-full border border-primary-950/15 bg-white text-primary-950 font-heading font-bold transition-[background-color,color,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-primary-950 hover:text-white hover:border-primary-950 hover:shadow-[0_12px_28px_-10px_rgba(6,48,75,0.35)] hover:-translate-y-0.5 outline-none focus-visible:bg-primary-950 focus-visible:text-white",
        size,
      )}
    >
      <span className="leading-none tracking-tight">{label}</span>
    </a>
  );
}

function BackToTopButton({ labels }: { labels: typeof BLOG_DETAIL_CONTENT }) {
  const handleClick = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group/top inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary-700/65 hover:text-primary-950 transition-colors duration-300 outline-none focus-visible:text-primary-950"
    >
      <span className="relative inline-flex w-8 h-8 items-center justify-center rounded-full border border-primary-950/15 bg-white transition-[background-color,border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/top:bg-primary-950 group-hover/top:border-primary-950 group-hover/top:shadow-[0_10px_24px_-8px_rgba(6,48,75,0.35)] group-hover/top:-translate-y-0.5 group-focus-visible/top:bg-primary-950 group-focus-visible/top:border-primary-950">
        <ArrowUp className="w-3.5 h-3.5 transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/top:text-white group-hover/top:-translate-y-0.5 group-focus-visible/top:text-white" />
      </span>
      <span className="relative">
        {labels.backToTopLabel}
        <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary-950 origin-left scale-x-0 group-hover/top:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      </span>
    </button>
  );
}

function ArticleEndmark() {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
      className="mt-14 md:mt-20 flex items-center gap-4"
    >
      <span className="h-px w-10 bg-primary-950/15" />
      <span className="font-heading font-black text-secondary-500 text-2xl leading-none">
        ◆
      </span>
      <span className="h-px flex-1 bg-primary-950/10" />
    </motion.div>
  );
}

function ArticleFooter({ labels }: { labels: typeof BLOG_DETAIL_CONTENT }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.footer
      ref={ref}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      className="mt-12 md:mt-16 pt-10 border-t border-primary-950/10 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
    >
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary-600 block mb-2">
          {labels.endLabel}
        </span>
        <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-md">
          {labels.endDescription}
        </p>
      </div>

      <Link
        href="/blogs"
        className="group/back inline-flex items-center gap-3 self-start md:self-auto outline-none"
      >
        <span className="relative inline-flex w-12 h-12 items-center justify-center rounded-full border border-primary-950/15 bg-white text-primary-950 transition-[background-color,color,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/back:bg-primary-950 group-hover/back:text-white group-hover/back:border-primary-950 group-hover/back:shadow-[0_18px_40px_-12px_rgba(6,48,75,0.45)] group-hover/back:-translate-x-0.5 group-focus-visible/back:bg-primary-950 group-focus-visible/back:text-white">
          <ArrowLeft className="w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/back:-translate-x-0.5" />
        </span>
        <span className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary-700/55">
            {labels.returnToLabel}
          </span>
          <span className="text-sm font-medium text-primary-950 mt-0.5 relative">
            {labels.archiveLabel}
            <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary-950 origin-left scale-x-0 group-hover/back:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </span>
        </span>
      </Link>
    </motion.footer>
  );
}
