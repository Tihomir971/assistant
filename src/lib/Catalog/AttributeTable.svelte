<script>
	import { catalogStore, selectAttribute } from '$lib/catalog/catalogStore';
	import { DataTable, DataTableSkeleton } from 'carbon-components-svelte';

	let familyData = selectAttribute();
	console.log('selectAttribute', familyData);
</script>

{#await familyData}
	<DataTableSkeleton showHeader={false} rows={2} />
{:then data}
	<DataTable headers={[{ key: 'code', value: 'Attribute' }]} rows={data} />
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}
