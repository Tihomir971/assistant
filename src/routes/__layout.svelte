<script>
	import 'carbon-components-svelte/css/g90.css';
	import { Content, Grid } from 'carbon-components-svelte';
	import Header from '$lib/Header.svelte';
</script>

<Header />

<Content style="padding: 0">
	<Grid fullWidth>
		<slot />
	</Grid>
</Content>
