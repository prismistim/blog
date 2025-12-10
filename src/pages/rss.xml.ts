import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { createMarkdown } from 'safe-marked'
import dayjs from '../lib/dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(isSameOrAfter)

export async function GET() {
	const posts = await getCollection('blogs')
	const sorted = posts.sort((a, b) => {
		return dayjs(b.data.publishedAt).isSameOrAfter(a.data.publishedAt) ? 1 : -1;
	})

	const markdown = createMarkdown()

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: sorted.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: new Date(post.data.publishedAt),
			content: markdown(post.data.content),
			link: `/article/${post.id}/`
		}))
	})
}
