<script>
	import 'carbon-components-svelte/css/all.css';
	import Theme from '../lib/ui/Theme.svelte';
	import Header from '$lib/ui/Header.svelte';
	import { Content, Grid } from 'carbon-components-svelte';
</script>

<Theme persist>
	<Header />

	<Content
		style="background-image: url('../static/sun-tornado.svg'); background-size: cover;padding-left: 0; padding-right: 0; min-height: calc(100vh - 3rem)"
	>
		<Grid fullWidth>
			<slot />
		</Grid>
	</Content>
</Theme> 
