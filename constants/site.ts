import { SERVICES_DATA } from "./services";

export const COMPANY_NAME = "Ebook Visionary Publishing";
export const SITE_URL = "https://ebookvisionarypublishing.us";
export const CONTACT_PHONE = "+1 (713) 364 6886";
export const CONTACT_EMAIL = "info@ebookvisionarypublishing.us";
export const ADDRESS =
  "1700 Pacific Ave 16th Floor, Suite 1650, Dallas, TX 75201, United States";

export const DEFAULT_SEO = {
  metaTitle: "Ebook Visionary Publishing | Book Publishing Services",
  metaDescription:
    "Ebook Visionary Publishing provides ghostwriting, editing, formatting, book marketing, and self-publishing support for authors worldwide.",
  metaKeywords: [
    "book publishing",
    "ghostwriting",
    "book editing",
    "ebook publishing",
    "self publishing",
  ],
};

export const CONTACT_DETAILS = [
  {
    id: "phone",
    label: "Phone",
    value: CONTACT_PHONE,
    href: `tel:${CONTACT_PHONE.replace(/[^\d+]/g, "")}`,
  },
  {
    id: "email",
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    id: "office",
    label: "Office",
    value: ADDRESS,
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Blogs", href: "/blogs" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export const NAV_CONTENT = {
  brandMark: "EVP",
  ctaLabel: "Get Started",
  ctaHref: "/contact",
};

export const SERVICES = SERVICES_DATA.map((service) => ({
  title: service.title,
  description: service.subtitle,
  href: `/${service.slug}`,
  icon: service.icon,
}));

export const FOOTER_CONTENT = {
  brandMark: "EVP",
  watermark: "VISIONARY.",
  description:
    "Thoughtfully crafted, beautifully produced. We bring your story to life with premium publishing support from start to finish.",
  navigationLabel: "Navigation",
  servicesLabel: "Specialized Services",
  legalLinks: [
    { label: "Privacy Policy", href: "/legals/privacy-policy" },
    { label: "Terms & Conditions", href: "/legals/terms-and-conditions" },
  ],
  copyrightSuffix: "All rights reserved.",
};

export const GLOBAL_SETTINGS = {
  companyName: COMPANY_NAME,
  contactPhone: CONTACT_PHONE,
  contactEmail: CONTACT_EMAIL,
  address: ADDRESS,
  defaultSeo: DEFAULT_SEO,
  nav: NAV_CONTENT,
  navLinks: NAV_LINKS,
  footer: FOOTER_CONTENT,
};
