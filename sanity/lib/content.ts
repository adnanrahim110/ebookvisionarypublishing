import { groq } from "next-sanity";

import {
  ABOUT_PAGE,
  BLOG_INDEX_PAGE,
  CONTACT_PAGE,
  GLOBAL_SETTINGS,
  HOME_PAGE,
  PORTFOLIO_BOOKS,
  SERVICES_INDEX_PAGE,
  TESTIMONIALS,
} from "@/constants";
import { DUMMY_POSTS, type DummyPost } from "@/constants/blogs";
import { LEGAL_DATA, type LegalData } from "@/constants/legal";
import { SERVICES_DATA } from "@/constants/services";
import type { ServiceData } from "@/components/services/types";
import { client } from "./client";

type QueryParams = Record<string, string | number | boolean>;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export function mergeWithFallback<T>(source: unknown, fallback: T): T {
  if (Array.isArray(fallback)) {
    if (!Array.isArray(source) || source.length === 0) return fallback as T;
    const firstFallback = fallback[0];
    return source.map((item, index) =>
      firstFallback === undefined
        ? item
        : mergeWithFallback(item, fallback[index] ?? firstFallback),
    ) as T;
  }

  if (isPlainObject(fallback)) {
    const sourceObject = isPlainObject(source) ? source : {};
    const merged: Record<string, unknown> = { ...sourceObject };

    for (const key of Object.keys(fallback)) {
      merged[key] = mergeWithFallback(
        sourceObject[key],
        (fallback as Record<string, unknown>)[key],
      );
    }

    return merged as T;
  }

  if (typeof fallback === "string") {
    return (typeof source === "string" && source.trim() ? source : fallback) as T;
  }

  if (typeof fallback === "number") {
    return (typeof source === "number" && Number.isFinite(source)
      ? source
      : fallback) as T;
  }

  if (typeof fallback === "boolean") {
    return (typeof source === "boolean" ? source : fallback) as T;
  }

  return (source ?? fallback) as T;
}

