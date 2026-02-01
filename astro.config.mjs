import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.snowsphere.net',
  image: {
    domains: ['images.microcms-assets.io'],
  },
  integrations: [
    mdx(),
    sitemap(),
    UnoCSS({
      injectReset: true,
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'dark-plus',
    },
  },
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
})
