"use client";

import { motion } from "framer-motion";
import * as React from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { LegalData } from "@/constants/legal";

export function LegalClient({ data }: { data: LegalData }) {
  const [activeSection, setActiveSection] = React.useState(
    data.sections[0]?.id || "",
  );

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[data-id]");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute("data-id") || "";
        }
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-white">
      <div className="bg-primary-950 pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(6,176,248,0.1)_0%,transparent_100%)] pointer-events-none" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-secondary-500/10 text-secondary-400 text-xs font-bold tracking-widest uppercase mb-4 border border-secondary-500/20">
              Legal Documents
            </span>
            <Heading as="h1" size="h1" className="text-white mb-6">
              {data.title}
            </Heading>
            <Text className="text-primary-200/80 text-lg md:text-xl">
              Last Updated: {data.lastUpdated}
            </Text>
          </div>
        </Container>
      </div>

      <Section spacing="lg" className="bg-white">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative items-start">
            <div className="hidden lg:block lg:w-1/4 sticky top-32">
              <h3 className="font-heading font-bold text-primary-950 mb-6 uppercase tracking-wider text-sm">
                Table of Contents
              </h3>
              <nav className="flex flex-col gap-1 border-l border-primary-100">
                {data.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      document
                        .getElementById(section.id)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`text-left px-4 py-2 text-sm transition-all duration-300 border-l-2 -ml-px ${
                      activeSection === section.id
                        ? "border-secondary-500 text-secondary-500 font-semibold"
                        : "border-transparent text-primary-500 hover:text-primary-900 hover:border-primary-300"
                    }`}
                  >
                    {section.heading}
                  </button>
                ))}
              </nav>
            </div>

            <div className="w-full lg:w-3/4 max-w-3xl">
              <Text className="text-primary-700/80 text-lg leading-relaxed mb-12">
                {data.intro}
              </Text>

              <div className="flex flex-col gap-16">
                {data.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    data-id={section.id}
                    className="scroll-mt-32"
                  >
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-950 mb-6 pb-4 border-b border-primary-100">
                      {section.heading}
                    </h2>
                    <div className="flex flex-col gap-6">
                      {section.content.map((paragraph, idx) => (
                        <p
                          key={idx}
                          className="text-primary-700/80 text-lg leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
