import { BlogList } from "@/components/blog/blog-list";
import { PageHero } from "@/components/shared/page-hero";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";
import { groq } from "next-sanity";

export const metadata: Metadata = {
  title: "Blog | Ebook Visionary Publishing",
  description:
    "Insights, industry news, and editorial advice from our experts.",
};

export const revalidate = 60;

import { DUMMY_POSTS } from "@/constants/blogs";

export default async function BlogPage() {
  const fetchedPosts = await client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) {
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
      "categories": categories[]->title
    }`,
  );

  const posts =
    fetchedPosts && fetchedPosts.length > 0 ? fetchedPosts : DUMMY_POSTS;

  return (
    <main>
      <PageHero
        title="Our Blog"
        subtitle="Dive into the world of publishing with our editorial insights, marketing tips, and success stories."
      />
      <BlogList posts={posts} />
    </main>
  );
}
