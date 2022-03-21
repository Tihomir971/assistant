<script>
	import { selectAttributeOption } from '$lib/catalog/catalogStore';
	import AddAlt16 from 'carbon-icons-svelte/lib/AddAlt16';
	import SubtractAlt16 from 'carbon-icons-svelte/lib/SubtractAlt16';
	import Edit16 from 'carbon-icons-svelte/lib/Edit16';
	import {
		DataTable,
		DataTableSkeleton,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		Button
	} from 'carbon-components-svelte';

	let attributeOptionData = selectAttributeOption();
</script>

{#await attributeOptionData}
	<DataTableSkeleton showHeader={false} rows={2} />
{:then data}
	<DataTable headers={[{ key: 'code', value: 'Option' }]} rows={data}>
		<Toolbar>
			<ToolbarContent>
				<ToolbarSearch persistent shouldFilterRows />
				<Button kind="ghost" size="field" iconDescription="Add" icon={AddAlt16} />
				<Button kind="ghost" size="field" iconDescription="Delete" icon={SubtractAlt16} />
				<Button kind="ghost" size="field" iconDescription="Edit" icon={Edit16} />
			</ToolbarContent>
		</Toolbar>
	</DataTable>
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}
