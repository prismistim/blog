import type { CollectionEntry } from 'astro:content'
import type { Article, Person, WebSite, WithContext } from 'schema-dts'
import { SITE_ADMIN, SITE_DESCRIPTION, SITE_TITLE } from '../consts'
import dayjs from '../lib/dayjs'

const SITE_URL = 'https://blog.snowsphere.net/'

const person: Person = {
  '@type': 'Person',
  '@id': `${SITE_URL}#author`,
  name: SITE_ADMIN,
  url: SITE_URL,
  sameAs: ['https://moemoe.dev/@snosph'],
}

export const webSiteSchema: WebSite = {
  '@type': 'WebSite',
  '@id': SITE_URL,
  name: SITE_TITLE,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  inLanguage: 'ja',
  author: person,
}

export const articleSchema = (blog: CollectionEntry<'blogs'>): WithContext<Article> => {
  const url = `${SITE_URL}article/${blog.id}/`

  const createdAt = blog.data.publishedAt
  const updatedAt = blog.data.oldUpdatedAt ?? blog.data.updatedAt ?? null

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: blog.data.title,
    description: blog.data.description,
    keywords: blog.data.tags?.map((item) => item.name).join(', '),
    author: person,
    datePublished: dayjs(createdAt).format(),
    ...(updatedAt && { dateModified: dayjs(updatedAt).format() }),
    image: `${SITE_URL}snowsphere.jpg`,
    isPartOf: webSiteSchema,
  }
}
