// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import UnoCSS from 'unocss/astro'
import vercel from '@astrojs/vercel'

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.snowsphere.net',
  integrations: [mdx(), sitemap(), UnoCSS({
    injectReset: true
  })],
  markdown: {
    shikiConfig: {
      theme: 'dark-plus'
    }
  },
  output: 'server',
  adapter: vercel({
    isr: {
      bypassToken: import.meta.env.VERCEL_REVALIDATE_TOKEN,
      exclude: [/^\/api\/.+/]
    },
    webAnalytics: {
      enabled: true,
    },
  }),
})
