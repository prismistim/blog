import { SITE_TITLE, SITE_DESCRIPTION, SITE_ADMIN } from '../consts'
import type { WithContext, Article, Person, WebSite } from 'schema-dts'
import type { CollectionEntry } from 'astro:content'

const SITE_URL = 'https://blog.snowsphere.net/'

const person: Person = {
  '@type': 'Person',
  '@id': SITE_ADMIN,
  name: SITE_ADMIN,
  url: SITE_URL,
  sameAs: [
    'https:/moemoe.dev/@snosph'
  ]
}

export const webSiteSchema: WebSite = {
  '@type': 'WebSite',
  '@id': SITE_URL,
  name: SITE_TITLE,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  inLanguage: 'ja',
  author: person
}

export const articleSchema = (blog: CollectionEntry<'blog'>): WithContext<Article> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': blog.slug,
    headline: blog.data.title,
    description: blog.data.description,
    keywords: blog.data.tags ?? [],
    author: person,
    datePublished: blog.data.pubDate.toISOString(),
    dateModified: (blog.data.updatedDate ?? blog.data.pubDate).toISOString(),
    isPartOf: webSiteSchema
  }
}
