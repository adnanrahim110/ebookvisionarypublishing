import type { Metadata } from "next";

import { ContactSection } from "@/components/home/contact-section";
import { PageHero } from "@/components/shared/page-hero";
import { getContactPage } from "@/sanity/lib/content";
import { metadataFromSeo } from "@/sanity/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  return metadataFromSeo(page.seo);
}

export default async function ContactPage() {
  const page = await getContactPage();

  return (
    <>
      <PageHero {...page.hero} />
      <ContactSection content={page.contact} />
    </>
  );
}
