import { defineArrayMember, defineField, defineType } from 'sanity'

const iconOptions = [
  'feather',
  'edit-3',
  'align-left',
  'check-circle',
  'layout',
  'image',
  'pen-tool',
  'book-open',
  'lightbulb',
  'map',
  'sparkles',
  'rocket',
]

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Navigation Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'heroTitle', title: 'Page Hero Title', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Page Hero Subtitle', type: 'text' }),
    defineField({ name: 'subtitle', title: 'Short Description', type: 'text' }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: { list: iconOptions.map((icon) => ({ title: icon, value: icon })) },
    }),
    defineField({ name: 'seo', title: 'SEO Settings', type: 'seo' }),
    defineField({ name: 'overviewLabel', title: 'Overview Label', type: 'string' }),
    defineField({ name: 'overviewHeading', title: 'Overview Heading', type: 'string' }),
    defineField({ name: 'overview', title: 'Overview Body', type: 'text', rows: 6 }),
    defineField({ name: 'featuresLabel', title: 'Features Label', type: 'string' }),
    defineField({ name: 'featuresHeading', title: 'Features Heading', type: 'string' }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
          ],
        }),
      ],
    }),
    defineField({ name: 'benefitsHeading', title: 'Benefits Heading', type: 'string' }),
    defineField({ name: 'benefitsSubheading', title: 'Benefits Subheading', type: 'text' }),
    defineField({ name: 'benefits', title: 'Benefits', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'benefitImages',
      title: 'Benefit Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'number' }),
            defineField({ name: 'suffix', title: 'Suffix', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'process',
      title: 'Process Steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'icon', title: 'Icon', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Service Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'role', title: 'Role', type: 'string' }),
            defineField({ name: 'content', title: 'Content', type: 'text' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'highlight', title: 'Highlighted Text', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
      ],
    }),
    defineField({ name: 'orderRank', title: 'Order', type: 'number' }),
  ],
})
