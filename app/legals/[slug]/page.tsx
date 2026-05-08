import { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalClient } from "@/components/legal/legal-client";
import { LEGAL_DATA } from "@/constants/legal";

export function generateStaticParams() {
  return LEGAL_DATA.map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = LEGAL_DATA.find((doc) => doc.slug === slug);

  if (!data) return { title: "Not Found" };

  return {
    title: `${data.title} | Ebook Visionary Publishing`,
    description: data.intro.substring(0, 160) + "...",
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = LEGAL_DATA.find((doc) => doc.slug === slug);

  if (!data) {
    notFound();
  }

  return <LegalClient data={data} />;
}
