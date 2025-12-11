import { createGenerator } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'

const preset = presetWebFonts({
  provider: 'fontsource',
  fonts: {
    main: 'Murecho',
    monospace: 'M PLUS 1 Code',
  },
  processors: createLocalFontProcessor({
    cacheDir: 'node_modules/.cache/fonts',
    fontAssetsDir: 'public/assets/fonts',
    fontServeBaseUrl: '/assets/fonts',
  }),
})

try {
  const uno = await createGenerator({ presets: [preset] })
  await uno.generate('', { preflights: true })
  console.log('Webfont cached: public/assets/fonts')
} catch (error) {
  console.error(`Failed to prefetch!: ${error}`)
  process.exit(1)
}
