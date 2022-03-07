<script>
	import { catalogStore } from './catalogStore.js';
	import { supabase } from '$lib/db';
	import {
		Button,
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		DataTableSkeleton,
		ToolbarBatchActions
	} from 'carbon-components-svelte';
	import UpdateNow20 from 'carbon-icons-svelte/lib/UpdateNow20';
	import Save16 from 'carbon-icons-svelte/lib/Save16';

	$: $catalogStore, (promise = fetchData());

	async function fetchData() {
		let { data, error } = await supabase
			.from('product')
			.select()
			.eq('product_category_id', $catalogStore);
		if (error) throw new Error(error.message);
		return data;
	}
	let promise = fetchData();
	let selectedRowIds = [];
</script>

{#await promise}
	<DataTableSkeleton showHeader={false} rows={2} />
{:then data}
	<DataTable
		headers={[
			{ key: 'sku', value: 'SKU' },
			{ key: 'brand', value: 'Brand' },
			{ key: 'mpn', value: 'MPN' },
			{ key: 'name', value: 'Name' },
			// {
			// 	key: 'created',
			// 	value: 'Created',
			// 	display: (date) => date.toLocaleString('en-GB')
			// },
			{
				key: 'qtyonhand',
				value: 'Qty.'
			},
			{
				key: 'pricelastpo',
				value: 'Last Price.'
			},
			{
				key: 'special_price',
				value: 'Spec. Price'
			},
			{
				key: 'price',
				value: 'Price'
			},
			{
				key: 'condition',
				value: 'Condition'
			}
		]}
		rows={data}
		batchSelection
		bind:selectedRowIds
		sortable
	>
		<Toolbar>
			<ToolbarBatchActions>
				<Button icon={Save16}>Save</Button>
			</ToolbarBatchActions>
			<ToolbarContent>
				<ToolbarSearch />
				<Button
					kind="ghost"
					size="field"
					iconDescription="Refresh"
					icon={UpdateNow20}
					on:click={() => {
						promise = fetchData();
					}}
				/>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:row let:cell>
			{#if row[cell.key] === null}
				<span />
			{:else}
				{row[cell.key]}
			{/if}
		</svelte:fragment>
	</DataTable>
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}
