<script>
	import { catalogStore } from './catalogStore.js';

	import { supabase } from '$lib/supabaseClient';
	import {
		Button,
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		ToolbarMenu,
		ToolbarMenuItem
	} from 'carbon-components-svelte';
	import UpdateNow20 from 'carbon-icons-svelte/lib/UpdateNow20';

	$: $catalogStore, fetchData();

	async function fetchData() {
		const user = supabase.auth.user();

		let { data, error } = await supabase
			.from('catalog_products')
			.select()
			.eq('product_category_id', $catalogStore);
		if (error) throw new Error(error.message);
		return data;
	}
	let promise = fetchData();
</script>

{#await promise}
	<p>Fetching data...</p>
{:then data}
	{$catalogStore}
	<DataTable
		headers={[
			{ key: 'id', value: 'ID' },
			{ key: 'sku', value: 'SKU' },
			{ key: 'name', value: 'Name' },
			{ key: 'product_category_id', value: 'Parent' },
			{ key: 'created_at', value: 'Created' }
		]}
		rows={data}
		sortable
	>
		<svelte:fragment slot="cell" let:row let:cell>
			{#if row[cell.key] === null}
				<span />
			{:else}
				{row[cell.key]}
			{/if}
		</svelte:fragment>
		<Toolbar>
			<ToolbarContent>
				<ToolbarSearch />
				<Button
					kind="tertiary"
					size="field"
					iconDescription="Refresh"
					icon={UpdateNow20}
					on:click={() => {
						promise = fetchData();
					}}
				/>
			</ToolbarContent>
		</Toolbar>
	</DataTable>
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}
