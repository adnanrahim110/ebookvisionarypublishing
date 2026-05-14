import { defineField, defineType } from 'sanity'

export const portfolioBook = defineType({
  name: 'portfolioBook',
  title: 'Portfolio Book',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'author', title: 'Author', type: 'string' }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'coverUrl', title: 'Fallback Cover URL', type: 'url' }),
    defineField({ name: 'orderRank', title: 'Order', type: 'number' }),
  ],
})
