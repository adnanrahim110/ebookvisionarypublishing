import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

// Cache tag applied to every Sanity query (see sanity/lib/content.ts). The
// webhook route at app/api/revalidate invalidates this tag on publish so all
// CMS-backed pages refresh on-demand via revalidateTag.
export const REVALIDATE_TAG = 'sanity'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Off: pages use ISR + tag-based revalidation, so refetches must hit the live
  // API for guaranteed-fresh data rather than the (separately cached) CDN.
  useCdn: false,
})
