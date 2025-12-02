import { createGenerator } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'

const preset = presetWebFonts({
  provider: 'fontsource',
  fonts: {
    main: 'M PLUS 2',
    monospace: 'M PLUS 1 Code',
  },
  processors: createLocalFontProcessor({
    cacheDir: 'node_modules/.cache/fonts',
    fontAssetsDir: 'public/assets/fonts',
    fontServeBaseUrl: '/assets/fonts',
  }),
})

const uno = createGenerator({ presets: [preset] })

try {
  // Running once is enough to download the fonts and write the cached CSS
  uno.then((u) => u.generate('', { preflights: true })).then(() => console.log('Webfont cache warmed: public/assets/fonts'))
} catch (error) {
  console.error('Failed to warm the webfont cache')
  console.error(error)
  process.exit(1)
}
