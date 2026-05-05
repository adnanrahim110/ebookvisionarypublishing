import type { Metadata } from "next";

import { ContactSection } from "@/components/home/contact-section";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = {
  title: "Contact Us | Ebook Visionary Publishing",
  description:
    "Get in touch with Ebook Visionary Publishing. Reach out for a free consultation, send us an inquiry, or visit our office in Dallas, TX.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let's Bring Your Vision to Life."
        subtitle="Whether you have a question, need a quote, or want to discuss your manuscript — our team is here to help."
        label="Contact Us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />
      <ContactSection />
    </>
  );
}
