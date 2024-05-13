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
					label: 'Guides',
					items: [
						{ label: 'Getting Started', link: '/guides/start' },
						{ label: 'Benchmarking', link: '/guides/benchmarking' }
					]
				},
				{
					label: 'Concepts',
					items: [
						{ label: 'Routing', link: '/concepts/routing' },
						{ label: 'Context', link: '/concepts/context' },
						{ label: 'Validators', link: '/concepts/validator' },
						{ label: 'Middlewares', link: '/concepts/middleware' },
						{ label: 'Plugins', link: '/concepts/plugin' }
					]
				},
				{
					label: 'Patterns',
					items: [
						{ label: 'Basic Patterns', link: '/patterns/basic' },
						{ label: 'MVC Pattern', link: '/patterns/mvc' }
					]
				},
				{
					label: 'Utilities',
					items: [
						{ label: 'Static Responses', link: '/utils/response' },
						{ label: 'Handling CORS', link: '/utils/cors' },
						{ label: 'CSRF Protection', link: '/utils/csrf' },
						{ label: 'Query Parsing', link: '/utils/query' },
						{ label: 'App Client', link: '/utils/client' }
					]
				}
			]
		}),
	],
});
