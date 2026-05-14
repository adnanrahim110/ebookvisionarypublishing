export type TextStat = {
  value: number | string;
  suffix?: string;
  label: string;
  sm?: boolean;
};

export type SectionFeature = {
  icon: string;
  title: string;
  description: string;
  accent?: string;
};

export type ProcessStep = {
  title: string;
  description: string;
  icon: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type TestimonialItem = {
  name: string;
  role: string;
  content: string;
};

export const HOME_SEO = {
  metaTitle: "Ebook Visionary Publishing | Turn Your Manuscript Into A Book",
  metaDescription:
    "Turn your manuscript into a book readers remember with trusted ghostwriting, editing, ebook writing, book marketing, and self-publishing services.",
  metaKeywords: [
    "ebook visionary publishing",
    "book publishing company",
    "ghost writing",
    "book editing",
    "self publishing services",
  ],
};

export const HOME_HERO = {
  label: "Premium Publishing Studio",
  title: "Turn Your Manuscript Into A Book Readers Remember",
  description:
    "Ebook Visionary Publishing is a trusted book publishing company that provides ghost writing, editing, ebook writing, book marketing, and self-publishing services for aspiring and established authors from around the globe.",
  stats: [
    { value: "300+", label: "Books Published" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "11+", label: "Years of Industry Experience" },
  ],
  primaryCta: { label: "Start Publishing", href: "/contact" },
  secondaryCta: { label: "View Our Portfolio", href: "/portfolio" },
};

export const HOME_STATS: TextStat[] = [
  { value: "24/7", label: "Author Support & Assistance" },
  { value: "100%", label: "Rights & Royalty Ownership" },
  {
    value: "Worldwide",
    sm: true,
    label: "Distribution Across Major Platforms",
  },
  {
    value: "All-In-One",
    sm: true,
    label: "Writing, Publishing & Marketing Solutions",
  },
];

export const WHY_PUBLISH = {
  label: "Why Authors Trust Us?",
  heading: "Your Story Deserves The Best Publishing Partner in US",
  description:
    "Whether you're a novice with a fresh concept or a seasoned writer ready for your next book, Ebook Visionary Publishing offers top-tier publishing solutions at every stage to help you translate your ideas into a professionally written, edited, published and marketed book.",
  features: [
    {
      icon: "shield-check",
      title: "No Hidden Cost",
      description:
        "No false packages and no hidden fees. We have transparent, honest and straightforward pricing, so you will always know exactly what you are paying for.",
      accent: "from-primary-500 to-secondary-400",
    },
    {
      icon: "trending-up",
      title: "Specialists For Every Tasks",
      description:
        "Skilled ghost writers, editors, designers, marketers and publishing professionals work on your project, giving each component the attention it deserves.",
      accent: "from-secondary-400 to-primary-400",
    },
    {
      icon: "heart",
      title: "Global Distribution",
      description:
        "We publish and distribute your book across major platforms, including Amazon Kindle, Barnes & Noble, Apple Books, and other global marketplaces, to ensure you get maximum visibility and reach.",
      accent: "from-primary-600 to-secondary-500",
    },
  ],
};

export const SERVICES_OVERVIEW_CONTENT = {
  label: "Our Expertise",
  heading: "Let’s Help You Publish Your First Book",
  description:
    "Whether you have a rough idea or a completed manuscript, we can help develop, refine and publish books that look professional from the first page.",
};

export const PORTFOLIO_SECTION = {
  label: "Our Work",
  heading: "Book We've Proudly Worked On",
  description:
    "Explore books that we have had a professional role in writing, editing, formatting, and publishing.",
};

export const PORTFOLIO_BOOKS = [
  {
    id: "1",
    title: "The Last Horizon",
    author: "Sarah Mitchell",
    coverUrl: "/images/books/cover-1.png",
  },
  {
    id: "2",
    title: "Beyond The Pages",
    author: "James Carter",
    coverUrl: "/images/books/cover-2.png",
  },
  {
    id: "3",
    title: "Whispers of Ink",
    author: "Elena Woods",
    coverUrl: "/images/books/cover-3.png",
  },
  {
    id: "4",
    title: "Rising Tides",
    author: "Marcus Hall",
    coverUrl: "/images/books/cover-4.png",
  },
  {
    id: "5",
    title: "Silent Echoes",
    author: "Diana Cross",
    coverUrl: "/images/books/cover-5.png",
  },
  {
    id: "6",
    title: "The Garden Path",
    author: "Thomas Reed",
    coverUrl: "/images/books/cover-6.png",
  },
  {
    id: "7",
    title: "Paper Hearts",
    author: "Lily Chen",
    coverUrl: "/images/books/cover-7.png",
  },
  {
    id: "8",
    title: "Neon Nights",
    author: "Jake Stone",
    coverUrl: "/images/books/cover-8.png",
  },
];

export const HOME_PROCESS = {
  label: "How It Works?",
  heading: "Our Publishing Process",
  steps: [
    {
      title: "Discover the vision",
      description:
        "We first find out your story, goals, reader, and publishing needs to lay a foundation for your book.",
      icon: "lightbulb",
    },
    {
      title: "Create the roadmap",
      description:
        "We plan, organize and guide your content, structure and direction in a clear and straightforward way to keep your project on track and moving forward.",
      icon: "map",
    },
    {
      title: "Writing begins",
      description:
        "We assist you in turning your ideas into a professionally written, engaging book through ghostwriting or manuscript support.",
      icon: "pen-tool",
    },
    {
      title: "Refine & Perfect",
      description:
        "Your manuscript is professionally edited, proofread and formatted to give every page a polished, publication-ready feel.",
      icon: "sparkles",
    },
    {
      title: "Ready to publish",
      description:
        "After finalization, we get your book ready for publishing and worldwide distribution through the major publishing platforms.",
      icon: "rocket",
    },
  ],
};

export const PRICING_SECTION = {
  label: "Publishing Made Simple",
  heading: "Get Ready To Publish On Your Own Terms",
  paragraphs: [
    "The world of publishing is more free for authors than ever before and Ebook Visionary Publishing helps you fully take advantage of it. We help you develop your ideas into a book, with the professional guidance, creativity and publishing expertise you need to reach readers around the world.",
    "If you're publishing your first ebook, printing your first book, or establishing and promoting your author brand, our team helps to keep you on track and on the path you want to take while maintaining your vision.",
  ],
  offerHeading: "What you can expect:",
  offers: [
    "Professional support from concept to publication",
    "Completed ownership of your book and royalties",
    "Expert editing, formatting, and cover designs",
    "Global distribution across leading publishing platforms",
    "Flexible publishing and marketing solutions tailored to your publishing goals",
  ],
  image: {
    src: "/images/author-publishing.png",
    alt: "Author holding her published book",
  },
  badge: {
    value: "100%",
    title: "Royalty Ownership",
    description: "You keep all your earnings",
  },
  cta: { label: "Start Your Journey", href: "/contact" },
};

export const TESTIMONIALS_SECTION = {
  label: "What Our Authors Have To Say?",
  heading: "Why Authors Love Working With Us.",
};

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Sarah Mitchell",
    role: "Author",
    content:
      "Ebook Visionary Publishing made everything seem easy from start to finish. The team was always professional and really seemed committed to my book.",
  },
  {
    name: "Daniel Carter",
    role: "Author",
    content:
      "I had an idea for a book for years, but I just couldn't figure out how to get started. The ghostwriting and publishing team brought my dream to life.",
  },
  {
    name: "Olivia Bennett",
    role: "Author",
    content:
      "What impressed me the most about the experience was the level of quality and the transparency involved. Everything was smooth, and the result was really amazing.",
  },
];

