<script>
	import { catalogStore, selectFamilies } from '$lib/catalog/catalogStore';
	import { DataTable, DataTableSkeleton } from 'carbon-components-svelte';

	let selectedRowIds = [];
	$: console.log(selectedRowIds);
	let familyData = selectFamilies();
</script>

{#await familyData}
	<DataTableSkeleton showHeader={false} rows={2} />
{:then data}
	<p>{selectedRowIds}</p>
	<DataTable
		bind:selectedRowIds
		headers={[{ key: 'code', value: 'Family' }]}
		rows={data}
		on:click:row={() => {
			console.log(selectedRowIds);
		}}
	/>
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}
