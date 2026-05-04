"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import {
  AlignLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  ChevronDown,
  Edit3,
  Feather,
  Image as ImageIcon,
  Layout,
  Menu,
  PenTool,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Container } from "@/components/ui/container";
import { NAV_LINKS, SERVICES } from "@/constants";
import { cn } from "@/utils/cn";
import { Button } from "../ui/button";

const iconMap: Record<string, React.ElementType> = {
  feather: Feather,
  "edit-3": Edit3,
  "align-left": AlignLeft,
  "check-circle": CheckCircle,
  layout: Layout,
  image: ImageIcon,
  "pen-tool": PenTool,
  "book-open": BookOpen,
};

function AnimatedNavLink({
  text,
  isDark,
  isActive,
}: {
  text: string;
  isDark: boolean;
  isActive: boolean;
}) {
  const words = text.split(" ");
  let globalCharIndex = 0;

  const baseColor = isDark
    ? isActive
      ? "text-primary-950"
      : "text-primary-800"
    : isActive
      ? "text-white"
      : "text-white/90";

  const hoverColor = isDark ? "text-secondary-600" : "text-secondary-500";

  return (
    <span className="flex flex-wrap font-body text-base font-medium tracking-wide py-1 overflow-hidden">
      {words.map((word, wIdx) => (
        <span key={wIdx} className="flex whitespace-nowrap">
          {word.split("").map((char, cIdx) => {
            const delay = globalCharIndex++;
            return (
              <span key={cIdx} className="relative block">
                <span
                  className={cn(
                    "block transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-[-110%]",
                    baseColor,
                  )}
                  style={{ transitionDelay: `${delay * 15}ms` }}
                >
                  {char}
                </span>
                <span
                  className={cn(
                    "absolute inset-0 block translate-y-[110%] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0",
                    hoverColor,
                  )}
                  style={{ transitionDelay: `${delay * 15}ms` }}
                >
                  {char}
                </span>
              </span>
            );
          })}
          {wIdx < words.length - 1 && <span className="block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isServicesOpen, setIsServicesOpen] = React.useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 50) {
      setIsScrolled(true);
      if (latest > previous && !isMobileMenuOpen && !isServicesOpen) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    } else {
      setIsScrolled(false);
      setHidden(false);
    }
  });

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  const isHeaderWhiteBg = isScrolled && !isMobileMenuOpen;
  const isTextDark = isHeaderWhiteBg;

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        isHeaderWhiteBg
          ? "bg-white/80 backdrop-blur-2xl border-b border-primary-900/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
          : "bg-transparent border-transparent py-6",
      )}
    >
      <Container className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 relative z-50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span
            className={cn(
              "font-heading text-2xl font-bold tracking-tight transition-colors duration-500 flex items-baseline",
              isTextDark ? "text-primary-950" : "text-white",
            )}
          >
            EVP<span className="text-secondary-500">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => {
            const isServicesRoute =
              pathname === "/services" || pathname.startsWith("/services/");
            const isParentActive =
              link.label === "Services"
                ? isServicesRoute
                : pathname === link.href;

            if (link.label === "Services") {
              return (
                <div
                  key={link.label}
                  className="relative group/nav"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button className="flex items-center gap-1.5 transition-colors relative group">
                    <AnimatedNavLink
                      text={link.label}
                      isDark={isTextDark}
                      isActive={isParentActive}
                    />
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:rotate-180",
                        isTextDark
                          ? "text-primary-400 group-hover:text-secondary-500"
                          : "text-white/60 group-hover:text-secondary-400",
                      )}
                    />
                    {isParentActive && (
                      <span
                        className={cn(
                          "absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                          isTextDark ? "bg-primary-950" : "bg-white",
                        )}
                      />
                    )}
                  </button>
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 15,
                          scale: 0.98,
                          filter: "blur(8px)",
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          filter: "blur(0px)",
                        }}
                        exit={{
                          opacity: 0,
                          y: 10,
                          scale: 0.98,
                          filter: "blur(4px)",
                        }}
                        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                        className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+0.5rem)]"
                      >
                        <div className="bg-white rounded-2xl shadow-2xl shadow-primary-900/10 border border-primary-50 p-2 grid grid-cols-2 gap-1 w-3xl relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-secondary-400 to-primary-500 opacity-80" />

                          {SERVICES.map((service) => {
                            const Icon = iconMap[service.icon] || Feather;
                            const isActive = pathname === service.href;
                            return (
                              <Link
                                key={service.title}
                                href={service.href}
                                className="group/item relative block p-4 rounded-2xl overflow-hidden bg-transparent hover:bg-primary-50/80 transition-colors duration-300"
                              >
                                <div className="relative z-10 flex items-start gap-4">
                                  <div
                                    className={cn(
                                      "p-2.5 rounded-xl shrink-0 transition-all duration-500",
                                      isActive
                                        ? "bg-primary-950 text-white shadow-lg shadow-primary-900/20"
                                        : "bg-white text-primary-500 shadow-sm border border-primary-100 group-hover/item:text-secondary-500 group-hover/item:border-secondary-200 group-hover/item:bg-secondary-50",
                                    )}
                                  >
                                    <Icon
                                      className={cn(
                                        "w-5 h-5 transition-transform duration-500",
                                        !isActive &&
                                          "group-hover/item:scale-110",
                                      )}
                                    />
                                  </div>
                                  <div>
                                    <span
                                      className={cn(
                                        "flex items-center gap-2 font-heading text-sm font-bold transition-colors mb-1",
                                        isActive
                                          ? "text-primary-950"
                                          : "text-primary-950 group-hover/item:text-secondary-600",
                                      )}
                                    >
                                      {service.title}
                                      <ArrowRight
                                        className={cn(
                                          "w-3.5 h-3.5 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
                                          isActive
                                            ? "opacity-100 translate-x-0 text-primary-950"
                                            : "opacity-0 -translate-x-4 group-hover/item:opacity-100 group-hover/item:translate-x-0 text-secondary-500",
                                        )}
                                      />
                                    </span>
                                    <span className="inline-block font-body text-xs line-clamp-2 text-neutral-600 group-hover/item:text-primary-700 transition-colors">
                                      {service.description}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <Link
                key={link.label}
                href={link.href}
                className="relative group"
              >
                <AnimatedNavLink
                  text={link.label}
                  isDark={isTextDark}
                  isActive={isParentActive}
                />
                {isParentActive && (
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                      isTextDark ? "bg-primary-950" : "bg-white",
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact">Get Started</Button>
        </div>

        <button
          className={cn(
            "md:hidden p-2 transition-colors relative z-50",
            isTextDark ? "text-primary-950" : "text-white",
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </Container>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 -z-10 bg-primary-950/98 backdrop-blur-3xl md:hidden pt-32 px-8 flex flex-col h-dvh"
          >
            <div className="flex flex-col gap-8 w-full max-w-sm mx-auto">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.5,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className="font-heading text-4xl font-medium text-white block py-2 hover:text-secondary-400 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05, duration: 0.5 }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex justify-center py-4 rounded-full bg-secondary-500 text-white font-heading font-bold text-xl hover:bg-secondary-400 transition-colors shadow-lg shadow-secondary-500/20"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
