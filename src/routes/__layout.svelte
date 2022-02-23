<script>
	import 'carbon-components-svelte/css/all.css';
	import Theme from '$lib/UI/Theme.svelte';
	import Header from '$lib/UI/Header.svelte';
	import { Content, Grid } from 'carbon-components-svelte';
</script>

<Theme persist>
	<Header />

	<Content style="padding-left: 0;padding-right: 0;background: none">
		<Grid fullWidth>
			<slot />
		</Grid>
	</Content>
</Theme>
