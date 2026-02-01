import { createHighlighter } from 'shiki'

export const highlighter = await createHighlighter({
  themes: ['dark-plus'],
  langs: ['js', 'ts', 'tsx', 'json', 'css', 'astro', 'jsonc'],
})
