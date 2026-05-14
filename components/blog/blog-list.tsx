"use client";

import { Container } from "@/components/ui/container";
import { BLOG_ARCHIVE_CONTENT } from "@/constants/blogs";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/utils/use-reduced-motion";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface Post {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  categories?: string[];
  mainImage?: {
    asset?: {
      url: string;
    };
  };
  author?: {
    name: string;
    imageUrl?: string;
  };
}

type BlogArchiveContent = typeof BLOG_ARCHIVE_CONTENT;

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

const EASE = [0.16, 1, 0.3, 1] as const;

function formatDate(input: string) {
  const d = new Date(input);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function readingTime(seed: string) {
  const min = 4 + (seed.length % 6);
  return `${min} min read`;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

type Layout = "spread" | "cover" | "broadside";
const LAYOUT_CYCLE: Layout[] = ["spread", "cover", "broadside"];

export function BlogList({
  posts,
  content = BLOG_ARCHIVE_CONTENT,
}: {
  posts: Post[];
  content?: BlogArchiveContent;
}) {
  if (!posts || posts.length === 0) {
    return (
      <section className="relative bg-[#FBFAF6] py-32 min-h-[60vh] flex items-center justify-center">
        <Container className="text-center max-w-xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-secondary-600 mb-5 block">
            {content.emptyLabel}
          </span>
          <h3 className="text-3xl md:text-4xl font-heading font-medium text-primary-950 leading-tight">
            {content.emptyHeading}
          </h3>
          <p className="mt-4 text-primary-700/70 leading-relaxed">
            {content.emptyDescription}
          </p>
        </Container>
      </section>
    );
  }

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <section className="relative bg-[#FBFAF6] pt-16 md:pt-24 pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_0%,rgba(6,176,248,0.05)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_100%,rgba(44,199,228,0.05)_0%,transparent_60%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-50 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(6,48,75,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 85%)",
        }}
      />

      <Container className="relative">
        <ArchiveHeader
          total={posts.length}
          latestDate={featured.publishedAt}
          content={content}
        />
        <FeaturedSpread post={featured} content={content} />
        {rest.length > 0 && <IndexGrid posts={rest} content={content} />}
        <ArchiveFooter content={content} />
      </Container>
    </section>
  );
}

function ArchiveHeader({
  total,
  latestDate,
  content,
}: {
  total: number;
  latestDate: string;
  content: BlogArchiveContent;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
      className="mb-14 md:mb-20"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-6">
        <div>
          <span className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-secondary-600 mb-5 font-body">
            <span className="h-px w-8 bg-secondary-400/60" />
            {content.eyebrow}
          </span>
          <h2 className="font-heading font-medium text-3xl md:text-4xl lg:text-5xl tracking-tight text-primary-950 leading-[1.05]">
            {content.headingPrefix}{" "}
            <span className="relative inline-block">
              <span className="relative z-10 italic font-light text-primary-600">
                {content.headingEmphasis}
              </span>
              <span className="absolute bottom-1 left-0 right-0 h-2 bg-secondary-200/60 z-0" />
            </span>
            .
          </h2>
        </div>

        <div className="flex items-center gap-5 md:gap-6 shrink-0">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-primary-700/50">
              {content.totalLabel}
            </span>
            <span className="font-heading font-black text-3xl md:text-4xl text-primary-950 tabular-nums leading-none mt-1">
              {pad(total)}
            </span>
          </div>
          <div className="w-px h-12 bg-primary-950/15" />
          <div className="flex flex-col">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-primary-700/50">
              {content.latestLabel}
            </span>
            <span className="text-sm md:text-base font-medium text-primary-950 mt-1">
              {formatDate(latestDate)}
            </span>
          </div>
        </div>
      </div>

      <div className="relative h-px w-full bg-primary-950/10 overflow-hidden">
        <motion.span
          initial={shouldReduceMotion ? {} : { scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
          className="absolute inset-0 origin-left bg-linear-to-r from-primary-500 via-secondary-400 to-transparent"
        />
      </div>
    </motion.div>
  );
}

function MagneticCTA({
  children,
  className,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      style={shouldReduceMotion ? undefined : { x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.span>
  );
}

function ImageCanvas({
  src,
  alt,
  className,
  imgClassName,
  sizes,
  priority,
  parallaxY,
  children,
}: {
  src?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  parallaxY?: ReturnType<typeof useTransform<number, string>>;
  children?: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px * 12);
    my.set(py * 12);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "group/canvas relative overflow-hidden bg-primary-100",
        className,
      )}
    >
      <motion.div
        className="absolute inset-[-6%]"
        style={
          parallaxY
            ? { x: sx, y: parallaxY }
            : shouldReduceMotion
              ? undefined
              : { x: sx, y: sy }
        }
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn(
              "object-cover transition-all duration-500",
              "group-hover/canvas:scale-[1.06] group-hover/canvas:brightness-[1.04]",
              imgClassName,
            )}
          />
        ) : (
          <div className="w-full h-full bg-primary-100" />
        )}
      </motion.div>
      {children}
    </div>
  );
}

