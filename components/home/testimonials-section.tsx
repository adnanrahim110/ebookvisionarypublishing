"use client";
import { Star } from "lucide-react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { TESTIMONIALS, TESTIMONIALS_SECTION } from "@/constants";

import "swiper/swiper.css";

interface TestimonialsSectionProps {
  testimonials?: any[];
  content?: typeof TESTIMONIALS_SECTION;
}

function ReviewCard({
  name,
  role,
  content,
}: {
  name: string;
  role: string;
  content: string;
}) {
  return (
    <div className="bg-primary-900 rounded-3xl p-7 md:p-8 border border-white/6 flex flex-col justify-between gap-5 select-none h-full">
      <div>
        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
          ))}
        </div>
        <p className="text-white/70 text-[0.9rem] leading-relaxed">
          &ldquo;{content}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <div className="w-9 h-9 rounded-full bg-primary-700 flex items-center justify-center text-white/80 font-heading font-bold text-xs shrink-0">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-heading font-semibold text-white/90 text-sm leading-tight">
            {name}
          </p>
          <p className="text-white/30 text-[0.7rem] mt-0.5">{role}</p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof TESTIMONIALS;
  reverse?: boolean;
}) {
  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView="auto"
        spaceBetween={20}
        loop
        freeMode={{
          enabled: true,
          momentum: true,
          momentumRatio: 0.6,
        }}
        speed={6000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: reverse,
        }}
        grabCursor
      >
        {[...items, ...items, ...items].map((t, i) => (
          <SwiperSlide
            key={`${t.name}-${i}`}
            className="w-77.5! md:w-92.5! h-auto!"
          >
            <ReviewCard name={t.name} role={t.role} content={t.content} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export function TestimonialsSection({
  testimonials = [],
  content = TESTIMONIALS_SECTION,
}: TestimonialsSectionProps) {
  const displayTestimonials =
    testimonials.length > 0
      ? testimonials.map((t) => ({
          name: t.name,
          role: t.role,
          content: t.content,
        }))
      : TESTIMONIALS;

  const row2 = [...displayTestimonials].reverse();

  return (
    <Section spacing="lg" className="bg-primary-950 overflow-hidden">
      <Container>
        <div className="text-center mb-16 flex flex-col items-center">
          <SectionLabel className="mb-4 text-secondary-400">
            {content.label}
          </SectionLabel>
          <Heading as="h2" size="h2" className="text-white justify-center">
            {content.heading}
          </Heading>
        </div>
      </Container>

      <div className="relative flex flex-col gap-5 py-6">
        <MarqueeRow items={displayTestimonials} />
        <MarqueeRow items={row2} reverse />

        <div className="absolute inset-y-0 left-0 w-24 md:w-52 bg-linear-to-r from-primary-950 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-52 bg-linear-to-l from-primary-950 to-transparent pointer-events-none z-10" />
      </div>
    </Section>
  );
}
