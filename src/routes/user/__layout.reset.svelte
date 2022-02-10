<script>
	import 'carbon-components-svelte/css/g90.css';
	import Header from '$lib/UI/HeaderAuth.svelte';
	import { Content, Grid } from 'carbon-components-svelte';
</script>

<Header />
<Content
	style="background-image: url('../static/sun-tornado.svg');background-size: cover;padding: 0; min-height: calc(100vh - 3rem); align-items: center; justify-content: center; display: flex"
>
	<slot />
</Content>