function HoverHeadline({
  children,
  className,
  variant = "light",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
}) {
  const gradient =
    variant === "dark"
      ? "from-secondary-300 to-primary-300"
      : "from-secondary-400 to-primary-500";

  return (
    <span
      className={cn(
        "inline bg-no-repeat bg-bottom bg-size-[0%_2px] hover:bg-size-[100%_2px]",
        "transition-[background-size,color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "bg-linear-to-r",
        gradient,
        className,
      )}
    >
      {children}
    </span>
  );
}

function FeaturedSpread({
  post,
  content,
}: {
  post: Post;
  content: BlogArchiveContent;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);

  return (
    <motion.article
      ref={ref}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative mb-24 md:mb-36 group/featured"
    >
      <div className="absolute -top-5 left-0 hidden md:flex items-center gap-3 z-20">
        <span className="w-2 h-2 rounded-full bg-secondary-500 shadow-[0_0_0_4px_rgba(44,199,228,0.18)]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary-950">
          {content.spotlightLabel} · Vol. 01
        </span>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-10 lg:gap-14 items-stretch">
        <Link
          href={`/blogs/${post.slug}`}
          aria-label={post.title}
          className="col-span-12 md:col-span-7 relative group/image rounded-[28px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#FBFAF6]"
        >
          <ImageCanvas
            src={post.mainImage?.asset?.url}
            alt={post.title}
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
            parallaxY={shouldReduceMotion ? undefined : imageY}
            className="aspect-4/3 sm:aspect-5/4 md:aspect-4/5 lg:aspect-5/4 w-full rounded-[28px] shadow-[0_30px_80px_-30px_rgba(6,48,75,0.25)]"
          >
            <div className="absolute inset-0 bg-linear-to-tr from-primary-950/35 via-primary-950/5 to-transparent pointer-events-none" />
            <div className="absolute inset-0 rounded-[28px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] pointer-events-none" />

            <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/image:-translate-y-0.5">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-secondary-400 opacity-70 animate-ping" />
                <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-secondary-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary-950">
                {content.latestBadge}
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/image:-translate-y-0.5">
              <div className="px-3 py-1.5 rounded-md bg-white/15 backdrop-blur-md border border-white/25">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">
                  {post.categories?.[0] || content.fallbackCategory}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-white/90">
                <Clock3 className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  {readingTime(post.title)}
                </span>
              </div>
            </div>
          </ImageCanvas>
        </Link>

        <div className="col-span-12 md:col-span-5 flex flex-col justify-center relative py-2 md:py-6">
          <span
            aria-hidden
            className="absolute -top-10 right-[-5%] md:right-0 font-heading font-black text-[8rem] md:text-[11rem] lg:text-[14rem] leading-none text-primary-950/4 tracking-tighter pointer-events-none select-none"
          >
            01
          </span>

          <div className="relative">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-secondary-600">
                {content.issueLabel} No. 01
              </span>
              <span className="w-8 h-px bg-primary-950/20" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary-700/70">
                {formatDate(post.publishedAt)}
              </span>
            </motion.div>

            <motion.h3
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
              className="font-heading font-medium text-3xl md:text-[2.5rem] lg:text-[3rem] xl:text-[3.4rem] leading-[1.04] tracking-tight text-primary-950 mb-6 md:mb-8"
            >
              <Link
                href={`/blogs/${post.slug}`}
                className="inline focus-visible:outline-none focus-visible:text-primary-700"
              >
                <HoverHeadline>{post.title}</HoverHeadline>
              </Link>
            </motion.h3>

            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
              className="text-primary-700/75 leading-relaxed text-base md:text-lg max-w-md mb-10 font-light"
            >
              {content.featuredDescription}
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
              className="flex items-center justify-between border-t border-primary-950/10 pt-6"
            >
              <div className="flex items-center gap-3">
                {post.author?.imageUrl ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-md">
                    <Image
                      src={post.author.imageUrl}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary-950 text-white flex items-center justify-center text-sm font-heading font-bold shadow-md">
                    {(post.author?.name || "EVP").charAt(0)}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-primary-700/55">
                    {content.authoredByLabel}
                  </span>
                  <span className="text-sm font-medium text-primary-950">
                    {post.author?.name || content.fallbackAuthor}
                  </span>
                </div>
              </div>

              <Link
                href={`/blogs/${post.slug}`}
                aria-label={`Read ${post.title}`}
                className="group/cta inline-flex items-center gap-3 focus-visible:outline-none rounded-full"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-950 hidden sm:inline relative">
                  {content.readLabel}
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary-950 origin-left scale-x-0 group-hover/cta:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </span>
                <MagneticCTA strength={0.4}>
                  <span className="w-12 h-12 rounded-full border border-primary-950/15 bg-white flex items-center justify-center text-primary-950 transition-[background-color,color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:bg-primary-950 group-hover/cta:text-white group-hover/cta:shadow-[0_18px_40px_-12px_rgba(6,48,75,0.45)] group-focus-visible/cta:bg-primary-950 group-focus-visible/cta:text-white">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:rotate-45 group-focus-visible/cta:rotate-45" />
                  </span>
                </MagneticCTA>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function IndexGrid({
  posts,
  content,
}: {
  posts: Post[];
  content: BlogArchiveContent;
}) {
  const shouldReduceMotion = useReducedMotion();
  const headerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <div>
      <motion.div
        ref={headerRef}
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex items-center gap-4 mb-10 md:mb-14"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary-700/65">
          {content.readingListLabel}
        </span>
        <span className="flex-1 h-px bg-primary-950/10" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary-700/65 tabular-nums">
          {pad(posts.length)}{" "}
          {posts.length === 1 ? content.storySingular : content.storyPlural}
        </span>
      </motion.div>

      <div className="grid grid-cols-12 gap-6 md:gap-7 lg:gap-8 auto-rows-fr">
        {posts.map((post, i) => {
          const layout = LAYOUT_CYCLE[i % LAYOUT_CYCLE.length];
          return (
            <IndexCard
              key={post._id}
              post={post}
              index={i + 2}
              layout={layout}
              content={content}
            />
          );
        })}
      </div>
    </div>
  );
}

function IndexCard({
  post,
  index,
  layout,
  content,
}: {
  post: Post;
  index: number;
  layout: Layout;
  content: BlogArchiveContent;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const colSpan =
    layout === "spread"
      ? "col-span-12 md:col-span-8"
      : layout === "cover"
        ? "col-span-12 md:col-span-4"
        : "col-span-12";

  return (
    <motion.article
      ref={ref}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.75,
        delay: 0.05 + (index % 3) * 0.05,
        ease: EASE,
      }}
      className={colSpan}
    >
      {layout === "spread" && (
        <SpreadCard
          post={post}
          index={index}
          isInView={isInView}
          content={content}
        />
      )}
      {layout === "cover" && (
        <CoverCard
          post={post}
          index={index}
          isInView={isInView}
          content={content}
        />
      )}
      {layout === "broadside" && (
        <BroadsideCard
          post={post}
          index={index}
          isInView={isInView}
          content={content}
        />
      )}
    </motion.article>
  );
}

function CardShell({
  href,
  ariaLabel,
  className,
  children,
}: {
  href: string;
  ariaLabel: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "group/card relative h-full block transition-[transform,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#FBFAF6]",
        className,
      )}
    >
      {children}
    </Link>
  );
}

