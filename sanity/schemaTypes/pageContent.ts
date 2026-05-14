import { defineArrayMember, defineField, defineType } from 'sanity'
import type { ConditionalPropertyCallbackContext } from 'sanity'

const hideUnless =
  (...keys: string[]) =>
  ({ document }: ConditionalPropertyCallbackContext) => {
    const pageKey = typeof document?.pageKey === 'string' ? document.pageKey : ''
    return !keys.includes(pageKey)
  }

const buttonFields = [
  defineField({ name: 'label', title: 'Label', type: 'string' }),
  defineField({ name: 'href', title: 'Link', type: 'string' }),
]

const seoField = defineField({ name: 'seo', title: 'SEO Settings', type: 'seo' })

const pageHeroField = defineField({
  name: 'pageHero',
  title: 'Page Hero',
  type: 'object',
  hidden: hideUnless('about', 'contact', 'blogs', 'services'),
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'text' }),
    defineField({ name: 'label', title: 'Label', type: 'string' }),
  ],
})

const statArray = defineField({
  name: 'stats',
  title: 'Stats',
  type: 'array',
  hidden: hideUnless('home'),
  of: [
    defineArrayMember({
      type: 'object',
      fields: [
        defineField({ name: 'value', title: 'Value', type: 'string' }),
        defineField({ name: 'suffix', title: 'Suffix', type: 'string' }),
        defineField({ name: 'label', title: 'Label', type: 'string' }),
      ],
    }),
  ],
})

const faqFields = [
  defineField({ name: 'question', title: 'Question', type: 'string' }),
  defineField({ name: 'answer', title: 'Answer', type: 'text' }),
]

const testimonialFields = [
  defineField({ name: 'name', title: 'Name', type: 'string' }),
  defineField({ name: 'role', title: 'Role', type: 'string' }),
  defineField({ name: 'content', title: 'Content', type: 'text' }),
]

const processStepFields = [
  defineField({ name: 'title', title: 'Title', type: 'string' }),
  defineField({ name: 'description', title: 'Description', type: 'text' }),
  defineField({ name: 'icon', title: 'Icon', type: 'string' }),
]

