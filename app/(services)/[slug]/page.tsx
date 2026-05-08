import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactSection } from "@/components/home/contact-section";
import { FaqAccordion } from "@/components/home/faq-accordion";
import { HowItWorks } from "@/components/home/how-it-works";
import { PortfolioGrid } from "@/components/home/portfolio-grid";
import { TestimonialsSection } from "@/components/home/testimonials-section";

import { ServiceOverview } from "@/components/services/service-overview";
import { ServiceFeatures } from "@/components/services/service-features";
import { ServiceBenefits } from "@/components/services/service-benefits";
import { CTABanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { StatsRow } from "@/components/shared/stats-row";
import { SERVICES_DATA } from "@/constants/services";
import { client } from "@/sanity/lib/client";

export function generateStaticParams() {
  return SERVICES_DATA.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) return { title: "Not Found" };

  return {
    title: `${service.title} | Ebook Visionary Publishing`,
    description: service.subtitle,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const testimonials = await client
    .fetch(`*[_type == "testimonial"] | order(_createdAt asc)`)
    .catch(() => []);
  const books = await client
    .fetch(`*[_type == "portfolioBook"] | order(_createdAt desc)`)
    .catch(() => []);

  return (
    <main className="bg-white">
      <PageHero
        title={service.title}
        subtitle={service.subtitle}
        label="Service Details"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
          { label: service.title },
        ]}
      />

      <ServiceOverview service={service} />
      <StatsRow theme="dark" statsData={service.stats} />
      <ServiceFeatures service={service} />
      <ServiceBenefits service={service} />
      <HowItWorks processSteps={service.process} />
      <PortfolioGrid books={books} />
      <TestimonialsSection testimonials={testimonials} />
      <FaqAccordion faqs={service.faqs} />
      <CTABanner theme="dark" ctaData={service.cta} />
      <ContactSection />
    </main>
  );
}
