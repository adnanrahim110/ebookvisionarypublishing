import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import {
  COMPANY_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  FOOTER_CONTENT,
  GLOBAL_SETTINGS,
  NAV_LINKS,
  SERVICES,
} from "@/constants";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

function AnimatedFooterLink({ text, href }: { text: string; href: string }) {
  const words = text.split(" ");
  let globalCharIndex = 0;

  return (
    <Link
      href={href}
      className="group flex flex-wrap text-white/70 hover:text-white font-body text-xl transition-colors w-fit overflow-hidden py-1 -my-1"
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="flex whitespace-nowrap">
          {word.split("").map((char, cIdx) => {
            const delay = globalCharIndex++;
            return (
              <span key={cIdx} className="relative block">
                <span
                  className="block transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-[-110%]"
                  style={{ transitionDelay: `${delay * 15}ms` }}
                >
                  {char}
                </span>
                <span
                  className="absolute inset-0 block translate-y-[110%] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 text-secondary-400 font-medium"
                  style={{ transitionDelay: `${delay * 15}ms` }}
                >
                  {char}
                </span>
              </span>
            );
          })}
          {wIdx < words.length - 1 && <span className="block">&nbsp;</span>}
        </span>
      ))}
    </Link>
  );
}

type FooterSettings = typeof GLOBAL_SETTINGS;
type NavLink = (typeof NAV_LINKS)[0];
type ServiceLink = (typeof SERVICES)[0];

export function Footer({
  settings = GLOBAL_SETTINGS,
  navLinks = NAV_LINKS,
  services = SERVICES,
}: {
  settings?: FooterSettings;
  navLinks?: NavLink[];
  services?: ServiceLink[];
}) {
  const footer = settings.footer || FOOTER_CONTENT;
  const companyName = settings.companyName || COMPANY_NAME;
  const contactEmail = settings.contactEmail || CONTACT_EMAIL;
  const contactPhone = settings.contactPhone || CONTACT_PHONE;

  return (
    <footer className="bg-primary-950 text-white relative overflow-hidden pt-24 pb-6">
      <div className="absolute -bottom-1/10 left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none opacity-[0.03] z-0">
        <span className="font-heading font-black text-[20vw] leading-none whitespace-nowrap text-white tracking-tighter">
          {footer.watermark}
        </span>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 mb-24">
          <div className="lg:col-span-5 flex flex-col justify-between pr-0 lg:pr-16 border-b lg:border-b-0 lg:border-r border-white/10 pb-12 lg:pb-0">
            <div>
              <Link href="/" className="inline-block mb-8">
                <span className="font-heading text-5xl lg:text-6xl font-bold text-white tracking-tight flex items-baseline">
                  {footer.brandMark}
                  <span className="text-secondary-500">.</span>
                </span>
              </Link>
              <Text
                size="lg"
                className="text-white/70 font-light leading-relaxed max-w-sm mb-12"
              >
                {footer.description}
              </Text>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${contactEmail}`}
                className="group inline-flex items-center gap-5 text-white/80 hover:text-white transition-colors w-fit"
              >
                <span className="w-12 h-12 rounded-full border border-white/10 group-hover:border-secondary-500 group-hover:bg-secondary-500/10 flex items-center justify-center transition-all duration-500">
                  <Mail className="w-4 h-4 text-secondary-500" />
                </span>
                <span className="font-body text-lg">{contactEmail}</span>
              </a>
              <a
                href={`tel:${contactPhone.replace(/[^0-9+]/g, "")}`}
                className="group inline-flex items-center gap-5 text-white/80 hover:text-white transition-colors w-fit"
              >
                <span className="w-12 h-12 rounded-full border border-white/10 group-hover:border-secondary-500 group-hover:bg-secondary-500/10 flex items-center justify-center transition-all duration-500">
                  <Phone className="w-4 h-4 text-secondary-500" />
                </span>
                <span className="font-body text-lg">{contactPhone}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 lg:pl-16 flex flex-col">
            <Heading
              as="h4"
              size="h6"
              className="text-white/40 uppercase tracking-widest text-xs mb-5 font-mono"
            >
              {footer.navigationLabel}
            </Heading>
            <ul className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <AnimatedFooterLink text={link.label} href={link.href} />
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 lg:pl-16 flex flex-col border-t lg:border-t-0 lg:border-l border-white/10 pt-12 lg:pt-0">
            <Heading
              as="h4"
              size="h6"
              className="text-white/40 uppercase tracking-widest text-xs mb-5 font-mono"
            >
              {footer.servicesLabel}
            </Heading>
            <ul className="flex flex-col gap-6">
              {services.slice(0, 5).map((service) => (
                <li key={service.title}>
                  <AnimatedFooterLink
                    text={service.title}
                    href={service.href}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <Text
            variant="light"
            size="sm"
            className="text-white/50 font-mono tracking-widest uppercase text-[10px] md:text-xs"
          >
            © {new Date().getFullYear()} {companyName}. {footer.copyrightSuffix}
          </Text>
          <div className="flex gap-8">
            {footer.legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/50 hover:text-secondary-400 text-[10px] md:text-xs font-mono tracking-widest uppercase transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