export const pageContent = defineType({
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'pageKey',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'Services Index', value: 'services' },
          { title: 'About', value: 'about' },
          { title: 'Contact', value: 'contact' },
          { title: 'Blogs Index', value: 'blogs' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    seoField,
    pageHeroField,
    defineField({
      name: 'homeHero',
      title: 'Home Hero',
      type: 'object',
      hidden: hideUnless('home'),
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({
          name: 'stats',
          title: 'Hero Stats',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'value', title: 'Value', type: 'string' }),
                defineField({ name: 'label', title: 'Label', type: 'string' }),
              ],
            }),
          ],
        }),
        defineField({ name: 'primaryCta', title: 'Primary CTA', type: 'object', fields: buttonFields }),
        defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'object', fields: buttonFields }),
      ],
    }),
    statArray,
    defineField({
      name: 'whyPublish',
      title: 'Why Authors Trust Us',
      type: 'object',
      hidden: hideUnless('home'),
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'icon', title: 'Icon', type: 'string' }),
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text' }),
                defineField({ name: 'accent', title: 'Accent Classes', type: 'string' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'servicesOverview',
      title: 'Services Overview Section',
      type: 'object',
      hidden: hideUnless('home', 'services'),
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
      ],
    }),
    defineField({
      name: 'portfolio',
      title: 'Portfolio Section',
      type: 'object',
      hidden: hideUnless('home'),
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
      ],
    }),
    defineField({
      name: 'process',
      title: 'Home Process',
      type: 'object',
      hidden: hideUnless('home'),
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'steps', title: 'Steps', type: 'array', of: [defineArrayMember({ type: 'object', fields: processStepFields })] }),
      ],
    }),
    defineField({
      name: 'pricing',
      title: 'Publishing Made Simple',
      type: 'object',
      hidden: hideUnless('home'),
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'offerHeading', title: 'Offer Heading', type: 'string' }),
        defineField({ name: 'offers', title: 'Offers', type: 'array', of: [{ type: 'string' }] }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'object',
          fields: [
            defineField({ name: 'src', title: 'Static Image Path', type: 'string' }),
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          ],
        }),
        defineField({
          name: 'badge',
          title: 'Badge',
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
          ],
        }),
        defineField({ name: 'cta', title: 'CTA', type: 'object', fields: buttonFields }),
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      hidden: hideUnless('home'),
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
      ],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ Section',
      type: 'object',
      hidden: hideUnless('home'),
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'items', title: 'Items', type: 'array', of: [defineArrayMember({ type: 'object', fields: faqFields })] }),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Section',
      type: 'object',
      hidden: hideUnless('home', 'contact'),
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'headingEmphasis', title: 'Heading Emphasis', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({ name: 'infoHeading', title: 'Info Heading', type: 'string' }),
        defineField({ name: 'hoursLabel', title: 'Hours Label', type: 'string' }),
        defineField({ name: 'hours', title: 'Hours', type: 'string' }),
        defineField({ name: 'formHeading', title: 'Form Heading', type: 'string' }),
        defineField({ name: 'formDescription', title: 'Form Description', type: 'text' }),
        defineField({ name: 'fullNameLabel', title: 'Full Name Label', type: 'string' }),
        defineField({ name: 'emailLabel', title: 'Email Label', type: 'string' }),
        defineField({ name: 'phoneLabel', title: 'Phone Label', type: 'string' }),
        defineField({ name: 'serviceLabel', title: 'Service Label', type: 'string' }),
        defineField({ name: 'messageLabel', title: 'Message Label', type: 'string' }),
        defineField({ name: 'privacyText', title: 'Privacy Text', type: 'text' }),
        defineField({ name: 'submitLabel', title: 'Submit Label', type: 'string' }),
      ],
    }),
    defineField({
      name: 'archive',
      title: 'Blog Archive Section',
      type: 'object',
      hidden: hideUnless('blogs'),
      fields: [
        defineField({ name: 'emptyLabel', title: 'Empty Label', type: 'string' }),
        defineField({ name: 'emptyHeading', title: 'Empty Heading', type: 'string' }),
        defineField({ name: 'emptyDescription', title: 'Empty Description', type: 'text' }),
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'headingPrefix', title: 'Heading Prefix', type: 'string' }),
        defineField({ name: 'headingEmphasis', title: 'Heading Emphasis', type: 'string' }),
        defineField({ name: 'totalLabel', title: 'Total Label', type: 'string' }),
        defineField({ name: 'latestLabel', title: 'Latest Label', type: 'string' }),
        defineField({ name: 'spotlightLabel', title: 'Spotlight Label', type: 'string' }),
        defineField({ name: 'latestBadge', title: 'Latest Badge', type: 'string' }),
        defineField({ name: 'fallbackCategory', title: 'Fallback Category', type: 'string' }),
        defineField({ name: 'featuredDescription', title: 'Featured Description', type: 'text' }),
        defineField({ name: 'authoredByLabel', title: 'Authored By Label', type: 'string' }),
        defineField({ name: 'fallbackAuthor', title: 'Fallback Author', type: 'string' }),
        defineField({ name: 'readLabel', title: 'Read Label', type: 'string' }),
        defineField({ name: 'readingListLabel', title: 'Reading List Label', type: 'string' }),
        defineField({ name: 'storySingular', title: 'Story Singular Label', type: 'string' }),
        defineField({ name: 'storyPlural', title: 'Story Plural Label', type: 'string' }),
        defineField({ name: 'issueLabel', title: 'Issue Label', type: 'string' }),
        defineField({ name: 'featuredBroadsideLabel', title: 'Featured Broadside Label', type: 'string' }),
        defineField({ name: 'readArticleLabel', title: 'Read Article Label', type: 'string' }),
        defineField({ name: 'footerLabel', title: 'Footer Label', type: 'string' }),
      ],
    }),
    defineField({
      name: 'detail',
      title: 'Blog Detail Labels',
      type: 'object',
      hidden: hideUnless('blogs'),
      fields: [
        defineField({ name: 'backToArchiveLabel', title: 'Back to Archive Label', type: 'string' }),
        defineField({ name: 'archiveLabel', title: 'Archive Label', type: 'string' }),
        defineField({ name: 'fallbackCategory', title: 'Fallback Category', type: 'string' }),
        defineField({ name: 'issueLabel', title: 'Issue Label', type: 'string' }),
        defineField({ name: 'readTimeLabel', title: 'Read Time Label', type: 'string' }),
        defineField({ name: 'readTimeSuffix', title: 'Read Time Suffix', type: 'string' }),
        defineField({ name: 'readTimeShortSuffix', title: 'Read Time Short Suffix', type: 'string' }),
        defineField({ name: 'authoredByLabel', title: 'Authored By Label', type: 'string' }),
        defineField({ name: 'fallbackAuthor', title: 'Fallback Author', type: 'string' }),
        defineField({ name: 'scrollLabel', title: 'Scroll Label', type: 'string' }),
        defineField({ name: 'shareLabel', title: 'Share Label', type: 'string' }),
        defineField({ name: 'copyLabel', title: 'Copy Label', type: 'string' }),
        defineField({ name: 'copiedLabel', title: 'Copied Label', type: 'string' }),
        defineField({ name: 'copyAriaLabel', title: 'Copy Aria Label', type: 'string' }),
        defineField({ name: 'copiedAriaLabel', title: 'Copied Aria Label', type: 'string' }),
        defineField({ name: 'backToTopLabel', title: 'Back to Top Label', type: 'string' }),
        defineField({ name: 'endLabel', title: 'End Label', type: 'string' }),
        defineField({ name: 'endDescription', title: 'End Description', type: 'text' }),
        defineField({ name: 'returnToLabel', title: 'Return To Label', type: 'string' }),
      ],
    }),
    defineField({
      name: 'story',
      title: 'About Story',
      type: 'object',
      hidden: hideUnless('about'),
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'quote', title: 'Quote', type: 'text' }),
        defineField({ name: 'quoteAuthor', title: 'Quote Author', type: 'string' }),
        defineField({ name: 'quoteRole', title: 'Quote Role', type: 'string' }),
        defineField({
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'value', title: 'Value', type: 'string' }),
                defineField({ name: 'label', title: 'Label', type: 'string' }),
              ],
            }),
          ],
        }),
        defineField({ name: 'beliefLabel', title: 'Belief Label', type: 'string' }),
        defineField({ name: 'beliefHeading', title: 'Belief Heading', type: 'string' }),
        defineField({ name: 'beliefDescription', title: 'Belief Description', type: 'text' }),
        defineField({ name: 'ctaHeading', title: 'CTA Heading', type: 'string' }),
        defineField({ name: 'ctaDescription', title: 'CTA Description', type: 'text' }),
        defineField({ name: 'primaryCta', title: 'Primary CTA', type: 'object', fields: buttonFields }),
        defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'object', fields: buttonFields }),
      ],
    }),
    defineField({
      name: 'missionVision',
      title: 'Mission & Vision',
      type: 'object',
      hidden: hideUnless('about'),
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({
          name: 'panels',
          title: 'Panels',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'num', title: 'Number', type: 'string' }),
                defineField({ name: 'label', title: 'Label', type: 'string' }),
                defineField({ name: 'heading', title: 'Heading', type: 'string' }),
                defineField({ name: 'body', title: 'Body', type: 'text' }),
                defineField({ name: 'gradient', title: 'Gradient Classes', type: 'string' }),
                defineField({ name: 'offsetClass', title: 'Offset Classes', type: 'string' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'strengths',
      title: 'Strengths',
      type: 'object',
      hidden: hideUnless('about'),
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'icon', title: 'Icon', type: 'string' }),
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'aboutProcess',
      title: 'About Process',
      type: 'object',
      hidden: hideUnless('about'),
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'num', title: 'Number', type: 'string' }),
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text' }),
                defineField({ name: 'icon', title: 'Icon', type: 'string' }),
                defineField({ name: 'accent', title: 'Accent Color', type: 'string' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'pageKey',
    },
    prepare: ({ title }) => ({
      title: title ? `${title} page content` : 'Page content',
    }),
  },
})
