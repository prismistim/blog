/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Fira Code Variable', 'Kosugi'],
				title: ['DotGothic16']
			}
		},
	},
	plugins: [],
}
