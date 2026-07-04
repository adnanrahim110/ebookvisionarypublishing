export interface Feature {
  title: string;
  description: string;
  image?: string;
}

export interface Stat {
  value: number | string;
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
  label?: string;
  title: string;
  highlight: string;
  description: string;
  suffix?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  stats?: { value: string; label: string }[];
}

export interface ContactSectionData {
  label?: string;
  heading?: string;
  headingEmphasis?: string;
  description?: string;
  infoHeading?: string;
  hoursLabel?: string;
  hours?: string;
  formHeading?: string;
  formDescription?: string;
  fullNameLabel?: string;
  emailLabel?: string;
  phoneLabel?: string;
  serviceLabel?: string;
  messageLabel?: string;
  privacyText?: string;
  submitLabel?: string;
}

export interface TestimonialData {
  name: string;
  role: string;
  content: string;
}

export interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
}

export interface ServiceData {
  slug: string;
  title: string;
  heroTitle?: string;
  heroSubtitle?: string;
  subtitle: string;
  icon: string;
  seo?: SeoData;
  
  overviewLabel?: string;
  overviewHeading?: string;
  overview: string;
  overviewImage?: string;

  featuresLabel?: string;
  featuresHeading?: string;
  featuresDescription?: string;
  features: Feature[];

  benefitsHeading?: string;
  benefitsSubheading?: string;
  benefits: string[];
  benefitImages?: string[];

  processLabel?: string;
  processHeading?: string;
  process?: ProcessStep[];

  stats?: Stat[];
  testimonials?: TestimonialData[];
  faqs?: Faq[];
  cta?: CtaData;
  contact?: ContactSectionData;
}
