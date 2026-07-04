import { defineArrayMember, defineField, defineType } from 'sanity'

const contactSectionFields = [
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
]

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
      name: 'businessHoursLabel',
      title: 'Business Hours Label',
      type: 'string',
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'string',
    }),
    defineField({
      name: 'contactSection',
      title: 'Contact Section Defaults',
      description: 'Fallback contact-section text and hours. Page and service documents can override section copy; phone, email, address, and hours remain global.',
      type: 'object',
      fields: contactSectionFields,
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
        defineField({ name: 'brandLogoImage', title: 'Brand Logo Image', type: 'image', options: { hotspot: true } }),
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
        defineField({ name: 'brandLogoImage', title: 'Brand Logo Image', type: 'image', options: { hotspot: true } }),
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
