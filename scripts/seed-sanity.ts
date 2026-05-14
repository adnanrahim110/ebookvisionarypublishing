import {
  ABOUT_PAGE,
  BLOG_INDEX_PAGE,
  CONTACT_PAGE,
  GLOBAL_SETTINGS,
  HOME_PAGE,
  PORTFOLIO_BOOKS,
  SERVICES_INDEX_PAGE,
  TESTIMONIALS,
} from "../constants";
import {
  BLOG_DETAIL_CONTENT,
  DUMMY_POSTS,
  type ContentBlock,
  type ContentSegment,
} from "../constants/blogs";
import { LEGAL_DATA, LEGAL_PAGE_CONTENT } from "../constants/legal";
import { SERVICES_DATA } from "../constants/services";

const projectId =
  process.env.SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "8as027bx";
const dataset =
  process.env.SANITY_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";
const apiVersion = process.env.SANITY_API_VERSION || "2024-05-04";
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN;

type SanityDoc = Record<string, unknown> & { _id: string; _type: string };

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function slugField(current: string) {
  return { _type: "slug", current };
}

function ref(_ref: string) {
  return { _type: "reference", _ref };
}

function clean<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function pageHero(hero: { breadcrumbs?: unknown[] } & Record<string, unknown>) {
  const { breadcrumbs: _breadcrumbs, ...rest } = hero;
  return rest;
}

function textFromSegments(segments: ContentSegment[]) {
  return segments.map((segment) => segment.text).join("");
}

function childrenFromSegments(segments: ContentSegment[]) {
  return segments.map((segment, index) => {
    const markKey = segment.type === "link" ? `link-${index}` : undefined;
    const marks =
      segment.type === "bold"
        ? ["strong"]
        : segment.type === "italic"
          ? ["em"]
          : markKey
            ? [markKey]
            : [];

    return {
      _key: `span-${index}`,
      _type: "span",
      text: segment.text,
      marks,
    };
  });
}

function markDefsFromSegments(segments: ContentSegment[]) {
  return segments.flatMap((segment, index) =>
    segment.type === "link"
      ? [{ _key: `link-${index}`, _type: "link", href: segment.href }]
      : [],
  );
}

function blockToPortable(block: ContentBlock, index: number) {
  if (block.type === "paragraph") {
    return [
      {
        _key: `block-${index}`,
        _type: "block",
        style: "normal",
        markDefs: markDefsFromSegments(block.segments),
        children: childrenFromSegments(block.segments),
      },
    ];
  }

  if (block.type === "blockquote") {
    return [
      {
        _key: `quote-${index}`,
        _type: "block",
        style: "blockquote",
        markDefs: [],
        children: [
          {
            _key: `quote-span-${index}`,
            _type: "span",
            text: block.author ? `${block.text} - ${block.author}` : block.text,
            marks: [],
          },
        ],
      },
    ];
  }

  return block.items.map((item, itemIndex) => ({
    _key: `list-${index}-${itemIndex}`,
    _type: "block",
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [
      {
        _key: `list-span-${index}-${itemIndex}`,
        _type: "span",
        text: item,
        marks: [],
      },
    ],
  }));
}

function postBody(post: (typeof DUMMY_POSTS)[0]) {
  return post.content.flatMap((section, sectionIndex) => {
    const heading = section.heading
      ? [
          {
            _key: `heading-${sectionIndex}`,
            _type: "block",
            style: "h2",
            markDefs: [],
            children: [
              {
                _key: `heading-span-${sectionIndex}`,
                _type: "span",
                text: section.heading,
                marks: [],
              },
            ],
          },
        ]
      : [];

    return [
      ...heading,
      ...section.blocks.flatMap((block, blockIndex) =>
        blockToPortable(block, sectionIndex * 100 + blockIndex),
      ),
    ];
  });
}

function postExcerpt(post: (typeof DUMMY_POSTS)[0]) {
  const firstBlock = post.content[0]?.blocks[0];
  if (!firstBlock || firstBlock.type !== "paragraph") return post.metaDesc;
  return textFromSegments(firstBlock.segments).slice(0, 240);
}

