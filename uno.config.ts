import { defineConfig, presetMini, presetWebFonts, transformerDirectives } from 'unocss'

export default defineConfig({
  transformers: [
    transformerDirectives()
  ],
  presets: [
    presetMini(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        main: 'M PLUS 1 Code Variable',
        title: 'DotGothic16'
      }
    })
  ]
})