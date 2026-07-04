import type { Metadata } from "next";

import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { CTABanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { getPortfolioBooks, getPortfolioPage } from "@/sanity/lib/content";
import { metadataFromSeo } from "@/sanity/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPortfolioPage();
  return metadataFromSeo(page.seo);
}

export default async function PortfolioPage() {
  const page = await getPortfolioPage();
  const books = await getPortfolioBooks();

  return (
    <>
      <PageHero {...page.hero} />
      <PortfolioGrid section={page.portfolio} books={books} />
      <CTABanner ctaData={page.ctaBanner} />
    </>
  );
}