function pageDocs(): SanityDoc[] {
  return clean([
    {
      _id: "pageContent-home",
      _type: "pageContent",
      pageKey: "home",
      seo: HOME_PAGE.seo,
      homeHero: HOME_PAGE.hero,
      stats: HOME_PAGE.stats,
      whyPublish: HOME_PAGE.whyPublish,
      servicesOverview: HOME_PAGE.servicesOverview,
      portfolio: HOME_PAGE.portfolio,
      process: HOME_PAGE.process,
      pricing: HOME_PAGE.pricing,
      testimonials: HOME_PAGE.testimonials,
      faq: HOME_PAGE.faq,
      contact: HOME_PAGE.contact,
    },
    {
      _id: "pageContent-services",
      _type: "pageContent",
      pageKey: "services",
      seo: SERVICES_INDEX_PAGE.seo,
      pageHero: pageHero(SERVICES_INDEX_PAGE.hero),
      servicesOverview: SERVICES_INDEX_PAGE.servicesOverview,
    },
    {
      _id: "pageContent-about",
      _type: "pageContent",
      pageKey: "about",
      seo: ABOUT_PAGE.seo,
      pageHero: pageHero(ABOUT_PAGE.hero),
      story: ABOUT_PAGE.story,
      missionVision: ABOUT_PAGE.missionVision,
      strengths: ABOUT_PAGE.strengths,
      aboutProcess: ABOUT_PAGE.process,
    },
    {
      _id: "pageContent-contact",
      _type: "pageContent",
      pageKey: "contact",
      seo: CONTACT_PAGE.seo,
      pageHero: pageHero(CONTACT_PAGE.hero),
      contact: CONTACT_PAGE.contact,
    },
    {
      _id: "pageContent-blogs",
      _type: "pageContent",
      pageKey: "blogs",
      seo: BLOG_INDEX_PAGE.seo,
      pageHero: pageHero(BLOG_INDEX_PAGE.hero),
      archive: BLOG_INDEX_PAGE.archive,
      detail: BLOG_INDEX_PAGE.detail || BLOG_DETAIL_CONTENT,
    },
  ]);
}

function serviceDocs(): SanityDoc[] {
  return SERVICES_DATA.map((service, index) => {
    const { slug, ...rest } = service;
    return clean({
      _id: `service-${slug}`,
      _type: "service",
      ...rest,
      slug: slugField(slug),
      orderRank: index + 1,
    });
  });
}

function supportingDocs() {
  const authors = new Map<string, SanityDoc>();
  const categories = new Map<string, SanityDoc>();

  for (const post of DUMMY_POSTS) {
    const authorName = post.author.name;
    const authorId = `author-${slugify(authorName)}`;
    authors.set(authorId, {
      _id: authorId,
      _type: "author",
      name: authorName,
    });

    for (const category of post.categories) {
      const categoryId = `category-${slugify(category)}`;
      categories.set(categoryId, {
        _id: categoryId,
        _type: "category",
        title: category,
      });
    }
  }

  return [...authors.values(), ...categories.values()];
}

function postDocs(): SanityDoc[] {
  return DUMMY_POSTS.map((post) =>
    clean({
      _id: `post-${post.slug}`,
      _type: "post",
      title: post.title,
      slug: slugField(post.slug),
      excerpt: postExcerpt(post),
      readTime: post.readTime,
      publishedAt: post.publishedAt,
      author: ref(`author-${slugify(post.author.name)}`),
      categories: post.categories.map((category) =>
        ref(`category-${slugify(category)}`),
      ),
      body: postBody(post),
      seo: {
        metaTitle: post.metaTitle,
        metaDescription: post.metaDesc,
      },
    }),
  );
}

function otherDocs(): SanityDoc[] {
  return clean([
    {
      _id: "globalSettings",
      _type: "globalSettings",
      companyName: GLOBAL_SETTINGS.companyName,
      contactPhone: GLOBAL_SETTINGS.contactPhone,
      contactEmail: GLOBAL_SETTINGS.contactEmail,
      address: GLOBAL_SETTINGS.address,
      globalSeo: GLOBAL_SETTINGS.defaultSeo,
      nav: GLOBAL_SETTINGS.nav,
      navLinks: GLOBAL_SETTINGS.navLinks,
      footer: GLOBAL_SETTINGS.footer,
    },
    ...TESTIMONIALS.map((testimonial, index) => ({
      _id: `testimonial-${index + 1}`,
      _type: "testimonial",
      ...testimonial,
      orderRank: index + 1,
    })),
    ...PORTFOLIO_BOOKS.map((book, index) => ({
      _id: `portfolioBook-${book.id}`,
      _type: "portfolioBook",
      title: book.title,
      author: book.author,
      coverUrl: book.coverUrl,
      orderRank: index + 1,
    })),
    ...LEGAL_DATA.map((doc) => ({
      _id: `legalPage-${doc.slug}`,
      _type: "legalPage",
      ...LEGAL_PAGE_CONTENT,
      ...doc,
      slug: slugField(doc.slug),
      seo: doc.seo || {
        metaTitle: `${doc.title} | Ebook Visionary Publishing`,
        metaDescription: doc.intro.slice(0, 157),
      },
    })),
  ]);
}

async function mutateBatch(docs: SanityDoc[]) {
  const endpoint = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}?returnIds=true`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      mutations: docs.map((doc) => ({ createOrReplace: doc })),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Sanity mutation failed (${response.status}): ${body}`);
  }
}

async function main() {
  if (!token) {
    throw new Error(
      "Missing SANITY_API_WRITE_TOKEN. Create a Sanity token with write access and run this script with that env var set.",
    );
  }

  const docs = [
    ...otherDocs(),
    ...pageDocs(),
    ...serviceDocs(),
    ...supportingDocs(),
    ...postDocs(),
  ];

  for (let index = 0; index < docs.length; index += 20) {
    await mutateBatch(docs.slice(index, index + 20));
  }

  console.log(`Seeded ${docs.length} Sanity documents into ${projectId}/${dataset}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
