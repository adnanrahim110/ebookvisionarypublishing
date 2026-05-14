import { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalClient } from "@/components/legal/legal-client";
import { getLegalPage, getLegalSlugs } from "@/sanity/lib/content";
import { metadataFromSeo } from "@/sanity/lib/metadata";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getLegalSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getLegalPage(slug);

  if (!data) return { title: "Not Found" };

  return metadataFromSeo(data.seo, {
    metaTitle: `${data.title} | Ebook Visionary Publishing`,
    metaDescription: `${data.intro.substring(0, 157)}...`,
  });
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getLegalPage(slug);

  if (!data) {
    notFound();
  }

  return <LegalClient data={data} />;
}
