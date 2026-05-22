import type { Metadata } from "next";

import { ContactSection } from "@/components/home/contact-section";
import { FaqAccordion } from "@/components/home/faq-accordion";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { PortfolioGrid } from "@/components/home/portfolio-grid";
import { Pricing } from "@/components/home/pricing";
import { ServicesOverview } from "@/components/home/services-overview";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { WhyPublish } from "@/components/home/why-publish";
import { StatsRow } from "@/components/shared/stats-row";
import {
  getHomePage,
  getPortfolioBooks,
  getServices,
  getTestimonials,
} from "@/sanity/lib/content";
import { metadataFromSeo } from "@/sanity/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage();
  return metadataFromSeo(page.seo);
}

export default async function Home() {
  const [page, services, testimonials, books] = await Promise.all([
    getHomePage(),
    getServices(),
    getTestimonials(),
    getPortfolioBooks(),
  ]);

  return (
    <>
      <Hero content={page.hero} />
      <StatsRow statsData={page.stats} />
      <WhyPublish content={page.whyPublish} />
      <ServicesOverview services={services} content={page.servicesOverview} />
      <PortfolioGrid books={books} content={page.portfolio} />
      <HowItWorks processSteps={page.process.steps} content={page.process} />
      <Pricing content={page.pricing} />
      <TestimonialsSection
        testimonials={testimonials}
        content={page.testimonials}
      />
      <FaqAccordion faqs={page.faq.items} content={page.faq} />
      <ContactSection content={page.contact} />
    </>
  );
}
