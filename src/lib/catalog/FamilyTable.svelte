<script>
	import { familySelect, familyDelete, familyAdd } from '$lib/catalog/catalogStore';
	import {
		DataTable,
		DataTableSkeleton,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		Button,
		Modal,
		TextInput
	} from 'carbon-components-svelte';
	import AddAlt16 from 'carbon-icons-svelte/lib/AddAlt16';
	import SubtractAlt16 from 'carbon-icons-svelte/lib/SubtractAlt16';
	import Edit16 from 'carbon-icons-svelte/lib/Edit16';

	let selectedRow = null;
	let openCreate = false;
	let openDelete = false;
	let familyData = familySelect();
</script>

{#await familyData}
	<DataTableSkeleton showHeader={false} rows={2} />
{:then data}
	<DataTable
		headers={[{ key: 'code', value: 'Family' }]}
		rows={data}
		on:click:row={(e) => {
			selectedRow = e.detail.id;
		}}
	>
		<Toolbar>
			<ToolbarContent>
				<ToolbarSearch persistent shouldFilterRows />
				<Button
					kind="ghost"
					size="field"
					iconDescription="Add"
					icon={AddAlt16}
					on:click={() => (openCreate = true)}
				/>
				<Button
					kind="ghost"
					size="field"
					iconDescription="Delete"
					icon={SubtractAlt16}
					on:click={() => (openDelete = true)}
				/>
				<Button kind="ghost" size="field" iconDescription="Edit" icon={Edit16} />
			</ToolbarContent>
		</Toolbar>
	</DataTable>
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}

<Modal
	bind:open={openCreate}
	modalHeading="Create Family"
	primaryButtonText="Confirm"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (openCreate = false)}
	on:open
	on:close
	on:submit={() => {
		familyAdd();
	}}
>
	<p>Inter new product Family.</p>
	<TextInput placeholder="Family name..." />
</Modal>

<Modal
	danger
	bind:open={openDelete}
	modalHeading="Delete Family"
	primaryButtonText="Delete"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (openDelete = false)}
	on:open
	on:close
	on:submit={() => {
		console.log('on:submit:Delete', selectedRow);
	}}
>
	<p>This is a permanent action and cannot be undone.</p>
</Modal>
