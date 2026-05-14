import { defineArrayMember, defineField, defineType } from 'sanity'

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'pageLabel', title: 'Page Label', type: 'string' }),
    defineField({ name: 'lastUpdated', title: 'Last Updated', type: 'string' }),
    defineField({ name: 'lastUpdatedLabel', title: 'Last Updated Label', type: 'string' }),
    defineField({ name: 'tableOfContentsLabel', title: 'Table of Contents Label', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 4 }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'id', title: 'Anchor ID', type: 'string' }),
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'content', title: 'Paragraphs', type: 'array', of: [{ type: 'string' }] }),
          ],
        }),
      ],
    }),
    defineField({ name: 'seo', title: 'SEO Settings', type: 'seo' }),
  ],
})
