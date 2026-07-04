"use client";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Clock,
  LayoutGrid,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Container } from "@/components/ui/container";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/components/ui/form-textarea";
import { Heading } from "@/components/ui/heading";
import { useGlobalSettings } from "@/components/layouts/global-settings-context";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Text } from "@/components/ui/text";
import { CONTACT_DETAILS, CONTACT_SECTION, SERVICE_OPTIONS } from "@/constants";
import { useReducedMotion } from "@/utils/use-reduced-motion";

type ContactContent = typeof CONTACT_SECTION;
type ContactContentInput = Partial<ContactContent>;
type ContactDetail = (typeof CONTACT_DETAILS)[number];

const ICONS_MAP: Record<string, LucideIcon> = {
  phone: Phone,
  email: Mail,
  office: MapPin,
};

function telHref(value: string) {
  return `tel:${value.replace(/[^0-9+]/g, "")}`;
}

function buildContactDetails(
  settings: ReturnType<typeof useGlobalSettings>,
): ContactDetail[] {
  const phone = settings?.contactPhone || CONTACT_DETAILS[0].value;
  const email = settings?.contactEmail || CONTACT_DETAILS[1].value;
  const address = settings?.address || CONTACT_DETAILS[2].value;

  return [
    {
      ...CONTACT_DETAILS[0],
      value: phone,
      href: telHref(phone),
    },
    {
      ...CONTACT_DETAILS[1],
      value: email,
      href: `mailto:${email}`,
    },
    {
      ...CONTACT_DETAILS[2],
      value: address,
    },
  ];
}

function buildContactContent(
  content: ContactContentInput | undefined,
  settings: ReturnType<typeof useGlobalSettings>,
): ContactContent {
  const fallbackContent = settings?.contactSection || CONTACT_SECTION;
  const merged = {
    ...CONTACT_SECTION,
    ...fallbackContent,
    ...content,
  };

  return {
    ...merged,
    hoursLabel:
      settings?.businessHoursLabel ||
      settings?.contactSection?.hoursLabel ||
      merged.hoursLabel,
    hours:
      settings?.businessHours ||
      settings?.contactSection?.hours ||
      merged.hours,
  };
}

