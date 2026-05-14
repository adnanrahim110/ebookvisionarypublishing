import type { Metadata } from "next";

import { DEFAULT_SEO, SITE_URL } from "@/constants";
import { urlForImage } from "./image";

type SeoInput = {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  openGraphImage?: unknown;
};

export function metadataFromSeo(
  seo: SeoInput | undefined,
  fallback?: SeoInput,
): Metadata {
  const data = {
    ...DEFAULT_SEO,
    ...fallback,
    ...seo,
  };
  const title = data.metaTitle || DEFAULT_SEO.metaTitle;
  const description = data.metaDescription || DEFAULT_SEO.metaDescription;
  const imageUrl = data.openGraphImage
    ? urlForImage(data.openGraphImage)?.width(1200).height(630).url()
    : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: data.metaKeywords,
    openGraph: {
      title,
      description,
      siteName: "Ebook Visionary Publishing",
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
