import type { Metadata } from "next";

import { ContactSection } from "@/components/home/contact-section";
import { ServicesOverview } from "@/components/home/services-overview";
import { CTABanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { getServices, getServicesIndexPage } from "@/sanity/lib/content";
import { metadataFromSeo } from "@/sanity/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicesIndexPage();
  return metadataFromSeo(page.seo);
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([
    getServicesIndexPage(),
    getServices(),
  ]);

  return (
    <main className="bg-white">
      <PageHero {...page.hero} />
      <ServicesOverview services={services} content={page.servicesOverview} />
      <CTABanner theme="dark" />
      <ContactSection />
    </main>
  );
}
