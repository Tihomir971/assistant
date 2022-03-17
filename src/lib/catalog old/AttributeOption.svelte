<script>
	import { catalogStore, selectAttributeOption } from '$lib/catalog/catalogStore';
	import { DataTable, DataTableSkeleton } from 'carbon-components-svelte';

	let attributeOptionData = selectAttributeOption();
	console.log('selectAttributeOption', attributeOptionData);
</script>

{#await attributeOptionData}
	<DataTableSkeleton showHeader={false} rows={2} />
{:then data}
	<DataTable headers={[{ key: 'code', value: 'Option' }]} rows={data} />
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}