async function safeFetch<T>(
  query: string,
  params: QueryParams = {},
  timeoutMs = 3000,
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await client.fetch<T | null>(query, params, {
      signal: controller.signal,
    });
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function bySlug<T extends { slug: string }>(items: T[]) {
  return new Map(items.map((item) => [item.slug, item]));
}

function mergeServices(source: ServiceData[] | null) {
  if (!source?.length) return SERVICES_DATA;

  const fallbackBySlug = bySlug(SERVICES_DATA);
  const seen = new Set<string>();
  const merged = source
    .filter((service) => service?.slug && service?.title)
    .map((service) => {
      seen.add(service.slug);
      const fallback = fallbackBySlug.get(service.slug);
      return fallback ? mergeWithFallback(service, fallback) : service;
    });

  for (const service of SERVICES_DATA) {
    if (!seen.has(service.slug)) merged.push(service);
  }

  return merged;
}

const pageContentFields = groq`
  seo,
  pageHero,
  homeHero,
  stats,
  whyPublish,
  servicesOverview,
  portfolio,
  process,
  pricing,
  testimonials,
  faq,
  contact,
  archive,
  detail,
  story,
  missionVision,
  strengths,
  aboutProcess
`;

const serviceFields = groq`
  _id,
  title,
  heroTitle,
  heroSubtitle,
  "slug": slug.current,
  subtitle,
  icon,
  seo,
  overviewLabel,
  overviewHeading,
  overview,
  featuresLabel,
  featuresHeading,
  features[]{
    title,
    description,
    "image": image.asset->url
  },
  benefitsHeading,
  benefitsSubheading,
  benefits,
  "benefitImages": benefitImages[].asset->url,
  stats,
  process,
  testimonials,
  faqs,
  cta
`;

export async function getHomePage() {
  const data = await safeFetch<typeof HOME_PAGE>(
    groq`*[_type == "pageContent" && pageKey == "home"][0]{
      "hero": homeHero,
      ${pageContentFields}
    }`,
  );

  return mergeWithFallback(data, HOME_PAGE);
}

export async function getGlobalSettings() {
  const data = await safeFetch<typeof GLOBAL_SETTINGS>(
    groq`*[_type == "globalSettings"][0]{
      companyName,
      contactPhone,
      contactEmail,
      address,
      "defaultSeo": globalSeo,
      nav,
      navLinks,
      footer
    }`,
  );

  return mergeWithFallback(data, GLOBAL_SETTINGS);
}

export async function getAboutPage() {
  const data = await safeFetch<typeof ABOUT_PAGE>(
    groq`*[_type == "pageContent" && pageKey == "about"][0]{
      "hero": pageHero,
      "process": aboutProcess,
      ${pageContentFields}
    }`,
  );

  return mergeWithFallback(data, ABOUT_PAGE);
}

export async function getContactPage() {
  const data = await safeFetch<typeof CONTACT_PAGE>(
    groq`*[_type == "pageContent" && pageKey == "contact"][0]{
      "hero": pageHero,
      ${pageContentFields}
    }`,
  );

  return mergeWithFallback(data, CONTACT_PAGE);
}

export async function getBlogIndexPage() {
  const data = await safeFetch<typeof BLOG_INDEX_PAGE>(
    groq`*[_type == "pageContent" && pageKey == "blogs"][0]{
      "hero": pageHero,
      ${pageContentFields}
    }`,
  );

  return mergeWithFallback(data, BLOG_INDEX_PAGE);
}

export async function getServicesIndexPage() {
  const data = await safeFetch<typeof SERVICES_INDEX_PAGE>(
    groq`*[_type == "pageContent" && pageKey == "services"][0]{
      "hero": pageHero,
      ${pageContentFields}
    }`,
  );

  return mergeWithFallback(data, SERVICES_INDEX_PAGE);
}

export async function getServices() {
  const services = await safeFetch<ServiceData[]>(
    groq`*[_type == "service"] | order(orderRank asc, _createdAt asc) {
      ${serviceFields}
    }`,
  );

  return mergeServices(services);
}

export async function getService(slug: string) {
  const fallback = SERVICES_DATA.find((service) => service.slug === slug);
  const service = await safeFetch<ServiceData>(
    groq`*[_type == "service" && slug.current == $slug][0] {
      ${serviceFields}
    }`,
    { slug },
  );

  if (fallback) return mergeWithFallback(service, fallback);
  return service?.slug && service?.title ? service : null;
}

export async function getServiceSlugs() {
  const slugs = await safeFetch<{ slug: string }[]>(
    groq`*[_type == "service" && defined(slug.current)]{"slug": slug.current}`,
  );

  return Array.from(
    new Set([
      ...SERVICES_DATA.map((service) => service.slug),
      ...(slugs || []).map((item) => item.slug).filter(Boolean),
    ]),
  );
}

export async function getTestimonials() {
  const testimonials = await safeFetch<typeof TESTIMONIALS>(
    groq`*[_type == "testimonial"] | order(orderRank asc, _createdAt asc) {
      name,
      role,
      content
    }`,
  );

  return mergeWithFallback(testimonials, TESTIMONIALS);
}

export async function getPortfolioBooks() {
  const books = await safeFetch<typeof PORTFOLIO_BOOKS>(
    groq`*[_type == "portfolioBook"] | order(orderRank asc, _createdAt asc) {
      "id": _id,
      title,
      author,
      coverUrl,
      coverImage
    }`,
  );

  return mergeWithFallback(books, PORTFOLIO_BOOKS);
}

export async function getLegalPage(slug: string) {
  const fallback = LEGAL_DATA.find((doc) => doc.slug === slug);
  const legal = await safeFetch<LegalData>(
    groq`*[_type == "legalPage" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      pageLabel,
      lastUpdated,
      lastUpdatedLabel,
      tableOfContentsLabel,
      intro,
      sections,
      seo
    }`,
    { slug },
  );

  if (fallback) return mergeWithFallback(legal, fallback);
  return legal?.slug && legal?.title ? legal : null;
}

export async function getLegalSlugs() {
  const slugs = await safeFetch<{ slug: string }[]>(
    groq`*[_type == "legalPage" && defined(slug.current)]{"slug": slug.current}`,
  );

  return Array.from(
    new Set([
      ...LEGAL_DATA.map((doc) => doc.slug),
      ...(slugs || []).map((item) => item.slug).filter(Boolean),
    ]),
  );
}

export async function getBlogPosts() {
  const posts = await safeFetch<DummyPost[]>(
    groq`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      readTime,
      mainImage {
        asset->{
          _id,
          url
        }
      },
      publishedAt,
      "author": author->{name, "imageUrl": image.asset->url},
      "categories": categories[]->title,
      seo
    }`,
  );

  return mergeWithFallback(posts, DUMMY_POSTS);
}

export async function getBlogPost(slug: string) {
  const fallback = DUMMY_POSTS.find((post) => post.slug === slug);
  const post = await safeFetch<
    DummyPost & { body?: unknown[]; excerpt?: string; seo?: unknown }
  >(
    groq`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      readTime,
      mainImage {
        asset->{
          _id,
          url
        }
      },
      publishedAt,
      "author": author->{name, "imageUrl": image.asset->url},
      "categories": categories[]->title,
      body,
      seo
    }`,
    { slug },
  );

  if (fallback) return mergeWithFallback(post, fallback);
  return post?.slug && post?.title ? post : null;
}

export async function getBlogSlugs() {
  const slugs = await safeFetch<{ slug: string }[]>(
    groq`*[_type == "post" && defined(slug.current)]{"slug": slug.current}`,
  );

  return Array.from(
    new Set([
      ...DUMMY_POSTS.map((post) => post.slug),
      ...(slugs || []).map((item) => item.slug).filter(Boolean),
    ]),
  );
}