export function ContactSection({
  content,
  contactDetails,
}: {
  content?: ContactContentInput;
  contactDetails?: ContactDetail[];
}) {
  const settings = useGlobalSettings();
  const resolvedContent = buildContactContent(content, settings);
  const resolvedContactDetails =
    contactDetails || buildContactDetails(settings);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const formRef = React.useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, amount: 0.1 });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      fullName: String(formData.get("fullName") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      service: String(formData.get("service") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
    };

    if (!payload.service) {
      setFormError("Please choose a service of interest.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Message could not be sent right now.");
      }

      router.push("/thankyou");
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Message could not be sent right now."
      );
      setIsSubmitting(false);
    }
  }

  return (
    <Section spacing="lg" className="bg-white overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-16">
          <div className="max-w-xl">
            <SectionLabel className="mb-5">{resolvedContent.label}</SectionLabel>
            <Heading as="h2" size="h2">
              {resolvedContent.heading}{" "}
              <em className="not-italic text-primary-500">
                {resolvedContent.headingEmphasis}
              </em>
            </Heading>
          </div>
          <Text
            size="lg"
            className="max-w-md text-primary-700/70 leading-relaxed md:pt-10"
          >
            {resolvedContent.description}
          </Text>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="w-full lg:w-[38%] shrink-0 flex flex-col relative rounded-3xl bg-primary-950 border border-primary-900 p-8 md:p-10 overflow-hidden shadow-2xl">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary-500/15 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary-500/15 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-8 h-full">
              <Heading as="h3" size="h3" className="text-white">
                {resolvedContent.infoHeading}
              </Heading>

              <div className="flex flex-col gap-4">
                {resolvedContactDetails.map((card, i) => {
                  const Icon = ICONS_MAP[card.id] || Phone;
                  const Wrapper = card.href ? "a" : "div";
                  const wrapperProps = card.href ? { href: card.href } : {};

                  return (
                    <motion.div
                      key={card.id}
                      initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Wrapper
                        {...wrapperProps}
                        className="group flex items-start gap-5 p-4 rounded-2xl border border-white/6 bg-white/2 backdrop-blur-md transition-all duration-500 hover:bg-white/6 hover:border-white/20 hover:-translate-y-1"
                      >
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:bg-secondary-500/20 group-hover:border-secondary-500/50 group-hover:text-secondary-400 text-white/70">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 block mb-1">
                            {card.label}
                          </span>
                          <span className="text-white font-heading font-medium text-[15px] leading-snug block wrap-break-word group-hover:text-secondary-100 transition-colors">
                            {card.value}
                          </span>
                        </div>
                        {card.href && (
                          <div className="shrink-0 pt-3 pr-2 overflow-hidden flex items-center justify-center w-6">
                            <ArrowRight className="w-4 h-4 text-white/30 -translate-x-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white transition-all duration-500" />
                          </div>
                        )}
                      </Wrapper>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-auto pt-10 border-t border-white/10 flex items-center gap-5">
                <div className="w-12 h-12 rounded-full border border-white/5 bg-white/2 flex items-center justify-center shrink-0 text-white/30">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 block mb-1">
                    {resolvedContent.hoursLabel}
                  </span>
                  <span className="text-white/80 font-medium text-[15px] block">
                    {resolvedContent.hours}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            ref={formRef}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[62%]"
          >
            <div className="relative h-full rounded-3xl border border-primary-200 bg-primary-50 p-8 md:p-10 overflow-hidden shadow-xl shadow-primary-900/5 flex flex-col justify-center">
              <div className="absolute top-6 left-6 w-1.5 h-1.5 rounded-full bg-primary-300" />
              <div className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full bg-primary-300" />
              <div className="absolute bottom-6 left-6 w-1.5 h-1.5 rounded-full bg-primary-300" />
              <div className="absolute bottom-6 right-6 w-1.5 h-1.5 rounded-full bg-primary-300" />

              <div className="mb-10 text-center sm:text-left">
                <Heading
                  as="h3"
                  size="h3"
                  animated={false}
                  className="mb-4 text-primary-950"
                >
                  {resolvedContent.formHeading}
                </Heading>
                <Text className="text-primary-700 max-w-lg mx-auto sm:mx-0 text-sm">
                  {resolvedContent.formDescription}
                </Text>
              </div>

              <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    icon={User}
                    label={resolvedContent.fullNameLabel}
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                  />
                  <FormInput
                    icon={Mail}
                    label={resolvedContent.emailLabel}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    icon={Phone}
                    label={resolvedContent.phoneLabel}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                  />
                  <FormSelect
                    icon={LayoutGrid}
                    label={resolvedContent.serviceLabel}
                    name="service"
                    options={SERVICE_OPTIONS}
                    required
                  />
                </div>

                <FormTextarea
                  icon={MessageSquare}
                  label={resolvedContent.messageLabel}
                  name="message"
                  required
                />

                {formError && (
                  <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {formError}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-6">
                  <Text className="text-primary-500! text-xs! text-center sm:text-left max-w-xs">
                    {resolvedContent.privacyText}
                  </Text>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative group overflow-hidden rounded-xl bg-primary-950 w-full sm:w-auto px-10 py-5 flex items-center justify-center gap-3 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary-900/10 shrink-0"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-primary-600 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 font-heading font-semibold text-white text-[15px] tracking-wide">
                      {isSubmitting ? "Sending..." : resolvedContent.submitLabel}
                    </span>
                    <div className="relative z-10 overflow-hidden w-5 h-5 flex items-center justify-center">
                      <Send className="w-4.5 h-4.5 text-white absolute group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-500" />
                      <Send className="w-4.5 h-4.5 text-white absolute -translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 delay-75" />
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
