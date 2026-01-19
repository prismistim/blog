import presetWebFonts from '@unocss/preset-web-fonts'
import { createGenerator } from 'unocss'
import { fontConfig } from '../uno.config.js'

const preset = presetWebFonts(fontConfig)

try {
  const uno = await createGenerator({ presets: [preset] })
  await uno.generate('', { preflights: true })
  console.log('Webfont cached: public/assets/fonts')
} catch (error) {
  console.error(`Failed to prefetch!: ${error}`)
  process.exit(1)
}