export const FAQ_SECTION = {
  label: "FAQ",
  heading: "Got Questions?",
};

export const FAQS: FaqItem[] = [
  {
    question: "Do I keep the rights to my book?",
    answer:
      "Absolutely. You retain full ownership of your book, royalties, and creative rights. We provide the publishing support while the work remains yours.",
  },
  {
    question: "How long does the publishing process take?",
    answer:
      "The timeline varies depending on writing, editing, design, and publishing needs. Most projects move forward in a clear staged process after consultation.",
  },
  {
    question: "Do you offer marketing services?",
    answer:
      "Yes. We provide book marketing, author website support, platform guidance, and add-on visibility solutions tailored to your goals.",
  },
  {
    question: "What genres do you publish?",
    answer:
      "We support fiction, nonfiction, memoirs, business books, self-help, children's books, religious titles, and more.",
  },
];

export const CONTACT_SECTION = {
  label: "Let's Talk About Your Book",
  heading: "Got any questions?",
  headingEmphasis: "We're happy to answer.",
  description:
    "We're happy to answer questions about ghostwriting, editing, publishing, book marketing or custom publishing solutions.",
  infoHeading: "Contact Information",
  hoursLabel: "Operating Hours",
  hours: "Mon - Fri, 9 AM - 6 PM CST",
  formHeading: "Send us your query",
  formDescription:
    "Tell us a little about your book, the services you're looking for and where you are in the publishing process. Our team will review your inquiry and get back to you promptly.",
  fullNameLabel: "Full Name",
  emailLabel: "Email Address",
  phoneLabel: "Phone Number",
  serviceLabel: "Service of Interest",
  messageLabel: "Tell us about your manuscript or project...",
  privacyText:
    "By submitting, you agree to our privacy policy. We'll never share your information.",
  submitLabel: "Send Message",
};

export const SERVICE_OPTIONS = [
  { label: "Full Publishing Package", value: "publishing" },
  { label: "Editing & Proofreading", value: "editing" },
  { label: "Cover Design & Formatting", value: "design" },
  { label: "Book Marketing", value: "marketing" },
  { label: "Ghostwriting", value: "ghostwriting" },
  { label: "Other / Not Sure", value: "other" },
];

export const DEFAULT_CTA_BANNER = {
  label: "Start Your Journey",
  title: "Ready to share your",
  highlight: "story",
  suffix: "with the world?",
  description:
    "Join hundreds of successful authors who trusted us to bring their books to life. Your masterpiece deserves premium treatment.",
  primaryCta: { label: "Get a Free Consultation", href: "/contact" },
  secondaryCta: { label: "Our Services", href: "/services" },
  stats: [
    { value: "1,200+", label: "Books Published" },
    { value: "98%", label: "Satisfaction" },
  ],
};

export const HOME_PAGE = {
  seo: HOME_SEO,
  hero: HOME_HERO,
  stats: HOME_STATS,
  whyPublish: WHY_PUBLISH,
  servicesOverview: SERVICES_OVERVIEW_CONTENT,
  portfolio: PORTFOLIO_SECTION,
  process: HOME_PROCESS,
  pricing: PRICING_SECTION,
  testimonials: TESTIMONIALS_SECTION,
  faq: { ...FAQ_SECTION, items: FAQS },
  contact: CONTACT_SECTION,
};
