<script>
	import { supabase } from '$lib/db';
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

	async function fetchData() {
		const user = supabase.auth.user();

		let { data, error } = await supabase.from('warehouse').select();
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
			{ key: 'isactive', value: 'Activ' },
			{ key: 'code', value: 'Code' },
			{ key: 'name', value: 'Name' },
			{ key: 'ad_client_id', value: 'Client' },
			{
				key: 'created',
				value: 'Created',
				display: (date) => {
					const event = new Date(date);
					return event.toLocaleTimeString('sr-Latn');
				}
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
