"use client";
import { ServiceCard } from "@/components/shared/service-card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Text } from "@/components/ui/text";
import { SERVICES } from "@/constants";

interface ServicesOverviewProps {
  services?: any[];
}

export function ServicesOverview({ services = [] }: ServicesOverviewProps) {
  const displayServices =
    services.length > 0
      ? services.map((s) => ({
          title: s.title,
          description: s.description,
          href: s.slug?.current ? `/services/${s.slug.current}` : "#",
          icon: s.icon || "feather",
        }))
      : SERVICES;

  return (
    <Section spacing="lg" className="bg-primary-900 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[3rem_3rem] pointer-events-none" />

      <Container className="relative">
        <div className="text-center mb-20 flex flex-col items-center">
          <SectionLabel className="mb-5 text-secondary-400">
            Our Expertise
          </SectionLabel>
          <Heading as="h2" size="h2" className="mb-4 justify-center text-white">
            Everything You Need to Become a Bestseller.
          </Heading>
          <Text size="lg" className="text-primary-100/70">
            From first draft to global distribution — our full suite of
            publishing services covers every step of your journey.
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
