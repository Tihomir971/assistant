import adapter from '@sveltejs/adapter-auto';

import { optimizeImports } from 'carbon-preprocess-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [optimizeImports()],
	kit: {
		adapter: adapter({
			// default options are shown
			out: 'build',
			precompress: false,
			env: {
				path: 'SOCKET_PATH',
				host: 'HOST',
				port: 'PORT',
				origin: 'ORIGIN',
				headers: {
					protocol: 'PROTOCOL_HEADER',
					host: 'HOST_HEADER'
				}
			},
			xForwardedForIndex: -1
		})
	}
};

export default config;
