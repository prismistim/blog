import { defineConfig, presetWebFonts, transformerDirectives, presetWind4, presetIcons } from 'unocss'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import type { WebFontsOptions } from '@unocss/preset-web-fonts'

export const fontConfig: WebFontsOptions = {
  provider: 'fontsource',
  fonts: {
    main: ['Ubuntu Sans', 'IBM Plex Sans JP'],
    monospace: 'M PLUS 1 Code',
  },
  processors: createLocalFontProcessor({
    cacheDir: 'node_modules/.cache/fonts',
    fontAssetsDir: 'public/assets/fonts',
    fontServeBaseUrl: '/assets/fonts',
  })
}

export default defineConfig({
  transformers: [
    transformerDirectives()
  ],
  presets: [
    presetWind4(),
    presetWebFonts(fontConfig),
    presetIcons({
      collections: {
        mynaui: () => import('@iconify-json/mynaui/icons.json').then(i => i.default)
      }
    })
  ]
})