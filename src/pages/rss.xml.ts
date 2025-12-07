import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { createMarkdown } from 'safe-marked'

export async function GET() {
	const posts = await getCollection('blogs')
	const markdown = createMarkdown()

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: new Date(post.data.publishedAt),
			content: markdown(post.data.content),
			link: `/article/${post.id}`
		}))
	})
}
