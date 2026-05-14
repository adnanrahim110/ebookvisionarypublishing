import { type SchemaTypeDefinition } from 'sanity'
import { seo } from './seo'
import { globalSettings } from './globalSettings'
import { post } from './post'
import { author } from './author'
import { category } from './category'
import { service } from './service'
import { testimonial } from './testimonial'
import { portfolioBook } from './portfolioBook'
import { legalPage } from './legalPage'
import { pageContent } from './pageContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    seo,
    globalSettings,
    post,
    author,
    category,
    service,
    testimonial,
    portfolioBook,
    legalPage,
    pageContent,
  ],
}
