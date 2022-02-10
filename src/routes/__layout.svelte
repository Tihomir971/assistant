<script>
	import 'carbon-components-svelte/css/g90.css';
	import { Content, Grid } from 'carbon-components-svelte';
	import Header from '$lib/UI/Header.svelte';
</script>

<Header />

<Content style="min-height: calc(100vh - 3rem)">
	<Grid fullWidth>
		<slot />
	</Grid>
</Content>
