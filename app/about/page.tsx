import type { Metadata } from "next";

import { MissionVisionSection } from "@/components/about/mission-vision-section";
import { ProcessSection } from "@/components/about/process-section";
import { StorySection } from "@/components/about/story-section";
import { StrengthsSection } from "@/components/about/strengths-section";
import { PageHero } from "@/components/shared/page-hero";
import { CTABanner } from "@/components/shared/cta-banner";

export const metadata: Metadata = {
  title: "About Us | Ebook Visionary Publishing",
  description:
    "Learn about Ebook Visionary Publishing, our premium editorial approach, and how we empower authors to share their stories with the world.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Get to Know Ebook Visionary Publishing."
        subtitle="Ebook Visionary is where great books begin and successful authors are made. We deliver everything you need to publish with confidence."
        label="About Us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />
      <StorySection />
      <MissionVisionSection />
      <StrengthsSection />
      <ProcessSection />
      <CTABanner />
    </>
  );
}
