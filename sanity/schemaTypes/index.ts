import { type SchemaTypeDefinition } from 'sanity'
import { seo } from './seo'
import { globalSettings } from './globalSettings'
import { post } from './post'
import { author } from './author'
import { category } from './category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    seo,
    globalSettings,
    post,
    author,
    category,
  ],
}
