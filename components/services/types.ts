import * as React from "react";

export interface Feature {
  title: string;
  description: string;
  image?: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  icon: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface CtaData {
  title: string;
  highlight: string;
  description: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  
  overviewLabel?: string;
  overviewHeading?: string;
  overview: string;

  featuresLabel?: string;
  featuresHeading?: string;
  features: Feature[];

  benefitsHeading?: string;
  benefitsSubheading?: string;
  benefits: string[];
  benefitImages?: string[];

  processLabel?: string;
  processHeading?: string;
  process?: ProcessStep[];

  stats?: Stat[];
  faqs?: Faq[];
  cta?: CtaData;
}
