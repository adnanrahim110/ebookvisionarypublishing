export type ContentSegment =
  | { type: "text"; text: string }
  | { type: "bold"; text: string }
  | { type: "italic"; text: string }
  | { type: "link"; text: string; href: string };

export type ContentBlock =
  | { type: "paragraph"; segments: ContentSegment[] }
  | { type: "blockquote"; text: string; author?: string }
  | { type: "list"; items: string[] };

export type ContentSection = {
  heading?: string;
  blocks: ContentBlock[];
};

export type DummyPost = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  categories: string[];
  readTime: number;
  metaTitle: string;
  metaDesc: string;
  mainImage: { asset: { url: string } };
  author: { name: string };
  content: ContentSection[];
};

export const DUMMY_POSTS: DummyPost[] = [
  {
    _id: "dummy-1",
    title: "The Future of Digital Publishing: Trends to Watch in 2026",
    slug: "future-of-digital-publishing",
    publishedAt: new Date().toISOString(),
    categories: ["Industry Trends"],
    readTime: 6,
    metaTitle: "Future of Digital Publishing: 2026 Trends | EVP",
    metaDesc: "Explore the most critical trends in digital publishing for 2026, from algorithmic curation to multi-format distribution.",
    mainImage: {
      asset: {
        url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop",
      },
    },
    author: { name: "Editorial Team" },
    content: [
      {
        blocks: [
          {
            type: "paragraph",
            segments: [
              { type: "text", text: "The publishing landscape is undergoing a monumental shift. As we navigate the complex intersection of traditional editorial values and modern distribution algorithms, the path forward requires both a deep respect for the craft of writing and an " },
              { type: "bold", text: "agile approach to digital marketing" },
              { type: "text", text: ". The gatekeepers of the past are being replaced by the algorithms of the present." }
            ],
          },
        ],
      },
      {
        heading: "The Rise of Algorithmic Curation",
        blocks: [
          {
            type: "paragraph",
            segments: [
              { type: "text", text: "Authors can no longer rely solely on physical bookstores for discovery. With readers spending upwards of four hours a day on digital platforms, the algorithmic curation of content has become the primary driver of book sales. This means understanding metadata, SEO, and engagement metrics is just as important as mastering narrative structure. You must " },
              { type: "italic", text: "optimize your digital footprint" },
              { type: "text", text: "." }
            ],
          },
          {
            type: "paragraph",
            segments: [
              { type: "text", text: "In our recent comprehensive guide on " },
              { type: "link", text: "Building a Marketing Campaign", href: "/blogs/how-to-build-marketing-campaign" },
              { type: "text", text: ", we discussed how early audience building is essential. This is even more crucial in 2026 as recommendation engines increasingly reward established engagement over raw advertising spend." }
            ],
          },
          {
            type: "blockquote",
            text: "The future belongs to the author who understands that a book is not just a product, but the beginning of a community.",
            author: "The Editorial Desk"
          }
        ],
      },
      {
        heading: "Adapting to New Mediums",
        blocks: [
          {
            type: "paragraph",
            segments: [
              { type: "text", text: "While the mediums change, the fundamental human desire for compelling storytelling remains constant. In 2026, the absolute winners will be those who use new technology not to replace the editorial process, but to " },
              { type: "italic", text: "amplify their unique voices" },
              { type: "text", text: " on a global scale. Consider multi-format publishing:" }
            ],
          },
          {
            type: "list",
            items: [
              "Releasing an immersive audiobook alongside the text.",
              "Creating interactive e-book experiences.",
              "Designing stunning, premium physical hardcovers to capture the collector demographic."
            ]
          }
        ]
      }
    ],
  },
  {
    _id: "dummy-2",
    title: "How to Build a Marketing Campaign for Your First Book",
    slug: "how-to-build-marketing-campaign",
    publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    categories: ["Marketing"],
    readTime: 8,
    metaTitle: "Marketing Campaign for Your First Book | EVP",
    metaDesc: "Learn the step-by-step process of building a pre-launch audience, securing reviews, and executing a successful book launch.",
    mainImage: {
      asset: {
        url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop",
      },
    },
    author: { name: "Sarah Jenkins" },
    content: [
      {
        blocks: [
          {
            type: "paragraph",
            segments: [
              { type: "text", text: "Launching your first book can feel like shouting into a void. Without a highly strategic marketing campaign, even the most beautifully written manuscript will struggle to find its audience. Hope is not a strategy; " },
              { type: "bold", text: "action is" },
              { type: "text", text: "." }
            ]
          }
        ]
      },
      {
        heading: "Phase 1: Pre-Launch Awareness",
        blocks: [
          {
            type: "paragraph",
            segments: [
              { type: "text", text: "Months before your publication date, your focus should be entirely on " },
              { type: "bold", text: "audience building" },
              { type: "text", text: ". This isn't about explicitly asking for sales; it's about providing immense value upfront. Share your writing process, discuss your extensive research, and offer early glimpses into the immersive world you are building." }
            ]
          },
          {
            type: "paragraph",
            segments: [
              { type: "text", text: "Some of the highest ROI strategies include:" }
            ]
          },
          {
            type: "list",
            items: [
              "Developing a high-value lead magnet (like a prequel short story) to rapidly build your mailing list.",
              "Securing podcast interviews in your specific niche to build authority and trust.",
              "Sending advanced reader copies (ARCs) to trusted reviewers, bloggers, and influencers."
            ]
          }
        ]
      },
      {
        heading: "Leveraging Cross-Promotion",
        blocks: [
          {
            type: "paragraph",
            segments: [
              { type: "text", text: "Don't do it alone. Partner with other authors in your genre. For more insights on choosing the right path for your publication, see our comprehensive breakdown on " },
              { type: "link", text: "Self-Publishing vs Traditional Publishing", href: "/blogs/self-publishing-vs-traditional" },
              { type: "text", text: "." }
            ]
          },
          {
            type: "paragraph",
            segments: [
              { type: "text", text: "Remember, a successful launch isn't built in a single day; it's the culmination of months of consistent, authentic relationship building. " },
              { type: "italic", text: "Patience is your greatest asset." }
            ]
          }
        ]
      }
    ]
  },
  {
    _id: "dummy-3",
    title: "Self-Publishing vs Traditional: Which Path is Right for You?",
    slug: "self-publishing-vs-traditional",
    publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    categories: ["Publishing Advice"],
    readTime: 10,
    metaTitle: "Self-Publishing vs Traditional Publishing | EVP",
    metaDesc: "A comprehensive breakdown of the advantages, disadvantages, and mindsets required for both self-publishing and traditional publishing.",
    mainImage: {
      asset: {
        url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200&auto=format&fit=crop",
      },
    },
    author: { name: "Editorial Team" },
    content: [
      {
        blocks: [
          {
            type: "paragraph",
            segments: [
              { type: "text", text: "The debate between self-publishing and traditional publishing is often incorrectly framed as a zero-sum game. In reality, both paths offer distinct advantages and require entirely different entrepreneurial mindsets." }
            ]
          }
        ]
      },
      {
        heading: "The Traditional Route",
        blocks: [
          {
            type: "paragraph",
            segments: [
              { type: "text", text: "Traditional publishing offers prestige, rigorous editorial support, and physical bookstore distribution. It is often viewed as the ultimate path of validation. However, it requires immense patience, thick skin for countless rejections, and a willingness to " },
              { type: "bold", text: "relinquish significant control" },
              { type: "text", text: " over the final product—including cover design and release schedules." }
            ]
          }
        ]
      },
      {
        heading: "The Indie Route",
        blocks: [
          {
            type: "paragraph",
            segments: [
              { type: "text", text: "Self-publishing is the path of the " },
              { type: "bold", text: "entrepreneur" },
              { type: "text", text: ". It offers complete creative control, rapid time-to-market, and significantly higher royalty rates (often up to 70%). The massive trade-off? " },
              { type: "italic", text: "You are responsible for absolutely everything" },
              { type: "text", text: ". You must personally hire developmental editors, cover designers, and formatters." }
            ]
          },
          {
            type: "blockquote",
            text: "Choosing indie publishing means you aren't just an author; you are the CEO of a media company.",
            author: "EVP Editorial"
          },
          {
            type: "paragraph",
            segments: [
              { type: "text", text: "If you choose to self-publish, you must ensure your manuscript is flawless. Check out our " },
              { type: "link", text: "Editing Masterclass", href: "/blogs/editing-masterclass" },
              { type: "text", text: " to ensure your book meets traditional industry standards before hitting publish." }
            ]
          }
        ]
      }
    ]
  },
  {
    _id: "dummy-4",
    title: "Editing Masterclass: Polishing Your Manuscript to Perfection",
    slug: "editing-masterclass",
    publishedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    categories: ["Editing"],
    readTime: 12,
    metaTitle: "Editing Masterclass: Manuscript Polish | EVP",
    metaDesc: "Discover the three distinct phases of editing—developmental, line, and copy—to turn your rough draft into a masterpiece.",
    mainImage: {
      asset: {
        url: "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=1200&auto=format&fit=crop",
      },
    },
    author: { name: "Michael Roberts" },
    content: [
      {
        blocks: [
          {
            type: "paragraph",
            segments: [
              { type: "text", text: "Writing is discovering the story; editing is making that story decipherable to others. The first draft is entirely for you, but the revisions are " },
              { type: "italic", text: "strictly for your reader" },
              { type: "text", text: "." }
            ]
          }
        ]
      },
      {
        heading: "The Three Distinct Phases of Editing",
        blocks: [
          {
            type: "paragraph",
            segments: [
              { type: "text", text: "Never try to fix commas while you are fixing plot holes. Proper editing requires distinct, compartmentalized phases:" }
            ]
          },
          {
            type: "list",
            items: [
              "Developmental Editing: Looking at the macro level. Are the character arcs earned? Does the pacing sag in the middle? Is the climax satisfying and inevitable?",
              "Line Editing: Looking at the prose itself. Are the sentences melodic? Are you using active verbs? Are you showing rather than telling?",
              "Copy Editing: Looking at the rules. Grammar, syntax, consistency, and strict formatting."
            ]
          }
        ]
      },
      {
        heading: "The Power of Distance",
        blocks: [
          {
            type: "paragraph",
            segments: [
              { type: "text", text: "Once you finish your manuscript, put it in a drawer for at least two weeks. Coming back with fresh eyes allows you to see the " },
              { type: "bold", text: "reality of what is on the page" },
              { type: "text", text: ", rather than what you intended to put there." }
            ]
          },
          {
            type: "paragraph",
            segments: [
              { type: "text", text: "Once polished, your book is ready for the next phase. See our guide on the " },
              { type: "link", text: "Future of Digital Publishing", href: "/blogs/future-of-digital-publishing" },
              { type: "text", text: " for where to take your manuscript next." }
            ]
          }
        ]
      }
    ]
  }
];
