import type { Metadata } from "next";

import { BlogList } from "@/components/blog/blog-list";
import { PageHero } from "@/components/shared/page-hero";
import { getBlogIndexPage, getBlogPosts } from "@/sanity/lib/content";
import { metadataFromSeo } from "@/sanity/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getBlogIndexPage();
  return metadataFromSeo(page.seo);
}

export default async function BlogPage() {
  const [page, posts] = await Promise.all([getBlogIndexPage(), getBlogPosts()]);

  return (
    <main>
      <PageHero {...page.hero} />
      <BlogList posts={posts} content={page.archive} />
    </main>
  );
}
