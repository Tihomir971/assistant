<script>
	import { catalogStore } from './catalogStore.js';

	import { supabase } from '$lib/supabaseClient';
	import {
		Button,
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		DataTableSkeleton,
		ToolbarMenuItem
	} from 'carbon-components-svelte';
	import UpdateNow20 from 'carbon-icons-svelte/lib/UpdateNow20';

	$: $catalogStore, (promise = fetchData());

	async function fetchData() {
		const user = supabase.auth.user();

		let { data, error } = await supabase
			.from('product')
			.select()
			.eq('product_category_id', $catalogStore);
		if (error) throw new Error(error.message);
		return data;
	}
	let promise = fetchData();
</script>

{#await promise}
	<DataTableSkeleton showHeader={false} />
{:then data}
	<DataTable
		headers={[
			{ key: 'id', value: 'ID' },
			{ key: 'sku', value: 'SKU' },
			{ key: 'name', value: 'Name' },
			{
				key: 'product_category_id',
				value: 'Parent',
				display: (cost) => cost + ' €'
			},
			{
				key: 'created_at',
				value: 'Created',
				display: (date) => date.toLocaleString('en-GB')
			}
		]}
		rows={data}
		sortable
	>
		<Toolbar>
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
