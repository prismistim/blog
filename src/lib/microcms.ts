import type { MicroCMSQueries, MicroCMSListContent } from 'microcms-js-sdk'
import { createClient } from 'microcms-js-sdk'

export type Tag = {
  name: string
}

export type Categories = {
  title: string
}

export type Blog = {
  title: string
  description: string
  tags: Tag[]
  categories: Categories
  isCW: boolean
  isHidden: boolean
  content: string
  oldCreatedAt?: string
  oldUpdatedAt?: string
} & MicroCMSListContent

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY
})

export const getBlogs = async (queries?: MicroCMSQueries) => {
  return await client.getList<Blog>({ endpoint: 'blogs', queries })
}

export const getBlogDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  return await client.getListDetail<Blog>({
    endpoint: 'blogs',
    contentId,
    queries
  })
}
