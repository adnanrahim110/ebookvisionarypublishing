"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  LayoutGrid,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import * as React from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import {
  ADDRESS,
  COMPANY_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE,
} from "@/constants";
import { useReducedMotion } from "@/utils/use-reduced-motion";

const SERVICE_OPTIONS = [
  { label: "Full Publishing Package", value: "publishing" },
  { label: "Editing & Proofreading", value: "editing" },
  { label: "Cover Design & Formatting", value: "design" },
  { label: "Book Marketing", value: "marketing" },
];

function CustomInput({
  icon: Icon,
  placeholder,
  type = "text",
}: {
  icon: any;
  placeholder: string;
  type?: string;
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <div className="relative group w-full">
      <div
        className={`absolute inset-0 bg-secondary-400 blur-xl transition-opacity duration-500 rounded-2xl ${isFocused ? "opacity-15" : "opacity-0 group-hover:opacity-5"}`}
      />

      <div
        className={`relative bg-white border rounded-2xl transition-all duration-500 flex items-center overflow-hidden
        ${isFocused ? "border-secondary-400 shadow-xl shadow-secondary-500/10" : "border-white shadow-sm hover:border-primary-200"}
      `}
      >
        <div className="pl-6 pr-4 flex items-center justify-center">
          <Icon
            className={`w-5 h-5 transition-all duration-500 ${isFocused ? "text-secondary-500 scale-110" : "text-primary-400 group-hover:text-primary-600"}`}
          />
        </div>
        <input
          type={type}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent py-5 pr-6 text-primary-950 placeholder-primary-400 focus:outline-none font-body text-base"
        />
        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.75 bg-secondary-500 transition-all duration-500 ease-out rounded-t-full ${isFocused ? "w-[60%] opacity-100" : "w-0 opacity-0"}`}
        />
      </div>
    </div>
  );
}

function CustomSelect({
  icon: Icon,
  options,
  placeholder,
}: {
  icon: any;
  options: { label: string; value: string }[];
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string | null>(null);
  const selectRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative group w-full z-20" ref={selectRef}>
      <div
        className={`absolute inset-0 bg-secondary-400 blur-xl transition-opacity duration-500 rounded-2xl ${isOpen ? "opacity-15" : "opacity-0 group-hover:opacity-5"}`}
      />

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`relative bg-white border rounded-2xl transition-all duration-500 flex items-center cursor-pointer overflow-hidden
          ${isOpen ? "border-secondary-400 shadow-xl shadow-secondary-500/10" : "border-white shadow-sm hover:border-primary-200"}
        `}
      >
        <div className="pl-6 pr-4 flex items-center justify-center">
          <Icon
            className={`w-5 h-5 transition-all duration-500 ${isOpen ? "text-secondary-500 scale-110" : "text-primary-400 group-hover:text-primary-600"}`}
          />
        </div>
        <div
          className={`w-full py-5 pr-6 text-base font-body transition-colors select-none ${selected ? "text-primary-950" : "text-primary-400"}`}
        >
          {selected
            ? options.find((o) => o.value === selected)?.label
            : placeholder}
        </div>
        <div className="pr-6">
          <ChevronDown
            className={`w-5 h-5 text-primary-400 transition-transform duration-500 ${isOpen ? "rotate-180 text-secondary-500" : ""}`}
          />
        </div>
        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.75 bg-secondary-500 transition-all duration-500 ease-out rounded-t-full ${isOpen ? "w-[60%] opacity-100" : "w-0 opacity-0"}`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 top-[calc(100%+12px)] bg-white border border-primary-100 shadow-2xl rounded-3xl overflow-hidden flex flex-col py-2"
          >
            {options.map((option, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-6 py-4 transition-colors font-body flex items-center justify-between group/btn
                  ${selected === option.value ? "bg-primary-50 text-secondary-600 font-medium" : "hover:bg-primary-50 text-primary-950"}
                `}
              >
                <span className="group-hover/btn:translate-x-2 transition-transform duration-300">
                  {option.label}
                </span>
                {selected === option.value && (
                  <Check className="w-5 h-5 text-secondary-500" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CustomTextarea({
  icon: Icon,
  placeholder,
}: {
  icon: any;
  placeholder: string;
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <div className="relative group w-full z-10">
      <div
        className={`absolute inset-0 bg-secondary-400 blur-xl transition-opacity duration-500 rounded-2xl ${isFocused ? "opacity-15" : "opacity-0 group-hover:opacity-5"}`}
      />

      <div
        className={`relative bg-white border rounded-2xl transition-all duration-500 flex items-start overflow-hidden
        ${isFocused ? "border-secondary-400 shadow-xl shadow-secondary-500/10" : "border-white shadow-sm hover:border-primary-200"}
      `}
      >
        <div className="pl-6 pr-4 pt-[1.35rem] flex items-center justify-center">
          <Icon
            className={`w-5 h-5 transition-all duration-500 ${isFocused ? "text-secondary-500 scale-110" : "text-primary-400 group-hover:text-primary-600"}`}
          />
        </div>
        <textarea
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={5}
          className="w-full bg-transparent py-5 pr-6 text-primary-950 placeholder-primary-400 focus:outline-none font-body text-base resize-none"
        />
        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.75 bg-secondary-500 transition-all duration-500 ease-out rounded-t-full ${isFocused ? "w-[60%] opacity-100" : "w-0 opacity-0"}`}
        />
      </div>
    </div>
  );
}

interface ContactSectionProps {
  contactInfo?: any;
}

export function ContactSection({ contactInfo }: ContactSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const email = contactInfo?.contactEmail || CONTACT_EMAIL;
  const phone = contactInfo?.contactPhone || CONTACT_PHONE;
  const address = contactInfo?.address || ADDRESS;

  return (
    <Section
      spacing="lg"
      className="bg-primary-50 border-t border-primary-900/5 overflow-hidden relative"
    >
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
          <div className="w-full lg:w-1/2 flex flex-col pt-4 lg:pt-8">
            <div className="mb-16">
              <Heading
                as="h2"
                size="h2"
                className="text-primary-950 mb-6 leading-[1.1]"
              >
                Let's Discuss Your{" "}
                <span className="italic font-light text-primary-600 block">
                  Next Chapter.
                </span>
              </Heading>
              <Text size="lg" className="text-primary-700 font-light max-w-lg">
                Reach out directly or use the inquiry form. Our editorial team
                is ready to help you bring your vision to life.
              </Text>
            </div>

            <div className="relative flex flex-col gap-12">
              <div className="absolute left-5.5 top-6 bottom-6 w-px bg-linear-to-b from-primary-200 via-primary-200 to-transparent" />

              <div className="relative flex gap-8 items-start group">
                <div className="w-11 h-11 rounded-full bg-white border-4 border-primary-50 flex items-center justify-center z-10 shadow-sm group-hover:border-secondary-100 group-hover:bg-secondary-50 transition-all duration-300 shrink-0">
                  <Phone className="w-4 h-4 text-secondary-500 group-hover:scale-110 transition-transform" />
                </div>
                <div className="pt-1.5">
                  <span className="block text-xs font-semibold tracking-widest text-primary-900 uppercase mb-2">
                    Phone Inquiries
                  </span>
                  <a
                    href={`tel:${phone}`}
                    className="text-2xl font-heading font-light text-primary-600 group-hover:text-primary-950 transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              <div className="relative flex gap-8 items-start group">
                <div className="w-11 h-11 rounded-full bg-white border-4 border-primary-50 flex items-center justify-center z-10 shadow-sm group-hover:border-secondary-100 group-hover:bg-secondary-50 transition-all duration-300 shrink-0">
                  <Mail className="w-4 h-4 text-secondary-500 group-hover:scale-110 transition-transform" />
                </div>
                <div className="pt-1.5">
                  <span className="block text-xs font-semibold tracking-widest text-primary-900 uppercase mb-2">
                    Email Support
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="text-2xl font-heading font-light text-primary-600 group-hover:text-secondary-500 transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <div className="relative flex gap-8 items-start group">
                <div className="w-11 h-11 rounded-full bg-white border-4 border-primary-50 flex items-center justify-center z-10 shadow-sm group-hover:border-secondary-100 group-hover:bg-secondary-50 transition-all duration-300 shrink-0">
                  <MapPin className="w-4 h-4 text-secondary-500 group-hover:scale-110 transition-transform" />
                </div>
                <div className="pt-1.5">
                  <span className="block text-xs font-semibold tracking-widest text-primary-900 uppercase mb-2">
                    Headquarters
                  </span>
                  <span className="text-xl font-heading font-light text-primary-600 block">
                    {address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 py-4 lg:py-8 flex flex-col justify-center">
            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }
              }
              whileInView={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }
              }
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-10">
                <h3 className="text-3xl lg:text-4xl font-heading font-bold text-primary-950 mb-4">
                  Send an Inquiry
                </h3>
                <p className="text-primary-700 text-lg">
                  Fill out the fields below and we'll get back to you within 24
                  hours.
                </p>
              </div>

              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomInput icon={User} placeholder="Full Name" />
                  <CustomInput
                    icon={Mail}
                    placeholder="Email Address"
                    type="email"
                  />
                </div>

                <CustomSelect
                  icon={LayoutGrid}
                  placeholder="Service of Interest"
                  options={SERVICE_OPTIONS}
                />

                <CustomTextarea
                  icon={MessageSquare}
                  placeholder="Tell us about your manuscript or project..."
                />

                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="relative group overflow-hidden rounded-2xl bg-primary-950 w-full md:w-auto px-10 py-5 flex items-center justify-center gap-4 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary-900/10"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-secondary-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <span className="relative z-10 font-heading font-semibold text-white text-lg tracking-wide">
                      Send Message
                    </span>

                    <div className="relative z-10 overflow-hidden w-6 h-6 flex items-center justify-center">
                      <Send className="w-5 h-5 text-white absolute group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-500" />
                      <Send className="w-5 h-5 text-white absolute -translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 delay-75" />
                    </div>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
