<script>
	import { Row, Column } from 'carbon-components-svelte';
	import { supabase } from '$lib/db';
	import UpdateNow20 from 'carbon-icons-svelte/lib/UpdateNow20';
	import {
		Button,
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		DataTableSkeleton,
		ToolbarMenuItem
	} from 'carbon-components-svelte';

	async function fetchData() {
		const user = supabase.auth.user();

		let { data, error } = await supabase.from('ad_user').select();
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
			{ key: 'enabled', value: 'Enabled' },
			{ key: 'usename', value: 'username' },
			{ key: 'avatar_url', value: 'Avatar' },
			{ key: 'website', value: 'Web Site' },
			{ key: 'ad_clent_id', value: 'Client' },
			{
				key: 'created',
				value: 'Created',
				display: (date) => date.toLocaleString('en-GB')
			},
			{
				key: 'updated',
				value: 'Updated',
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
