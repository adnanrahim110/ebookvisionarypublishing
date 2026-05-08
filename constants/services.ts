import { ServiceData } from "@/components/services/types";

export const SERVICES_DATA: ServiceData[] = [
  {
    slug: "ghostwriting",
    title: "Ghostwriting",
    subtitle: "Capture someone's real-life journey with dignity, accuracy, and storytelling finesse.",
    icon: "feather",
    overview: "Everyone has a story worth telling, but not everyone has the time or the words to tell it. Our professional ghostwriting service bridges that gap. We transform your ideas, experiences, and expertise into a beautifully crafted manuscript. Whether it is a riveting memoir, a thought-provoking business book, or an imaginative fiction novel, our industry-veteran ghostwriters adapt seamlessly to your voice, ensuring the final work is authentically yours. You maintain complete creative control and 100% of the authorship rights.",
    features: [
      { title: "Voice Matching", description: "Our writers study your tone, cadence, and style to ensure the book sounds exactly like you." },
      { title: "Extensive Research", description: "We conduct in-depth interviews and background research to enrich your narrative and ensure total accuracy." },
      { title: "Complete Confidentiality", description: "Your secrets are safe. We operate under strict Non-Disclosure Agreements, guaranteeing your sole authorship." },
      { title: "Iterative Feedback", description: "You review every chapter as it's written, allowing for continuous refinement and alignment with your vision." },
      { title: "Genre Expertise", description: "We match you with a writer who specializes in your specific genre, bringing deep industry knowledge to your project." },
      { title: "Publish-Ready Delivery", description: "The final manuscript is rigorously edited and formatted, ready to be sent to publishers or self-published." }
    ],
    benefits: [
      "Save hundreds of hours of writing time",
      "Overcome writer's block instantly",
      "Leverage the skills of a bestselling author",
      "Maintain 100% of your royalties and rights",
      "Guaranteed confidentiality and NDA protection",
      "A structured, stress-free creative process"
    ],
    stats: [
      { value: 500, suffix: "+", label: "Manuscripts Ghostwritten" },
      { value: 99, suffix: "%", label: "Client Satisfaction" },
      { value: 15, suffix: "+", label: "Bestsellers" },
      { value: 100, suffix: "%", label: "Confidentiality" }
    ],
    process: [
      { title: "Initial Consultation", description: "We discuss your vision, goals, target audience, and the core message you want to convey.", icon: "lightbulb" },
      { title: "Outline & Roadmap", description: "We create a detailed chapter-by-chapter outline to structure your narrative effectively.", icon: "map" },
      { title: "Interviews & Drafting", description: "Through guided interviews, we extract your insights and begin drafting the manuscript.", icon: "pen-tool" },
      { title: "Review & Refine", description: "You review the drafts, providing feedback to ensure the tone and content align perfectly.", icon: "sparkles" },
      { title: "Final Polish", description: "The completed manuscript undergoes rigorous editing for flow, clarity, and impact.", icon: "rocket" }
    ],
    faqs: [
      { question: "Will anyone know I used a ghostwriter?", answer: "No. We sign a strict Non-Disclosure Agreement (NDA). You are listed as the sole author, and we claim no credit." },
      { question: "How involved do I need to be?", answer: "Your involvement is entirely up to you. Most clients participate in weekly or bi-weekly interview sessions, while others provide rough notes and let us take the wheel." },
      { question: "Who owns the copyright?", answer: "You own 100% of the copyright, royalties, and all associated rights to the book." },
      { question: "How long does it take?", answer: "Depending on the length and complexity of the book, a full-length manuscript typically takes 4 to 6 months to complete." }
    ],
    cta: {
      title: "Ready to turn your ideas into a",
      highlight: "bestselling book?",
      description: "Don't let your story go untold. Partner with our elite ghostwriters and watch your vision come to life on the page."
    }
  },
  {
    slug: "book-editing",
    title: "Book Editing",
    subtitle: "Refining your words to perfection, delivering clarity, polish, and impact on every page.",
    icon: "edit-3",
    overview: "Even the greatest authors need a brilliant editor. Our comprehensive book editing services are designed to elevate your manuscript from a rough draft to a publishing masterpiece. We don't just fix typos; we delve deep into the structure, pacing, character development, and thematic resonance of your work. Our team of seasoned editors treats your voice with respect, providing constructive, actionable feedback that enhances your story while preserving your unique stylistic flair.",
    features: [
      { title: "Developmental Editing", description: "Addressing big-picture elements like plot holes, pacing issues, character arcs, and thematic consistency." },
      { title: "Copy Editing", description: "Fine-tuning sentences for flow, clarity, word choice, and syntactic consistency." },
      { title: "Line Editing", description: "Polishing your prose line-by-line to enhance style, rhythm, and readability." },
      { title: "Editorial Assessment", description: "A comprehensive critique of your manuscript's strengths and areas for improvement before deep editing begins." },
      { title: "Fact-Checking", description: "Rigorous verification of historical, technical, or factual claims within your non-fiction or historical fiction work." },
      { title: "Formatting Compliance", description: "Ensuring your manuscript meets industry-standard formatting guidelines for submission." }
    ],
    benefits: [
      "Elevate your unique writing style",
      "Eliminate plot holes and narrative inconsistencies",
      "Enhance reader engagement and retention",
      "Prepare your manuscript for traditional publishing",
      "Learn and grow as an author through expert feedback",
      "Ensure grammatical and structural perfection"
    ],
    stats: [
      { value: 2, suffix: "M+", label: "Words Edited Annually" },
      { value: 300, suffix: "+", label: "Authors Assisted" },
      { value: 3, suffix: "x", label: "Higher Acceptance Rate" },
      { value: 10, suffix: "Y+", label: "Industry Experience" }
    ],
    process: [
      { title: "Manuscript Evaluation", description: "We review your manuscript to determine the level of editing required.", icon: "lightbulb" },
      { title: "Structural Review", description: "We analyze the overarching narrative, focusing on pacing, plot, and character development.", icon: "map" },
      { title: "Line-by-Line Polish", description: "Our editors comb through your prose, refining syntax, word choice, and flow.", icon: "pen-tool" },
      { title: "Author Revisions", description: "You review our suggested changes and feedback, maintaining ultimate control over your work.", icon: "sparkles" },
      { title: "Final Proofing", description: "A final pass to catch any lingering typos, grammatical errors, or inconsistencies.", icon: "rocket" }
    ],
    faqs: [
      { question: "What is the difference between copy editing and developmental editing?", answer: "Developmental editing focuses on the 'big picture'—plot, pacing, and structure. Copy editing focuses on the mechanics—grammar, spelling, and sentence flow." },
      { question: "Will editing change my unique voice?", answer: "Absolutely not. Our editors are trained to enhance your voice, not replace it. We suggest improvements that make your writing clearer while preserving your style." },
      { question: "Do I have to accept all your changes?", answer: "No. All edits are provided as suggestions using 'Track Changes'. You have the final say on what stays and what goes." },
      { question: "How do you handle specialized or technical non-fiction?", answer: "We assign your manuscript to an editor with a background or expertise in your specific subject matter to ensure accuracy and appropriate terminology." }
    ],
    cta: {
      title: "Give your manuscript the",
      highlight: "professional polish",
      description: "it deserves. Connect with our expert editors and elevate your writing today."
    }
  },
  {
    slug: "book-formatting",
    title: "Book Formatting",
    subtitle: "Clean, professional designs that elevate your book's presentation from layout to typography.",
    icon: "align-left",
    overview: "A great book must not only read well—it must look immaculate. Readers subconsciously judge a book's quality by its interior layout. Our book formatting and typesetting services ensure your manuscript meets the highest traditional publishing standards. From selecting the perfect typeface to designing beautiful chapter headers, we create a visually engaging reading experience for both print and digital formats. We guarantee compliance with Amazon KDP, IngramSpark, Apple Books, and all major distributors.",
    features: [
      { title: "Print Layout Design", description: "Custom interior design optimized for print-on-demand and traditional offset printing." },
      { title: "eBook Conversion", description: "Flawless reflowable formatting for Kindle (MOBI/KPF), Apple Books (ePub), and other digital platforms." },
      { title: "Custom Typography", description: "Carefully selected fonts and styling that match your book's specific genre and tone." },
      { title: "Dynamic Elements", description: "Professional formatting for drop caps, ornamental breaks, bulleted lists, and blockquotes." },
      { title: "Image Integration", description: "High-resolution embedding of illustrations, charts, and graphs within the text flow." },
      { title: "Front & Back Matter", description: "Expert structuring of title pages, copyright info, dedications, table of contents, and indexes." }
    ],
    benefits: [
      "Guaranteed industry-standard compliance",
      "Beautiful, readable interiors that reduce eye strain",
      "Seamless digital reading experience across devices",
      "Avoid rejection from major distribution platforms",
      "Enhance the perceived value of your book",
      "Ready-to-upload files (PDF and ePub)"
    ],
    stats: [
      { value: 1000, suffix: "+", label: "Books Formatted" },
      { value: 100, suffix: "%", label: "Platform Acceptance" },
      { value: 48, suffix: "Hr", label: "Average Turnaround" },
      { value: 5, suffix: "Star", label: "Reader Experience" }
    ],
    process: [
      { title: "Manuscript Preparation", description: "We clean your raw manuscript, removing hidden formatting artifacts and extra spaces.", icon: "lightbulb" },
      { title: "Style Selection", description: "We collaborate with you to choose fonts, margins, and stylistic elements that fit your genre.", icon: "map" },
      { title: "Typesetting", description: "We flow your text into the chosen layout, ensuring perfect pagination and eliminating orphans/widows.", icon: "pen-tool" },
      { title: "Digital Conversion", description: "We create clean, reflowable ePub files optimized for all modern e-readers.", icon: "sparkles" },
      { title: "Final Review", description: "We provide proofs for your approval, making any necessary adjustments before delivering the final files.", icon: "rocket" }
    ],
    faqs: [
      { question: "What file formats do you deliver?", answer: "We deliver print-ready PDFs for paperback/hardcover, and validated ePub files for digital distribution." },
      { question: "Can you format books with a lot of images or tables?", answer: "Yes. We handle complex formatting, including cookbooks, textbooks, and heavily illustrated children's books." },
      { question: "Will my eBook look exactly like the print book?", answer: "eBooks use 'reflowable text' so readers can change the font size, meaning page numbers don't exist. However, we ensure the stylistic elements (chapter headers, scene breaks) remain consistent across both versions." },
      { question: "What happens if I find a typo after formatting?", answer: "We offer a round of minor revisions to fix any last-minute typos you discover after the formatting phase." }
    ],
    cta: {
      title: "Ensure your book makes a",
      highlight: "flawless first impression.",
      description: "Get industry-standard formatting for print and digital platforms."
    }
  },
  {
    slug: "proofreading",
    title: "Proofreading",
    subtitle: "Careful attention to tone, clarity, pacing, and grammar, revising each section until smooth.",
    icon: "check-circle",
    overview: "Proofreading is the final, critical line of defense before your book goes out into the world. Even the most thoroughly edited manuscripts can harbor elusive typos, misplaced commas, or formatting glitches. Our meticulous proofreaders possess an eagle-eyed attention to detail. We scrutinize every word, punctuation mark, and page layout to ensure absolute perfection. Don't let a minor error distract your readers or lead to negative reviews—let us ensure your final product is immaculate.",
    features: [
      { title: "Grammar & Syntax", description: "Correcting subtle errors in grammar, punctuation, spelling, and capitalization." },
      { title: "Consistency Checks", description: "Ensuring uniformity in character names, timelines, hyphenation, and regional spellings." },
      { title: "Formatting Verification", description: "Checking for consistency in typography, spacing, indentation, and chapter headings." },
      { title: "Homophone Correction", description: "Catching commonly confused words (e.g., their/there, affect/effect) that spellcheckers miss." },
      { title: "Readability Polish", description: "Smoothing out awkward phrasing while maintaining the author's voice." },
      { title: "Final Pass Precision", description: "The definitive final check performed on the formatted, print-ready proof." }
    ],
    benefits: [
      "Publish an error-free, professional manuscript",
      "Protect your credibility and author brand",
      "Prevent negative reviews caused by typos",
      "Peace of mind before hitting 'Publish'",
      "Enhanced reader immersion without distractions",
      "Adherence to specific style guides (Chicago, APA, etc.)"
    ],
    stats: [
      { value: 5, suffix: "M+", label: "Pages Proofread" },
      { value: 0, suffix: "", label: "Errors Missed" },
      { value: 100, suffix: "%", label: "Accuracy Rate" },
      { value: 24, suffix: "/7", label: "Quality Assurance" }
    ],
    process: [
      { title: "Initial Assessment", description: "We establish the required style guide (e.g., Chicago Manual of Style) and your specific preferences.", icon: "lightbulb" },
      { title: "First Pass", description: "A meticulous read-through to catch spelling, grammar, and glaring punctuation errors.", icon: "map" },
      { title: "Consistency Check", description: "Cross-referencing timelines, character details, and stylistic choices for uniformity.", icon: "pen-tool" },
      { title: "Formatting Review", description: "Checking the visual layout for widows, orphans, and alignment issues.", icon: "sparkles" },
      { title: "Final Verification", description: "A conclusive review to guarantee the manuscript is absolutely flawless.", icon: "rocket" }
    ],
    faqs: [
      { question: "Is proofreading the same as editing?", answer: "No. Editing involves restructuring sentences, fixing plot holes, and improving flow. Proofreading is the final step, focusing strictly on correcting objective errors like spelling, grammar, and punctuation." },
      { question: "Do you use software or human proofreaders?", answer: "We rely exclusively on highly trained human proofreaders. Software misses context, homophones, and stylistic nuances that only a professional human eye can catch." },
      { question: "Should I get proofreading before or after formatting?", answer: "Both. We recommend a final proofread after formatting to catch any errors introduced during typesetting, such as hyphenation issues or missing text." },
      { question: "Do you follow a specific style guide?", answer: "Yes. By default, we use the Chicago Manual of Style for fiction and trade non-fiction, but we can adapt to AP, APA, or any custom style guide you prefer." }
    ],
    cta: {
      title: "Don't let a typo ruin your",
      highlight: "masterpiece.",
      description: "Secure our professional proofreading services and publish with absolute confidence."
    }
  },
  {
    slug: "author-website",
    title: "Author Website",
    subtitle: "Showcase your author brand with a beautifully designed website that connects you with your audience.",
    icon: "layout",
    overview: "In today's digital publishing landscape, an author's website is their most valuable piece of digital real estate. It's the central hub for your brand, your books, and your direct connection with readers. We design and build stunning, high-performance websites tailored specifically for authors. From integrating seamless e-commerce for direct book sales to setting up newsletter capture forms to grow your audience, we deliver a digital presence that looks premium, functions flawlessly, and drives your author career forward.",
    features: [
      { title: "Custom Premium Design", description: "Bespoke aesthetics that reflect your specific genre, brand, and personality." },
      { title: "E-commerce Integration", description: "Sell your books, merchandise, and courses directly to readers without middleman fees." },
      { title: "Audience Building Tools", description: "Integrated newsletter sign-ups, lead magnets, and CRM connectivity to grow your mailing list." },
      { title: "Dynamic Blog Setup", description: "An easy-to-use content management system to share news, updates, and articles." },
      { title: "Mobile Optimization", description: "Flawless responsive design that looks perfect on desktops, tablets, and smartphones." },
      { title: "SEO Foundation", description: "Built with search engine optimization best practices to help readers find you organically." }
    ],
    benefits: [
      "Establish instant professional credibility",
      "Own your audience and direct reader relationships",
      "Maximize profits through direct sales",
      "Centralized marketing and media hub",
      "Easy self-management and content updates",
      "Stand out in a highly competitive market"
    ],
    stats: [
      { value: 200, suffix: "+", label: "Websites Launched" },
      { value: 99, suffix: "%", label: "Uptime Guaranteed" },
      { value: 3, suffix: "x", label: "Audience Growth" },
      { value: 100, suffix: "%", label: "Mobile Responsive" }
    ],
    process: [
      { title: "Discovery & Strategy", description: "We discuss your brand identity, target audience, and the primary goals for your website.", icon: "lightbulb" },
      { title: "UI/UX Design", description: "We create high-fidelity design mockups tailored to your author brand.", icon: "map" },
      { title: "Development", description: "We build the site using modern frameworks, ensuring lightning-fast performance.", icon: "pen-tool" },
      { title: "Integration", description: "We connect your mailing list provider, payment gateways, and social media accounts.", icon: "sparkles" },
      { title: "Launch & Training", description: "We launch the site and provide you with a tutorial on how to update your content.", icon: "rocket" }
    ],
    faqs: [
      { question: "Will I be able to update the website myself?", answer: "Absolutely. We build on user-friendly platforms and provide comprehensive training so you can easily add new books, blog posts, and updates." },
      { question: "Do you handle hosting and domains?", answer: "Yes, we can manage the domain registration and provide premium, secure hosting, or we can deploy the site to your existing hosting provider." },
      { question: "Can I sell my books directly from the site?", answer: "Yes. We can integrate robust e-commerce solutions allowing you to sell physical books, eBooks, and merchandise directly to your readers, maximizing your royalty margins." },
      { question: "Is the website optimized for mobile devices?", answer: "100%. All our websites are built with a mobile-first approach, ensuring a flawless experience on any screen size." }
    ],
    cta: {
      title: "Build the ultimate home for your",
      highlight: "author brand.",
      description: "Let us design a premium website that captivates your readers and drives book sales."
    }
  },
  {
    slug: "book-cover-design",
    title: "Book Cover Design",
    subtitle: "Creative design with expert guidance to help authors produce polished, industry-standard covers.",
    icon: "image",
    overview: "People absolutely judge a book by its cover. In a crowded marketplace, your cover is your most important marketing asset. It has precisely three seconds to capture a reader's attention and convey the tone, genre, and quality of your story. Our award-winning design team specializes in creating striking, market-appropriate covers that stop scrollers in their tracks. We combine custom typography, stunning imagery, and deep market research to produce a cover that doesn't just look beautiful—it sells.",
    features: [
      { title: "Custom Concept Creation", description: "Unique, bespoke visual concepts tailored specifically to your narrative and themes." },
      { title: "Genre Market Research", description: "Data-driven design choices that ensure your cover signals the right genre to target readers." },
      { title: "Full Print Wrap Layout", description: "Comprehensive design including the front cover, spine, and back cover for print editions." },
      { title: "Typography Mastery", description: "Expert font selection and title treatment that stands out even in thumbnail size." },
      { title: "3D Mockups", description: "High-resolution 3D renderings of your book for use in marketing and social media." },
      { title: "Audiobook Covers", description: "Square-format adaptations optimized for Audible and other audio platforms." }
    ],
    benefits: [
      "Dramatically higher click-through and conversion rates",
      "Instant genre recognition for target audiences",
      "Professional aesthetic that competes with major publishers",
      "Versatile assets for versatile marketing campaigns",
      "Confidence in your book's visual presentation",
      "A cover you'll be proud to show the world"
    ],
    stats: [
      { value: 850, suffix: "+", label: "Covers Designed" },
      { value: 40, suffix: "%", label: "Avg Sales Increase" },
      { value: 3, suffix: "Rev", label: "Revision Rounds" },
      { value: 100, suffix: "%", label: "Original Art" }
    ],
    process: [
      { title: "Creative Briefing", description: "We gather details about your plot, characters, themes, and visual inspirations.", icon: "lightbulb" },
      { title: "Market Analysis", description: "We research current trends and top-selling covers in your specific genre.", icon: "map" },
      { title: "Concept Generation", description: "We present multiple distinct initial concepts for your review and selection.", icon: "pen-tool" },
      { title: "Refinement", description: "We refine the chosen concept based on your feedback, perfecting typography and imagery.", icon: "sparkles" },
      { title: "Final Delivery", description: "You receive all high-resolution files required for eBook, print, and promotional use.", icon: "rocket" }
    ],
    faqs: [
      { question: "Do you use stock photos or custom illustration?", answer: "We offer both. Depending on your genre and budget, we can expertly composite premium stock imagery or create 100% custom, hand-drawn illustrations." },
      { question: "What if I don't like the initial concepts?", answer: "Our process is highly collaborative. If the first round misses the mark, we discuss why and generate new concepts until we find a direction you love." },
      { question: "Will I own the rights to the cover?", answer: "Yes. Once final payment is made, you own the exclusive rights to use the final cover design for your book and marketing materials." },
      { question: "Do you design the spine and back cover?", answer: "Yes, our Print Wrap package includes the full jacket design—front, spine, and back—precisely formatted to your printer's specifications." }
    ],
    cta: {
      title: "Make them judge your book by its",
      highlight: "stunning cover.",
      description: "Partner with our award-winning designers and command attention in any marketplace."
    }
  },
  {
    slug: "book-illustration",
    title: "Book Illustration",
    subtitle: "Bring your story to life with custom illustrations tailored to your narrative style.",
    icon: "pen-tool",
    overview: "Words tell the story, but illustrations bring the world to life. Whether you are publishing a whimsical children's book, a dark fantasy novel requiring intricate maps, or a technical manual needing clear diagrams, our team of highly skilled illustrators can realize your vision. We offer a diverse range of artistic styles—from lush watercolors and classic line art to modern digital painting and vector graphics. We work closely with you to ensure every visual element perfectly complements your narrative.",
    features: [
      { title: "Diverse Artistic Styles", description: "Access to a roster of artists specializing in various mediums, from watercolor to digital 3D." },
      { title: "Character Design", description: "Iterative development of unique, expressive characters that capture readers' hearts." },
      { title: "Immersive World-Building", description: "Creating detailed environments, fantasy maps, and atmospheric scene illustrations." },
      { title: "Technical & Medical", description: "Precise, accurate diagrams and instructional graphics for non-fiction texts." },
      { title: "Storyboard Development", description: "Pacing the visual narrative perfectly for picture books and graphic novels." },
      { title: "High-Resolution Assets", description: "Print-ready files delivered in the exact specifications required by your publisher." }
    ],
    benefits: [
      "Elevate the emotional impact of your story",
      "Crucial for success in children's and YA markets",
      "Create a unique, recognizable visual brand",
      "Enhance reader comprehension in non-fiction",
      "Complete alignment between text and imagery",
      "Stand out with premium, custom artwork"
    ],
    stats: [
      { value: 5000, suffix: "+", label: "Illustrations Created" },
      { value: 15, suffix: "+", label: "Art Styles Available" },
      { value: 100, suffix: "%", label: "Custom Artwork" },
      { value: 5, suffix: "Star", label: "Client Ratings" }
    ],
    process: [
      { title: "Style Discovery", description: "We review your manuscript and reference images to determine the perfect artistic style.", icon: "lightbulb" },
      { title: "Character Concepts", description: "We sketch initial character designs and environments for your approval.", icon: "map" },
      { title: "Storyboarding", description: "For picture books, we lay out rough sketches to plan the pacing and page turns.", icon: "pen-tool" },
      { title: "Color & Rendering", description: "Once sketches are approved, we apply color, lighting, and final details.", icon: "sparkles" },
      { title: "Final Formatting", description: "The completed artwork is formatted and integrated seamlessly with your text.", icon: "rocket" }
    ],
    faqs: [
      { question: "Can I choose the specific style of illustration?", answer: "Absolutely. We have a diverse portfolio of artists. You can select the specific style that best matches your vision, whether it's cartoonish, realistic, or stylized." },
      { question: "How involved am I in the illustration process?", answer: "Very involved. You will review and approve initial character concepts, rough sketches, and final colored artwork at every stage to ensure it matches your vision." },
      { question: "Who owns the rights to the artwork?", answer: "Upon completion and final payment, you receive full commercial rights to use the illustrations for your book and related marketing merchandise." },
      { question: "Can you also format the text around the illustrations?", answer: "Yes! Our illustration service integrates seamlessly with our formatting service to produce a beautifully typeset, fully illustrated final book." }
    ],
    cta: {
      title: "Bring your universe to",
      highlight: "vivid life.",
      description: "Let our master illustrators translate your words into breathtaking visuals."
    }
  },
  {
    slug: "book-publishing",
    title: "Book Publishing",
    subtitle: "Launch globally with confidence. We handle everything from print to digital distribution.",
    icon: "book-open",
    overview: "Writing the book is only half the battle; navigating the complex world of publishing is the other. Our comprehensive publishing service offers the perfect hybrid of traditional quality and self-publishing control. We handle the entire backend of the publishing process—from ISBN registration and copyright filing to global distribution setup. We ensure your book is available in print and digital formats across major retailers worldwide, including Amazon, Barnes & Noble, and thousands of independent bookstores.",
    features: [
      { title: "Global Distribution Setup", description: "Making your book available to 40,000+ retailers, libraries, and schools worldwide." },
      { title: "Metadata Optimization", description: "Strategic selection of BISAC categories, keywords, and descriptions to maximize discoverability." },
      { title: "ISBN & Copyright Management", description: "Handling all the legal, administrative, and registration heavy lifting on your behalf." },
      { title: "Print-on-Demand Integration", description: "Setting up efficient, zero-inventory print fulfillment for paperback and hardcover editions." },
      { title: "Author Central Setup", description: "Optimizing your Amazon Author profile to build credibility and drive sales." },
      { title: "Launch Strategy Consultation", description: "Expert advice on pricing, release dates, and initial marketing pushes." }
    ],
    benefits: [
      "Hassle-free, completely managed publishing process",
      "Maximum global market reach and discoverability",
      "Retain 100% of your net royalties and creative rights",
      "Professional industry guidance and support",
      "Zero inventory risks with Print-on-Demand",
      "Speed to market—publish on your timeline"
    ],
    stats: [
      { value: 40, suffix: "k+", label: "Retail Channels" },
      { value: 100, suffix: "%", label: "Royalty Retention" },
      { value: 30, suffix: "Days", label: "Avg Launch Time" },
      { value: 24, suffix: "/7", label: "Author Support" }
    ],
    process: [
      { title: "Strategy Alignment", description: "We determine the best distribution platforms, pricing strategy, and launch date for your book.", icon: "lightbulb" },
      { title: "Metadata Optimization", description: "We craft compelling descriptions and research high-traffic keywords for SEO.", icon: "map" },
      { title: "Administrative Setup", description: "We acquire your ISBNs, file copyright, and register your title with Books In Print.", icon: "pen-tool" },
      { title: "Platform Uploads", description: "We upload and validate your final formatted files across all chosen distribution networks.", icon: "sparkles" },
      { title: "Global Release", description: "Your book goes live, becoming available for purchase to millions of readers worldwide.", icon: "rocket" }
    ],
    faqs: [
      { question: "Do you take a percentage of my book sales?", answer: "No. Unlike traditional publishers or vanity presses, we charge a flat fee for our services. You retain 100% of your net royalties from the distribution platforms." },
      { question: "Where will my book be sold?", answer: "Your book will be available globally on major platforms like Amazon and Apple Books, and distributed through the Ingram network to thousands of brick-and-mortar stores and libraries." },
      { question: "Do I have to buy hundreds of copies of my own book?", answer: "No. We utilize Print-on-Demand (POD) technology. Books are printed and shipped only when a customer orders them, eliminating inventory costs and risk." },
      { question: "Can I still pursue traditional publishing later?", answer: "Yes. Because you own all your rights, you are free to sign with a traditional publisher or literary agent at any time in the future." }
    ],
    cta: {
      title: "Ready to officially become a",
      highlight: "published author?",
      description: "Let us handle the complexities of distribution so you can focus on writing your next book."
    }
  }
];
