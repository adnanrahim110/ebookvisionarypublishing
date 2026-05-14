import { BLOG_ARCHIVE_CONTENT, BLOG_DETAIL_CONTENT } from "./blogs";
import { CONTACT_SECTION } from "./home";

export const SERVICES_INDEX_PAGE = {
  seo: {
    metaTitle: "Services | Ebook Visionary Publishing",
    metaDescription:
      "Explore ghostwriting, book editing, formatting, proofreading, author websites, cover design, illustration, and publishing services.",
  },
  hero: {
    title: "Publishing Services For Every Author.",
    subtitle:
      "From first idea to worldwide distribution, choose the support that fits your manuscript, timeline, and publishing goals.",
    label: "Services",
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Services" }],
  },
  servicesOverview: {
    label: "Our Services",
    heading: "Choose the publishing support your book needs.",
    description:
      "Every service can stand alone or combine into a complete publishing path, with expert help from manuscript development through launch.",
  },
};

export const ABOUT_PAGE = {
  seo: {
    metaTitle: "About Us | Ebook Visionary Publishing",
    metaDescription:
      "Learn about Ebook Visionary Publishing, our premium editorial approach, and how we empower authors to share their stories with the world.",
  },
  hero: {
    title: "Get to Know Ebook Visionary Publishing.",
    subtitle:
      "Ebook Visionary is where great books begin and successful authors are made. We deliver everything you need to publish with confidence.",
    label: "About Us",
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "About Us" }],
  },
  story: {
    label: "Our Story",
    heading: "Where Great Books Begin.",
    paragraphs: [
      "Ebook Visionary is where great books begin and successful authors are made. We deliver everything you need to publish with confidence. Your book deserves to look as good as it reads, and we make sure it does, every single time.",
      "That's why we specialize in ghostwriting, book editing, professional proofreading, custom book cover design, detailed book illustration, and building author websites that enhance your brand and grow your audience.",
      "We strive to build lasting partnerships with our authors, helping them achieve their dreams and reach readers worldwide. From the first draft to the bestseller list, we are with you every step of the way.",
    ],
    quote:
      "Every author deserves a publishing partner who treats their story with the same passion they wrote it with.",
    quoteAuthor: "Ebook Visionary Publishing",
    quoteRole: "Our founding philosophy",
    stats: [
      { value: "1,200+", label: "Books Published" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "10+", label: "Years of Excellence" },
    ],
    beliefLabel: "What We Believe",
    beliefHeading: "Publishing isn't just our business - it's our craft.",
    beliefDescription:
      "We approach every project as a partnership, not a transaction. Your story, your voice, your legacy - polished and published with meticulous care.",
    ctaHeading: "Ready to begin your publishing journey?",
    ctaDescription:
      "Let us help you transform your manuscript into a beautifully published book the world will love.",
    primaryCta: { label: "Our Services", href: "/services" },
    secondaryCta: { label: "Get In Touch", href: "/contact" },
  },
  missionVision: {
    label: "What Drives Us",
    heading: "Purpose & Perspective.",
    description:
      "The foundation of everything we do - clarity of purpose, boldness of vision.",
    panels: [
      {
        num: "01",
        label: "Our Mission",
        heading: "Empowering Authors to Publish With Excellence.",
        body: "At Ebook Visionary, our mission is to empower authors by providing top-tier publishing services that turn creative visions into reality. We are dedicated to excellence, innovation, and integrity, ensuring every book we touch meets the highest standards of quality. Our goal is to simplify the publishing process, making it accessible and rewarding for writers of all backgrounds.",
        gradient: "from-amber-700 via-amber-600 to-yellow-600",
        offsetClass: "lg:mt-0",
      },
      {
        num: "02",
        label: "Our Vision",
        heading: "Redefining the Future of Independent Publishing.",
        body: "Our vision is to be the global leader in independent publishing, known for our unwavering commitment to author success and literary excellence. We envision a world where every story has the opportunity to be told and every writer can find their audience. By leveraging cutting-edge technology and a team of passionate experts, we aim to redefine the publishing landscape.",
        gradient: "from-[#064e3b] via-[#047857] to-[#059669]",
        offsetClass: "lg:mt-20",
      },
    ],
  },
  strengths: {
    label: "Why Choose Us",
    heading: "What Sets Us Apart.",
    description:
      "We combine creative excellence with affordable pricing to deliver publishing solutions that truly make a difference.",
    items: [
      {
        icon: "award",
        title: "Best Seller Ghostwriters",
        description:
          "Our top-notch ghostwriters work tirelessly to deliver a best-selling novel, crafting narratives that captivate readers from the first page to the last.",
      },
      {
        icon: "users",
        title: "Experienced Professionals",
        description:
          "With experienced professionals and over a decade of expertise in digital publishing, we bring unmatched skill to every project we undertake.",
      },
      {
        icon: "book-open",
        title: "1200+ Books Published",
        description:
          "We have successfully released more than 1,200 books on renowned platforms including Amazon, Barnes & Noble, and Apple Books worldwide.",
      },
      {
        icon: "dollar-sign",
        title: "Affordability Is Our Strength",
        description:
          "We offer different affordable packages with absolutely no compromise on quality, making premium publishing services accessible to every author.",
      },
    ],
  },
  process: {
    label: "Our Work In Action",
    heading: "How We Bring Your Book to Life.",
    steps: [
      {
        num: "01",
        title: "Connect With Us",
        description:
          "The process begins with authors reaching out to us. We understand their needs and requirements for the book, ensuring we align perfectly with your creative vision.",
        icon: "message-square",
        accent: "#0ea5e9",
      },
      {
        num: "02",
        title: "Manuscript Submission",
        description:
          "After understanding the requirements, authors submit their manuscript for our professional team to review, analyze, and prepare a comprehensive strategy.",
        icon: "file-text",
        accent: "#8b5cf6",
      },
      {
        num: "03",
        title: "Professional Touch",
        description:
          "Our experienced team applies their professional touch - whether it's editing, formatting, or cover design - to ensure the book meets the highest quality standards.",
        icon: "wand-2",
        accent: "#f59e0b",
      },
      {
        num: "04",
        title: "Final Launch",
        description:
          "Once the book is polished and ready, we help authors launch their book on various platforms, ensuring it reaches their target audience with maximum impact.",
        icon: "rocket",
        accent: "#10b981",
      },
    ],
  },
};

export const CONTACT_PAGE = {
  seo: {
    metaTitle: "Contact Us | Ebook Visionary Publishing",
    metaDescription:
      "Get in touch with Ebook Visionary Publishing. Reach out for a free consultation, send us an inquiry, or visit our office in Dallas, TX.",
  },
  hero: {
    title: "Let's Bring Your Vision to Life.",
    subtitle:
      "Whether you have a question, need a quote, or want to discuss your manuscript, our team is here to help.",
    label: "Contact Us",
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Contact Us" }],
  },
  contact: CONTACT_SECTION,
};

export const BLOG_INDEX_PAGE = {
  seo: {
    metaTitle: "Blog | Ebook Visionary Publishing",
    metaDescription:
      "Insights, industry news, and editorial advice from our publishing experts.",
  },
  hero: {
    title: "Our Blog",
    subtitle:
      "Dive into the world of publishing with our editorial insights, marketing tips, and success stories.",
    label: "Blog",
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Blog" }],
  },
  archive: BLOG_ARCHIVE_CONTENT,
  detail: BLOG_DETAIL_CONTENT,
};