function StaggerChildren({
  children,
  isInView,
  delay = 0,
}: {
  children: React.ReactNode;
  isInView: boolean;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <>
      {React.Children.map(children, (child, i) => (
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.07,
            ease: EASE,
          }}
        >
          {child}
        </motion.div>
      ))}
    </>
  );
}

function SpreadCard({
  post,
  index,
  isInView,
  content,
}: {
  post: Post;
  index: number;
  isInView: boolean;
  content: BlogArchiveContent;
}) {
  return (
    <CardShell
      href={`/blogs/${post.slug}`}
      ariaLabel={post.title}
      className="rounded-3xl overflow-hidden bg-white border border-primary-100/80 hover:shadow-[0_30px_70px_-30px_rgba(6,48,75,0.18)] hover:border-primary-200"
    >
      <div className="flex flex-col sm:flex-row h-full">
        <div className="relative w-full sm:w-1/2 aspect-4/3 sm:aspect-auto">
          <ImageCanvas
            src={post.mainImage?.asset?.url}
            alt={post.title}
            sizes="(max-width: 768px) 100vw, 35vw"
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-linear-to-tr from-primary-950/15 via-transparent to-transparent" />
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/canvas:-translate-y-0.5">
              <Clock3 className="w-3 h-3 text-primary-700" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary-950">
                {readingTime(post.title)}
              </span>
            </div>
          </ImageCanvas>
        </div>

        <div className="flex-1 p-7 md:p-8 lg:p-10 flex flex-col justify-between gap-6 relative">
          <span
            aria-hidden
            className="absolute top-4 right-6 font-heading font-black text-6xl md:text-7xl leading-none text-primary-950/4.5 tracking-tighter select-none pointer-events-none transition-[color,transform] duration-700 group-hover/card:text-primary-500/[0.07] group-hover/card:-translate-y-1"
          >
            {pad(index)}
          </span>

          <div className="relative">
            <StaggerChildren isInView={isInView}>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-secondary-600">
                  {content.issueLabel} {pad(index)}
                </span>
                <span className="w-1 h-1 rounded-full bg-primary-950/25" />
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-primary-700/65">
                  {post.categories?.[0] || content.fallbackCategory}
                </span>
              </div>

              <h4 className="font-heading font-medium text-xl md:text-2xl lg:text-[1.7rem] leading-[1.2] tracking-tight text-primary-950">
                <span className="hover:text-primary-700 transition-colors duration-500">
                  <HoverHeadline>{post.title}</HoverHeadline>
                </span>
              </h4>
            </StaggerChildren>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary-700/60">
              {formatDate(post.publishedAt)}
            </span>
            <span className="group/cta inline-flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-950 opacity-0 -translate-x-1 group-hover/cta:opacity-100 group-hover/cta:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                {content.readLabel}
              </span>
              <MagneticCTA>
                <span className="w-9 h-9 rounded-full border border-primary-950/15 flex items-center justify-center text-primary-950 transition-[background-color,color,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:bg-primary-950 group-hover/cta:text-white group-hover/cta:border-primary-950 group-hover/cta:shadow-[0_12px_30px_-10px_rgba(6,48,75,0.45)]">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:rotate-45" />
                </span>
              </MagneticCTA>
            </span>
          </div>
        </div>
      </div>

      <span className="absolute left-0 bottom-0 h-0.75 w-full bg-linear-to-r from-secondary-400 to-primary-500 origin-left scale-x-0 group-hover/card:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
    </CardShell>
  );
}

