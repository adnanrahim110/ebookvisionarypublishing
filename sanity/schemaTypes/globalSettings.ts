import { defineArrayMember, defineField, defineType } from 'sanity'

export const globalSettings = defineType({
  name: 'globalSettings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
    }),
    defineField({
      name: 'globalSeo',
      title: 'Global SEO Default',
      type: 'seo',
    }),
    defineField({
      name: 'nav',
      title: 'Navigation Content',
      type: 'object',
      fields: [
        defineField({ name: 'brandMark', title: 'Brand Mark', type: 'string' }),
        defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'CTA Link', type: 'string' }),
      ],
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer Content',
      type: 'object',
      fields: [
        defineField({ name: 'brandMark', title: 'Brand Mark', type: 'string' }),
        defineField({ name: 'watermark', title: 'Watermark', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({ name: 'navigationLabel', title: 'Navigation Label', type: 'string' }),
        defineField({ name: 'servicesLabel', title: 'Services Label', type: 'string' }),
        defineField({ name: 'copyrightSuffix', title: 'Copyright Suffix', type: 'string' }),
        defineField({
          name: 'legalLinks',
          title: 'Legal Links',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Label', type: 'string' }),
                defineField({ name: 'href', title: 'Link', type: 'string' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})
