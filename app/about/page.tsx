import type { Metadata } from "next";

import { MissionVisionSection } from "@/components/about/mission-vision-section";
import { ProcessSection } from "@/components/about/process-section";
import { StorySection } from "@/components/about/story-section";
import { StrengthsSection } from "@/components/about/strengths-section";
import { PageHero } from "@/components/shared/page-hero";
import { CTABanner } from "@/components/shared/cta-banner";
import { getAboutPage } from "@/sanity/lib/content";
import { metadataFromSeo } from "@/sanity/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();
  return metadataFromSeo(page.seo);
}

export default async function AboutPage() {
  const page = await getAboutPage();

  return (
    <>
      <PageHero {...page.hero} />
      <StorySection content={page.story} />
      <MissionVisionSection content={page.missionVision} />
      <StrengthsSection content={page.strengths} />
      <ProcessSection content={page.process} />
      <CTABanner />
    </>
  );
}
