import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Byte',
			social: {
				github: 'https://github.com/bit-js/byte',
			},
			sidebar: [
				{
					label: 'Start',
					link: '/start'
				},
				{
					label: 'Concepts',
					items: [
						{ label: 'Routing', link: '/concepts/routing' },
						{ label: 'Context', link: '/concepts/context' }
					]
				}
			],
		}),
	],
});