function CoverCard({
  post,
  index,
  isInView,
  content,
}: {
  post: Post;
  index: number;
  isInView: boolean;
  content: BlogArchiveContent;
}) {
  return (
    <CardShell
      href={`/blogs/${post.slug}`}
      ariaLabel={post.title}
      className="rounded-3xl overflow-hidden bg-white border border-primary-100/80 hover:shadow-[0_30px_70px_-30px_rgba(6,48,75,0.18)] hover:border-primary-200 flex flex-col"
    >
      <div className="relative w-full aspect-4/3">
        <ImageCanvas
          src={post.mainImage?.asset?.url}
          alt={post.title}
          sizes="(max-width: 768px) 100vw, 25vw"
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-linear-to-t from-primary-950/45 via-primary-950/5 to-transparent" />

          <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/canvas:-translate-y-0.5">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-sm">
              <span className="font-heading font-bold text-[10px] text-primary-950 tabular-nums">
                № {pad(index)}
              </span>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-primary-950/85 backdrop-blur-sm">
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white">
                {post.categories?.[0] || content.fallbackCategory}
              </span>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-white">
              <Clock3 className="w-3 h-3" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
                {readingTime(post.title)}
              </span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">
              {formatDate(post.publishedAt)}
            </span>
          </div>
        </ImageCanvas>
      </div>

      <div className="flex-1 p-6 md:p-7 pb-4! flex flex-col justify-between gap-5">
        <StaggerChildren isInView={isInView}>
          <h4 className="font-heading font-medium text-lg md:text-xl leading-tight tracking-tight text-primary-950">
            <span className="hover:text-primary-700 transition-colors duration-500">
              <HoverHeadline>{post.title}</HoverHeadline>
            </span>
          </h4>
        </StaggerChildren>

        <div className="flex items-center justify-between border-t border-primary-950/8 pt-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary-700/55">
            {content.issueLabel} {pad(index)}
          </span>
          <span className="group/cta inline-flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-950 opacity-0 -translate-x-1 group-hover/cta:opacity-100 group-hover/cta:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              {content.readLabel}
            </span>
            <MagneticCTA>
              <span className="w-9 h-9 rounded-full border border-primary-950/15 flex items-center justify-center text-primary-950 transition-[background-color,color,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:bg-primary-950 group-hover/cta:text-white group-hover/cta:border-primary-950 group-hover/cta:shadow-[0_12px_30px_-10px_rgba(6,48,75,0.45)]">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:rotate-45" />
              </span>
            </MagneticCTA>
          </span>
        </div>
      </div>

      <span className="absolute left-0 bottom-0 h-0.75 w-full bg-linear-to-r from-secondary-400 to-primary-500 origin-left scale-x-0 group-hover/card:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
    </CardShell>
  );
}

