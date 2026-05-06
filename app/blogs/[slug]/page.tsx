import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BlogDetailHero } from "@/components/blog/blog-detail-hero";
import { BlogArticleSection } from "@/components/blog/blog-article-section";
import { DUMMY_POSTS } from "@/constants/blogs";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
      title,
      "description": pt::text(body),
    }`,
    { slug }
  );

  const fallback = DUMMY_POSTS.find((p) => p.slug === slug);
  const title = fallback?.metaTitle || post?.title || fallback?.title || "Blog Post";
  const description = fallback?.metaDesc || post?.description || "Read our latest publishing insights and editorial advice.";

  return {
    title,
    description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      mainImage {
        asset->{
          _id,
          url
        }
      },
      publishedAt,
      "author": author->{name, "imageUrl": image.asset->url},
      "categories": categories[]->title,
      body
    }`,
    { slug }
  );

  const dummyPost = DUMMY_POSTS.find((p) => p.slug === slug);

  if (!post && !dummyPost) {
    notFound();
  }

  const data = post || dummyPost!;
  const issueNumber =
    DUMMY_POSTS.findIndex((p) => p.slug === slug) + 1 || 1;

  return (
    <main>
      <BlogDetailHero
        title={data.title}
        publishedAt={data.publishedAt}
        categories={data.categories}
        author={data.author}
        mainImage={data.mainImage}
        readTime={dummyPost?.readTime}
        issueNumber={issueNumber}
      />
      <BlogArticleSection
        title={data.title}
        author={data.author}
        readTime={dummyPost?.readTime}
        content={dummyPost?.content}
        fallback={
          !dummyPost ? (
            <p className="text-primary-700/55 italic">
              PortableText rendering required for live Sanity content. Please
              install <code>@portabletext/react</code>.
            </p>
          ) : undefined
        }
      />
    </main>
  );
}
