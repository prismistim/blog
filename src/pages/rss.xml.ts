import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'
import { createMarkdown } from 'safe-marked'
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'
import dayjs from '../lib/dayjs'

export async function GET() {
  const posts = await getCollection('blogs')
  const parsedRssLimit = Number(import.meta.env.RSS_LIMIT)
  const rssLimit = Number.isNaN(parsedRssLimit) || parsedRssLimit <= 0 ? 5 : parsedRssLimit
  const sorted = [...posts]
    .filter(p => !p.data.isHidden)
    .sort((a, b) => dayjs(b.data.publishedAt).diff(a.data.publishedAt))

  const markdown = createMarkdown()

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: import.meta.env.SITE,
    items: sorted
      .slice(0, rssLimit)
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: new Date(post.data.publishedAt),
        content: post.data.isCW ? markdown(post.data.description) : markdown(post.data.content),
        link: `/article/${post.id}/`,
      })),
  })
}
