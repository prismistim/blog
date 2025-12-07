import { SITE_TITLE, SITE_DESCRIPTION, SITE_ADMIN } from '../consts'
import type { WithContext, Article, Person, WebSite } from 'schema-dts'
import dayjs from 'dayjs'
import type { Blog } from './microcms'

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

export const articleSchema = (blog: Blog): WithContext<Article> => {
  const url = `${SITE_URL}article/${blog.id}/`

  const createdAt = blog.publishedAt
  const updatedAt = blog.oldUpdatedAt ?? blog.updatedAt ?? ''

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    headline: blog.title,
    description: blog.description,
    keywords: blog.tags?.join(', '),
    author: person,
    datePublished: dayjs(createdAt).toISOString(),
    dateModified: dayjs(updatedAt).toISOString(),
    image: `${SITE_URL}snowsphere.jpg`,
    isPartOf: webSiteSchema
  }
}
