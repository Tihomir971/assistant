import adapter from '@sveltejs/adapter-node';

import { optimizeImports } from 'carbon-preprocess-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [optimizeImports()],
	kit: {
		target: '#svelte',
		adapter: adapter()
	}
};

export default config;
