import { defineConfig, presetMini, presetWebFonts, transformerDirectives, presetWind4 } from 'unocss'

export default defineConfig({
  transformers: [
    transformerDirectives()
  ],
  presets: [
    // presetMini(),
    presetWind4(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        main: 'M PLUS 2',
        title: 'M PLUS 2'
      }
    })
  ]
})