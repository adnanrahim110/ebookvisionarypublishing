"use client";
import { animate, useMotionValue, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import * as React from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Text } from "@/components/ui/text";
import { urlForImage } from "@/sanity/lib/image";

const DUMMY_BOOKS = [
  {
    id: "1",
    title: "The Last Horizon",
    author: "Sarah Mitchell",
    coverUrl: "/images/books/cover-1.png",
  },
  {
    id: "2",
    title: "Beyond The Pages",
    author: "James Carter",
    coverUrl: "/images/books/cover-2.png",
  },
  {
    id: "3",
    title: "Whispers of Ink",
    author: "Elena Woods",
    coverUrl: "/images/books/cover-3.png",
  },
  {
    id: "4",
    title: "Rising Tides",
    author: "Marcus Hall",
    coverUrl: "/images/books/cover-4.png",
  },
  {
    id: "5",
    title: "Silent Echoes",
    author: "Diana Cross",
    coverUrl: "/images/books/cover-5.png",
  },
  {
    id: "6",
    title: "The Garden Path",
    author: "Thomas Reed",
    coverUrl: "/images/books/cover-6.png",
  },
  {
    id: "7",
    title: "Paper Hearts",
    author: "Lily Chen",
    coverUrl: "/images/books/cover-7.png",
  },
  {
    id: "8",
    title: "Neon Nights",
    author: "Jake Stone",
    coverUrl: "/images/books/cover-8.png",
  },
];

const CARD_W = 220;
const CARD_STEP = 280;
const VISIBLE_RANGE = 4;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

interface BookSlideProps {
  book: (typeof DUMMY_BOOKS)[0];
  offset: number;
}

function BookSlide({ book, offset }: BookSlideProps) {
  const abs = Math.abs(offset);
  const rotateY = clamp(offset * -40, -60, 60);
  const scale = Math.max(0.6, 1 - abs * 0.12);
  const z = -abs * 120;
  const opacity = clamp(1 - abs * 0.2, 0, 1);
  const x = offset * CARD_STEP * 0.7;

  return (
    <div
      className="absolute left-1/2 top-0"
      style={{
        width: CARD_W,
        marginLeft: -CARD_W / 2,
        transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity,
        zIndex: 10 - Math.round(abs * 2),
      }}
    >
      <div className="relative group">
        <div
          className="absolute -bottom-5 left-[15%] right-[15%] h-6 rounded-full bg-black/15 blur-lg"
          style={{ opacity: clamp(1 - abs * 0.5, 0, 1) }}
        />
        <div className="relative aspect-2/3 rounded-lg overflow-hidden shadow-xl ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.02]">
          <Image
            src={book.coverUrl}
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
  books?: any[];
}

export function PortfolioGrid({ books = [] }: PortfolioGridProps) {
  const displayBooks =
    books.length > 0
      ? books.map((b) => ({
          id: b._id,
          title: b.title,
          author: b.author,
          coverUrl: b.coverImage
            ? urlForImage(b.coverImage)?.url()
            : "/images/books/cover-1.png",
        }))
      : DUMMY_BOOKS;

  const count = displayBooks.length;
  const x = useMotionValue(0);
  const [renderPos, setRenderPos] = React.useState(0);
  const isDragging = React.useRef(false);
  const dragStartX = React.useRef(0);
  const dragStartVal = React.useRef(0);
  const prevPointer = React.useRef({ x: 0, t: 0 });
  const velRef = React.useRef(0);

  useMotionValueEvent(x, "change", (v) => setRenderPos(v));

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartVal.current = x.get();
    prevPointer.current = { x: e.clientX, t: Date.now() };
    velRef.current = 0;
    x.stop();
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    const now = Date.now();
    const dt = now - prevPointer.current.t;
    if (dt > 4) {
      velRef.current = (e.clientX - prevPointer.current.x) / dt;
      prevPointer.current = { x: e.clientX, t: now };
    }
    x.set(dragStartVal.current + dx / CARD_STEP);
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const v = velRef.current;
    const current = x.get();
    const projected = current + v * 1.2;
    const snapped = Math.round(projected);
    const maxJump = 2;
    const clamped =
      Math.round(clamp(snapped - Math.round(current), -maxJump, maxJump)) +
      Math.round(current);
    animate(x, clamped, {
      type: "spring",
      stiffness: 300,
      damping: 35,
      mass: 0.8,
    });
  };

  const goTo = (idx: number) => {
    const currentCenter = Math.round(-x.get());
    const currentMod = mod(currentCenter, count);
    let delta = idx - currentMod;
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;
    animate(x, x.get() - delta, {
      type: "spring",
      stiffness: 250,
      damping: 32,
    });
  };

  const activeIdx = mod(Math.round(-renderPos), count);

  const slots = React.useMemo(() => {
    const arr: number[] = [];
    for (let s = -VISIBLE_RANGE; s <= VISIBLE_RANGE; s++) arr.push(s);
    return arr;
  }, []);

  return (
    <Section spacing="lg" className="bg-white overflow-hidden">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <SectionLabel className="mb-5">Portfolio</SectionLabel>
          <Heading as="h2" size="h2" className="mb-4 justify-center">
            Recent Masterpieces.
          </Heading>
          <Text size="lg" className="text-primary-600/70">
            A showcase of books we have helped bring to life — from concept to
            publication.
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
          {slots.map((slot) => {
            const fractional = renderPos + Math.round(-renderPos) + slot;
            const offset = renderPos - Math.round(-renderPos) + fractional;
            const realOffset =
              renderPos + mod(Math.round(-renderPos) + slot, count);
            const bookIdx = mod(Math.round(-renderPos) + slot, count);
            const visualOffset = slot + (renderPos - Math.round(-renderPos));

            if (Math.abs(visualOffset) > VISIBLE_RANGE) return null;

            return (
              <BookSlide
                key={`slot-${slot}`}
                book={displayBooks[bookIdx]}
                offset={visualOffset}
              />
            );
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
