import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticleSection } from "@/components/blog/blog-article-section";
import { BlogDetailHero } from "@/components/blog/blog-detail-hero";
import { DUMMY_POSTS } from "@/constants/blogs";
import {
  getBlogIndexPage,
  getBlogPost,
  getBlogSlugs,
} from "@/sanity/lib/content";
import { metadataFromSeo } from "@/sanity/lib/metadata";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) return { title: "Not Found" };

  return metadataFromSeo(post.seo, {
    metaTitle: post.metaTitle || post.title,
    metaDescription:
      post.metaDesc ||
      post.excerpt ||
      "Read our latest publishing insights and editorial advice.",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [data, page] = await Promise.all([
    getBlogPost(slug),
    getBlogIndexPage(),
  ]);

  if (!data) {
    notFound();
  }

  const fallbackPost = DUMMY_POSTS.find((post) => post.slug === slug);
  const issueNumber = Math.max(
    1,
    DUMMY_POSTS.findIndex((post) => post.slug === slug) + 1,
  );

  return (
    <main>
      <BlogDetailHero
        title={data.title}
        publishedAt={data.publishedAt}
        categories={data.categories}
        author={data.author}
        mainImage={data.mainImage}
        readTime={data.readTime || fallbackPost?.readTime}
        issueNumber={issueNumber}
        content={page.detail}
      />
      <BlogArticleSection
        title={data.title}
        author={data.author}
        readTime={data.readTime || fallbackPost?.readTime}
        content={fallbackPost?.content}
        portableContent={data.body}
        labels={page.detail}
      />
    </main>
  );
}
