import { defineConfig, presetWebFonts, transformerDirectives, presetWind4 } from 'unocss'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'

export default defineConfig({
  transformers: [
    transformerDirectives()
  ],
  presets: [
    presetWind4(),
    presetWebFonts({
      provider: 'fontsource',
      fonts: {
        main: 'M PLUS 2',
        monospace: 'M PLUS 1 Code'
      },
      processors: createLocalFontProcessor({
        cacheDir: 'node_modules/.cache/fonts/',
        fontAssetsDir: 'public/assets/fonts/',
        fontServeBaseUrl: '/assets/fonts/'
      })
    }),
  ]
})