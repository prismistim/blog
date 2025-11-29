import { defineConfig, presetWebFonts, transformerDirectives, presetWind4 } from 'unocss'

export default defineConfig({
  transformers: [
    transformerDirectives()
  ],
  presets: [
    presetWind4(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        main: 'M PLUS 2',
        monospace: 'M PLUS 1 Code'
      }
    })
  ]
})