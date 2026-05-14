import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactSection } from "@/components/home/contact-section";
import { FaqAccordion } from "@/components/home/faq-accordion";
import { HowItWorks } from "@/components/home/how-it-works";
import { PortfolioGrid } from "@/components/home/portfolio-grid";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { ServiceBenefits } from "@/components/services/service-benefits";
import { ServiceFeatures } from "@/components/services/service-features";
import { ServiceOverview } from "@/components/services/service-overview";
import { CTABanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { StatsRow } from "@/components/shared/stats-row";
import {
  getPortfolioBooks,
  getService,
  getServiceSlugs,
  getTestimonials,
} from "@/sanity/lib/content";
import { metadataFromSeo } from "@/sanity/lib/metadata";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) return { title: "Not Found" };

  return metadataFromSeo(service.seo, {
    metaTitle: `${service.heroTitle || service.title} | Ebook Visionary Publishing`,
    metaDescription: service.heroSubtitle || service.subtitle,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, globalTestimonials, books] = await Promise.all([
    getService(slug),
    getTestimonials(),
    getPortfolioBooks(),
  ]);

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-white">
      <PageHero
        title={service.heroTitle || service.title}
        subtitle={service.heroSubtitle || service.subtitle}
        label="Service Details"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <ServiceOverview service={service} />
      <StatsRow
        theme="dark"
        statsData={service.stats?.length ? service.stats : undefined}
      />
      <ServiceFeatures service={service} />
      <ServiceBenefits service={service} />
      <HowItWorks
        processSteps={service.process?.length ? service.process : undefined}
      />
      <PortfolioGrid books={books} />
      <TestimonialsSection
        testimonials={
          service.testimonials?.length ? service.testimonials : globalTestimonials
        }
      />
      <FaqAccordion faqs={service.faqs?.length ? service.faqs : undefined} />
      <CTABanner theme="dark" ctaData={service.cta} />
      <ContactSection />
    </main>
  );
}
