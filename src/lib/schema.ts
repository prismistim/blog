import { SITE_TITLE, SITE_DESCRIPTION, SITE_ADMIN } from '../consts'
import type { WithContext, Article, Person, WebSite } from 'schema-dts'
import type { CollectionEntry } from 'astro:content'

const SITE_URL = 'https://blog.snowsphere.net/'

const person: Person = {
  '@type': 'Person',
  '@id': `${SITE_URL}#author`,
  name: SITE_ADMIN,
  url: SITE_URL,
  sameAs: [
    'https://moemoe.dev/@snosph'
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
  const url = `${SITE_URL}article/${blog.slug}/`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    headline: blog.data.title,
    description: blog.data.description,
    keywords: blog.data.tags?.join(', '),
    author: person,
    datePublished: blog.data.pubDate.toISOString(),
    dateModified: (blog.data.updatedDate ?? blog.data.pubDate).toISOString(),
    image: `${SITE_URL}snowsphere.png`,
    isPartOf: webSiteSchema
  }
}
