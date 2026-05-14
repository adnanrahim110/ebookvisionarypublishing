"use client";
import { animate, useMotionValue, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import * as React from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Text } from "@/components/ui/text";
import { PORTFOLIO_BOOKS, PORTFOLIO_SECTION } from "@/constants";
import { urlForImage } from "@/sanity/lib/image";

const CARD_W = 220;
const CARD_STEP = 196;
const VISIBLE_RANGE = 4;
const COMMIT_PX = CARD_STEP * 0.2;
const OVERDRAG_RESISTANCE = 0.15;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function shortestOffset(raw: number, count: number) {
  const half = count / 2;
  return mod(raw + half, count) - half;
}

interface DisplayBook {
  id: string;
  title: string;
  author: string;
  coverUrl: string | undefined;
}

interface BookSlideProps {
  book: DisplayBook;
  offset: number;
}

function BookSlide({ book, offset }: BookSlideProps) {
  const abs = Math.abs(offset);
  const rotateY = clamp(offset * -40, -60, 60);
  const scale = Math.max(0.6, 1 - abs * 0.12);
  const z = -abs * 120;
  const opacity = clamp(1 - abs * 0.22, 0, 1);
  const x = offset * CARD_STEP;

  return (
    <div
      className="absolute left-1/2 top-0"
      style={{
        width: CARD_W,
        marginLeft: -CARD_W / 2,
        transform: `translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity,
        zIndex: 10 - Math.round(abs * 2),
        willChange: "transform, opacity",
      }}
    >
      <div className="relative group">
        <div
          className="absolute -bottom-5 left-[15%] right-[15%] h-6 rounded-full bg-black/15 blur-lg"
          style={{ opacity: clamp(1 - abs * 0.5, 0, 1) }}
        />
        <div className="relative aspect-2/3 rounded-lg overflow-hidden shadow-xl ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.02]">
          <Image
            src={book.coverUrl || "/images/books/cover-1.png"}
            alt={book.title}
            fill
            className="object-cover pointer-events-none"
            sizes="220px"
            draggable={false}
          />
        </div>
        <div
          className="mt-4 text-center"
          style={{ opacity: clamp(1 - abs * 2, 0, 1) }}
        >
          <p className="text-primary-950 font-heading font-bold text-sm truncate">
            {book.title}
          </p>
          <p className="text-primary-500 text-xs mt-0.5">{book.author}</p>
        </div>
      </div>
    </div>
  );
}

interface PortfolioGridProps {
  books?: {
    _id?: string;
    title: string;
    author: string;
    coverImage?: unknown;
    coverUrl?: string;
  }[];
  content?: typeof PORTFOLIO_SECTION;
}

export function PortfolioGrid({
  books = [],
  content = PORTFOLIO_SECTION,
}: PortfolioGridProps) {
  const displayBooks: DisplayBook[] = React.useMemo(() => {
    if (books.length > 0) {
      return books.map((b, index) => ({
        id: b._id ?? `portfolio-book-${index}`,
        title: b.title,
        author: b.author,
        coverUrl: b.coverImage
          ? urlForImage(b.coverImage)?.url()
          : b.coverUrl || "/images/books/cover-1.png",
      }));
    }
    return PORTFOLIO_BOOKS.map((b, i) => ({
      id: `local-book-${i}`,
      title: b.title,
      author: b.author,
      coverUrl: b.coverUrl,
    }));
  }, [books]);

  const count = displayBooks.length;

  const [activeIdx, setActiveIdx] = React.useState(0);
  const dragX = useMotionValue(0);
  const [dragPx, setDragPx] = React.useState(0);
  useMotionValueEvent(dragX, "change", setDragPx);

  const isDragging = React.useRef(false);
  const startClientX = React.useRef(0);
  const startDragX = React.useRef(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (count <= 1) return;
    isDragging.current = true;
    dragX.stop();
    startClientX.current = e.clientX;
    startDragX.current = dragX.get();
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startClientX.current;

    let constrained = dx;
    if (Math.abs(dx) > CARD_STEP) {
      const sign = Math.sign(dx);
      const excess = Math.abs(dx) - CARD_STEP;
      constrained = sign * (CARD_STEP + excess * OVERDRAG_RESISTANCE);
    }

    dragX.set(startDragX.current + constrained);
  };

  const commitStep = (step: -1 | 0 | 1) => {
    const targetDragX = step * CARD_STEP;
    animate(dragX, targetDragX, {
      type: "spring",
      stiffness: 380,
      damping: 40,
      mass: 0.9,
      onComplete: () => {
        if (step !== 0) {
          setActiveIdx((prev) => mod(prev - step, count));
        }
        dragX.set(0);
      },
    });
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const current = dragX.get();
    let step: -1 | 0 | 1 = 0;
    if (current > COMMIT_PX) step = 1;
    else if (current < -COMMIT_PX) step = -1;

    commitStep(step);
  };

  const goTo = (target: number) => {
    if (count <= 1 || target === activeIdx) return;

    let delta = target - activeIdx;
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;
    if (delta === 0) return;

    dragX.stop();
    const targetDragX = -delta * CARD_STEP;

    animate(dragX, targetDragX, {
      type: "spring",
      stiffness: 260,
      damping: 34,
      mass: 1,
      onComplete: () => {
        setActiveIdx(target);
        dragX.set(0);
      },
    });
  };

  const dragOffset = count > 0 ? dragPx / CARD_STEP : 0;

  return (
    <Section spacing="lg" className="bg-white overflow-hidden">
      <Container>
        <div className="text-center max-w-4xl mx-auto mb-16 flex flex-col items-center">
          <SectionLabel className="mb-5">{content.label}</SectionLabel>
          <Heading as="h2" size="h2" className="mb-4 justify-center">
            {content.heading}
          </Heading>
          <Text size="lg" className="text-primary-600/70">
            {content.description}
          </Text>
        </div>
      </Container>

      <div className="relative w-full" style={{ perspective: "1200px" }}>
        <div
          className="relative h-105 mx-auto select-none touch-pan-y cursor-grab active:cursor-grabbing"
          style={{ transformStyle: "preserve-3d" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {displayBooks.map((book, bookIdx) => {
            const raw = bookIdx - activeIdx + dragOffset;
            const offset = shortestOffset(raw, count);

            if (Math.abs(offset) > VISIBLE_RANGE) return null;

            return <BookSlide key={book.id} book={book} offset={offset} />;
          })}
        </div>

        <div className="absolute inset-y-0 left-0 w-40 bg-linear-to-r from-white to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-40 bg-linear-to-l from-white to-transparent pointer-events-none z-20" />
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {displayBooks.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIdx
                ? "w-8 bg-primary-500"
                : "w-1.5 bg-primary-200 hover:bg-primary-400"
            }`}
          />
        ))}
      </div>
    </Section>
  );
}
