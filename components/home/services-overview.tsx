"use client";

import { ServiceCard } from "@/components/shared/service-card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Text } from "@/components/ui/text";
import { SERVICES, SERVICES_OVERVIEW_CONTENT } from "@/constants";

interface ServicesOverviewProps {
  services?: any[];
  content?: typeof SERVICES_OVERVIEW_CONTENT;
}

export function ServicesOverview({
  services = [],
  content = SERVICES_OVERVIEW_CONTENT,
}: ServicesOverviewProps) {
  const displayServices =
    services.length > 0
      ? services.map((s) => ({
          title: s.title,
          description: s.description || s.subtitle,
          href: s.slug?.current ? `/${s.slug.current}` : s.href || "#",
          icon: s.icon || "feather",
        }))
      : SERVICES;

  return (
    <Section spacing="lg" className="bg-primary-900 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[3rem_3rem] pointer-events-none" />

      <Container className="relative">
        <div className="text-center mb-20 flex flex-col items-center">
          <SectionLabel className="mb-5 text-secondary-400">
            {content.label}
          </SectionLabel>
          <Heading as="h2" size="h2" className="mb-4 justify-center text-white">
            {content.heading}
          </Heading>
          <Text size="lg" className="text-primary-100/70 max-w-4xl mx-auto">
            {content.description}
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayServices.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              href={service.href}
              iconName={service.icon}
              index={index}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
