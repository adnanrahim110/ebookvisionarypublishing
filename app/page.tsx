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
import { client } from "@/sanity/lib/client";

export default async function Home() {
  const globalSettings = await client
    .fetch(`*[_type == "globalSettings"][0]`)
    .catch(() => null);
  const services = await client
    .fetch(`*[_type == "service"] | order(_createdAt asc)`)
    .catch(() => []);
  const testimonials = await client
    .fetch(`*[_type == "testimonial"] | order(_createdAt asc)`)
    .catch(() => []);
  const books = await client
    .fetch(`*[_type == "portfolioBook"] | order(_createdAt desc)`)
    .catch(() => []);

  return (
    <>
      <Hero />
      <StatsRow />
      <WhyPublish />
      <ServicesOverview services={services} />
      <PortfolioGrid books={books} />
      <HowItWorks />
      <Pricing />
      <TestimonialsSection testimonials={testimonials} />
      <FaqAccordion />
      <ContactSection />
    </>
  );
}
