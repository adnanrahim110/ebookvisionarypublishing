"use client";
import { motion, useInView } from "framer-motion";
import {
  AlignLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Edit3,
  Image as ImageIcon,
  Layout,
  PenTool,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useReducedMotion } from "@/utils/use-reduced-motion";

const iconMap: Record<string, React.ElementType<any>> = {
  feather: PenTool,
  "edit-3": Edit3,
  "align-left": AlignLeft,
  "check-circle": CheckCircle,
  layout: Layout,
  image: ImageIcon,
  "pen-tool": PenTool,
  "book-open": BookOpen,
};

const ACCENTS = [
  {
    border: "border-l-[#06b0f8]",
    bg: "bg-[#06b0f8]",
    iconBg: "bg-[#06b0f8]/15",
    text: "text-[#06b0f8]",
    shadow: "shadow-[#06b0f8]/30",
  },
  {
    border: "border-l-[#2cc7e4]",
    bg: "bg-[#2cc7e4]",
    iconBg: "bg-[#2cc7e4]/15",
    text: "text-[#2cc7e4]",
    shadow: "shadow-[#2cc7e4]/30",
  },
  {
    border: "border-l-[#f59e0b]",
    bg: "bg-[#f59e0b]",
    iconBg: "bg-[#f59e0b]/15",
    text: "text-[#f59e0b]",
    shadow: "shadow-[#f59e0b]/30",
  },
  {
    border: "border-l-[#a78bfa]",
    bg: "bg-[#a78bfa]",
    iconBg: "bg-[#a78bfa]/15",
    text: "text-[#a78bfa]",
    shadow: "shadow-[#a78bfa]/30",
  },
  {
    border: "border-l-[#34d399]",
    bg: "bg-[#34d399]",
    iconBg: "bg-[#34d399]/15",
    text: "text-[#34d399]",
    shadow: "shadow-[#34d399]/30",
  },
  {
    border: "border-l-[#fb7185]",
    bg: "bg-[#fb7185]",
    iconBg: "bg-[#fb7185]/15",
    text: "text-[#fb7185]",
    shadow: "shadow-[#fb7185]/30",
  },
  {
    border: "border-l-[#38bdf8]",
    bg: "bg-[#38bdf8]",
    iconBg: "bg-[#38bdf8]/15",
    text: "text-[#38bdf8]",
    shadow: "shadow-[#38bdf8]/30",
  },
  {
    border: "border-l-[#c084fc]",
    bg: "bg-[#c084fc]",
    iconBg: "bg-[#c084fc]/15",
    text: "text-[#c084fc]",
    shadow: "shadow-[#c084fc]/30",
  },
];

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  iconName: string;
  index?: number;
}

export function ServiceCard({
  title,
  description,
  href,
  iconName,
  index = 0,
}: ServiceCardProps) {
  const Icon = (iconMap[iconName] || BookOpen) as any;
  const shouldReduceMotion = useReducedMotion();
  const cardRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.15 });
  const accent = ACCENTS[index % ACCENTS.length];
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={cardRef}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full"
    >
      <Link
        href={href}
        className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xl"
      >
        <div
          className={`relative h-full rounded-xl bg-white/5 border border-white/8 border-l-[3px] ${accent.border} overflow-hidden group transition-all duration-500 hover:bg-white/9 hover:border-white/12`}
        >
          <div
            className={`absolute inset-0 ${accent.bg} opacity-[0.07] origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100 pointer-events-none`}
          />

          <div className="relative z-10 p-8 flex flex-col h-full">
            <span className="absolute -top-3 -right-2 text-[7rem] font-heading font-black leading-none text-white/4 select-none pointer-events-none transition-all duration-700 group-hover:text-white/8 group-hover:-translate-y-2">
              {num}
            </span>

            <div className="mb-7">
              <div
                className={`w-14 h-14 rounded-xl ${accent.iconBg} flex items-center justify-center ${accent.text} transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${accent.shadow}`}
              >
                <Icon size={26} strokeWidth={1.5} />
              </div>
            </div>

            <Heading
              as="h3"
              size="h5"
              animated={false}
              className={`relative z-10 mb-3 text-white transition-colors duration-500 group-hover:${accent.text}`}
            >
              {title}
            </Heading>

            <Text className="relative z-10 text-white/50 leading-relaxed grow line-clamp-3 transition-colors duration-500 group-hover:text-white/70">
              {description}
            </Text>

            <div className="relative z-10 mt-7 flex items-center gap-2">
              <span
                className={`relative text-sm font-semibold ${accent.text} opacity-0 -translate-x-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0`}
              >
                Learn more
                <span
                  className={`absolute bottom-0 left-0 w-0 h-[1.5px] ${accent.bg} transition-all duration-500 delay-100 group-hover:w-full`}
                />
              </span>
              <ArrowRight
                size={14}
                strokeWidth={2}
                className={`${accent.text} opacity-0 -translate-x-3 transition-all duration-500 delay-75 group-hover:opacity-100 group-hover:translate-x-0`}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
