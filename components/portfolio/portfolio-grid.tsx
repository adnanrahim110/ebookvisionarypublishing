"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Text } from "@/components/ui/text";

interface Book {
  id: string;
  title: string;
  author?: string;
  coverUrl: string;
  coverImage?: unknown;
}

interface PortfolioSectionProps {
  section: {
    label?: string;
    heading?: string;
    description?: string;
  };
  books: Book[];
}

export function PortfolioGrid({ section, books }: PortfolioSectionProps) {
  if (!books || books.length === 0) return null;

  return (
    <Section className="bg-white overflow-hidden py-20 lg:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-24">
          {section.label && (
            <div className="flex justify-center mb-4">
              <SectionLabel>{section.label}</SectionLabel>
            </div>
          )}
          {section.heading && (
            <Heading as="h2" className="mb-6 text-center justify-center">
              {section.heading}
            </Heading>
          )}
          {section.description && (
            <Text size="lg" className="text-gray-600">
              {section.description}
            </Text>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-10">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group relative aspect-3/4 w-full overflow-hidden rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.2)] bg-gray-100"
            >
              <div className="absolute inset-0 z-10 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
              <Image
                src={book.coverUrl}
                alt={book.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full bg-linear-to-t from-black/90 via-black/50 to-transparent p-5 transition-transform duration-500 ease-out group-hover:translate-y-0 text-left">
                <h3 className="text-lg font-bold text-white leading-tight mb-1 line-clamp-2">
                  {book.title}
                </h3>
                {book.author && (
                  <p className="text-sm text-gray-300 truncate font-medium">
                    {book.author}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
