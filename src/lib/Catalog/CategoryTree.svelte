<script>
	import { supabase } from '$lib/supabaseClient';
	import { TreeView } from 'carbon-components-svelte';

	let loading = true;

	async function getData() {
		loading = true;
		const user = supabase.auth.user();

		let { data: children, error } = await supabase
			.from('catalog_category')
			.select('id,name,parent_id')
			.limit(5);
		if (error) throw new Error(error.message);

		//Change column name
		children.forEach((item) => {
			item.text = item.name;
			delete item.name;
			delete item.parent_id;
		});

		return children;
	}
</script>

{#await getData()}
	<p>Fetching data...</p>
{:then children}
	<TreeView {children} labelText="Categories" />
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}
