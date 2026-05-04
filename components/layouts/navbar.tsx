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

import { Button } from "@/components/ui/button";
import { NAV_LINKS, SERVICES } from "@/constants";
import { cn } from "@/utils/cn";

import { Container } from "@/components/ui/container";

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
      if (latest > previous && !isMobileMenuOpen) {
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

  const isVisuallyScrolled = isScrolled || isMobileMenuOpen;

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 border-b",
        isVisuallyScrolled
          ? "bg-white/95 backdrop-blur-md border-primary-100 py-3 shadow-sm"
          : "bg-transparent border-transparent py-5",
      )}
    >
      <Container className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span
            className={cn(
              "font-heading text-xl md:text-2xl font-bold tracking-tight transition-colors",
              isVisuallyScrolled ? "text-primary-950" : "text-white",
            )}
          >
            EVP.
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
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
                  <button
                    className={cn(
                      "flex items-center gap-1 font-body text-sm font-semibold transition-colors py-1 relative",
                      isParentActive
                        ? isVisuallyScrolled
                          ? "text-primary-950"
                          : "text-white"
                        : isVisuallyScrolled
                          ? "text-primary-700 hover:text-primary-950"
                          : "text-white/80 hover:text-white",
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isServicesOpen && "rotate-180",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 w-full h-0.5 rounded-full transition-transform duration-300",
                        isParentActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover/nav:scale-x-100",
                        "origin-right group-hover/nav:origin-left",
                        isVisuallyScrolled ? "bg-primary-950" : "bg-white",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-4"
                      >
                        <div className="bg-white rounded-sm shadow-2xl border border-primary-100 p-2 grid grid-cols-2 gap-1 w-150">
                          {SERVICES.map((service) => {
                            const Icon = iconMap[service.icon] || Feather;
                            const isActive = pathname === service.href;
                            return (
                              <Link
                                key={service.title}
                                href={service.href}
                                className="group relative block p-4 rounded-sm overflow-hidden"
                              >
                                <div
                                  className={cn(
                                    "absolute inset-0 transition-transform duration-300 ease-out z-0",
                                    isActive
                                      ? "bg-primary-50 translate-y-0"
                                      : "bg-primary-50 translate-y-full group-hover:translate-y-0",
                                  )}
                                />

                                <div className="relative z-10 flex items-start gap-4">
                                  <div
                                    className={cn(
                                      "p-2.5 rounded-sm shrink-0 transition-colors duration-300",
                                      isActive
                                        ? "bg-primary-950 text-white shadow-md"
                                        : "bg-primary-100 text-primary-600 group-hover:bg-white group-hover:shadow-sm",
                                    )}
                                  >
                                    <Icon className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <span
                                      className={cn(
                                        "flex items-center gap-2 font-heading text-sm font-bold transition-colors mb-1",
                                        isActive
                                          ? "text-primary-950"
                                          : "text-primary-900 group-hover:text-primary-600",
                                      )}
                                    >
                                      {service.title}
                                      <ArrowRight
                                        className={cn(
                                          "w-3.5 h-3.5 transition-all duration-300",
                                          isActive
                                            ? "opacity-100 translate-x-0 text-primary-600"
                                            : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
                                        )}
                                      />
                                    </span>
                                    <span
                                      className={cn(
                                        "block font-body text-xs line-clamp-2 leading-relaxed transition-colors",
                                        isActive
                                          ? "text-primary-700"
                                          : "text-primary-500 group-hover:text-primary-600",
                                      )}
                                    >
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
                className={cn(
                  "font-body text-sm font-semibold transition-colors py-1 relative group",
                  isParentActive
                    ? isVisuallyScrolled
                      ? "text-primary-950"
                      : "text-white"
                    : isVisuallyScrolled
                      ? "text-primary-700 hover:text-primary-950"
                      : "text-white/80 hover:text-white",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 w-full h-0.5 rounded-full transition-transform duration-300",
                    isParentActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100",
                    "origin-right group-hover:origin-left",
                    isVisuallyScrolled ? "bg-primary-950" : "bg-white",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button
            href="/contact"
            variant={!isVisuallyScrolled ? "white" : "default"}
          >
            Get Started
          </Button>
        </div>

        <button
          className={cn(
            "md:hidden p-2 transition-colors",
            isVisuallyScrolled ? "text-primary-950" : "text-white",
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-primary-100 overflow-hidden shadow-lg"
          >
            <div className="flex flex-col px-4 py-6 gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-heading text-lg font-semibold text-primary-950 border-b border-primary-50 pb-2"
                >
                  {link.label}
                </Link>
              ))}
              <Button href="/contact" className="mt-4 w-full">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