function BroadsideCard({
  post,
  index,
  isInView,
  content,
}: {
  post: Post;
  index: number;
  isInView: boolean;
  content: BlogArchiveContent;
}) {
  return (
    <CardShell
      href={`/blogs/${post.slug}`}
      ariaLabel={post.title}
      className="rounded-[28px] overflow-hidden bg-primary-950 hover:shadow-[0_40px_100px_-30px_rgba(6,48,75,0.5)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_85%_0%,#084c72_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_10%_100%,rgba(44,199,228,0.1)_0%,transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative grid grid-cols-12 gap-0">
        <div className="col-span-12 md:col-span-7 p-8 md:p-12 lg:p-14 flex flex-col justify-between gap-8 md:gap-12 min-h-85">
          <StaggerChildren isInView={isInView}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-heading font-black text-2xl md:text-3xl text-secondary-400 tabular-nums leading-none">
                  №{pad(index)}
                </span>
                <span className="w-10 h-px bg-white/20" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
                  {content.featuredBroadsideLabel}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-white/60">
                <Clock3 className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
                  {readingTime(post.title)}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm">
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-secondary-300">
                    {post.categories?.[0] || content.fallbackCategory}
                  </span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
                  {formatDate(post.publishedAt)}
                </span>
              </div>

              <h4 className="font-heading font-medium text-2xl md:text-3xl lg:text-[2.4rem] leading-[1.12] tracking-tight text-white max-w-2xl">
                <span className="hover:text-secondary-200 transition-colors duration-500">
                  <HoverHeadline variant="dark">{post.title}</HoverHeadline>
                </span>
              </h4>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <div className="flex items-center gap-3">
                {post.author?.imageUrl ? (
                  <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/20 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110">
                    <Image
                      src={post.author.imageUrl}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center text-xs font-heading font-bold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110">
                    {(post.author?.name || "EVP").charAt(0)}
                  </div>
                )}
                <span className="text-sm font-medium text-white/80">
                  {post.author?.name || content.fallbackAuthor}
                </span>
              </div>

              <span className="group/cta inline-flex items-center gap-3 text-white">
                <span className="text-xs font-bold uppercase tracking-[0.25em] hidden sm:inline relative">
                  {content.readArticleLabel}
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-secondary-300 origin-left scale-x-0 group-hover/cta:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </span>
                <MagneticCTA strength={0.4}>
                  <span className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center transition-[background-color,color,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:bg-secondary-400 group-hover/cta:border-secondary-400 group-hover/cta:text-primary-950 group-hover/cta:shadow-[0_18px_40px_-12px_rgba(44,199,228,0.55)]">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:rotate-45" />
                  </span>
                </MagneticCTA>
              </span>
            </div>
          </StaggerChildren>
        </div>

        <div className="col-span-12 md:col-span-5 relative aspect-4/3 md:aspect-auto md:min-h-85">
          <ImageCanvas
            src={post.mainImage?.asset?.url}
            alt={post.title}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-linear-to-r from-primary-950 via-primary-950/55 to-transparent md:from-primary-950 md:via-primary-950/40 md:to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-linear-to-t from-primary-950/40 via-transparent to-transparent pointer-events-none" />
          </ImageCanvas>
        </div>
      </div>

      <span className="absolute left-0 bottom-0 h-0.75 w-full bg-linear-to-r from-secondary-400 to-primary-400 origin-left scale-x-0 group-hover/card:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
    </CardShell>
  );
}

function ArchiveFooter({ content }: { content: BlogArchiveContent }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      className={cn(
        "mt-20 md:mt-28 flex items-center justify-center gap-4",
        "text-[10px] font-bold uppercase tracking-[0.35em] text-primary-700/40",
      )}
    >
      <span className="h-px w-16 bg-primary-950/10" />
      <span>{content.footerLabel}</span>
      <span className="h-px w-16 bg-primary-950/10" />
    </motion.div>
  );
}
