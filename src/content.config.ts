import { defineCollection, z } from 'astro:content'
import { createClient } from 'microcms-js-sdk'

export type Tag = {
  name: string
}

export type Categories = {
  title: string
}

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY
})

const microCMSLoader = (endpoint: string) => {
  return async () => {
    try {
      const res = await client.getAllContents({
        endpoint
      })

      return res
    } catch (err) {
      console.log(err)
      return []
    }
  }
}

const dataFields = {
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  revisedAt: z.string()
}

const blogs = defineCollection({
  loader: microCMSLoader('blogs'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
    isCW: z.boolean(),
    isHidden: z.boolean(),
    oldUpdatedAt: z.string().optional(),
    tags: z.array(
      z.object({
        name: z.string()
      })
    ),
    ...dataFields
  })
})

export const collections = {
  blogs
}
