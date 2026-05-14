import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({ name: 'content', title: 'Content', type: 'text', validation: (Rule) => Rule.required() }),
    defineField({ name: 'orderRank', title: 'Order', type: 'number' }),
  ],
})
