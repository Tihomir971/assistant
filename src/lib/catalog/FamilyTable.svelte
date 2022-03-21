<script>
	import { familySelect, familyDelete, familyAdd, familyUpdate } from '$lib/catalog/catalogStore';
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

	let selectedRow = [];
	let openCreate = false;
	let openDelete = false;
	let openEdit = false;
	let familyData = familySelect();
	let code = null;
</script>

{#await familyData}
	<DataTableSkeleton showHeader={false} rows={2} />
{:then data}
	<DataTable
		headers={[{ key: 'code', value: 'Family' }]}
		rows={data}
		on:click:row={(e) => {
			selectedRow = e.detail;
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
				<Button
					kind="ghost"
					size="field"
					iconDescription="Edit"
					icon={Edit16}
					on:click={() => (openEdit = true)}
				/>
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
		familyAdd(code);
		openCreate = false;
		familyData = familySelect();
	}}
>
	<p>Add new product Family.</p>
	<TextInput bind:value={code} placeholder="Family name..." />
</Modal>

<Modal
	danger
	bind:open={openDelete}
	modalHeading="Delete Family: {selectedRow.code} "
	primaryButtonText="Delete"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (openDelete = false)}
	on:open
	on:close
	on:submit={() => {
		familyDelete(selectedRow.id);
		openDelete = false;
		familyData = familySelect();
	}}
>
	<p>This is a permanent action and cannot be undone.</p>
</Modal>

<Modal
	danger
	bind:open={openEdit}
	modalHeading="Edit Family: {selectedRow.code} "
	primaryButtonText="Save"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (openEdit = false)}
	on:open
	on:close
	on:submit={() => {
		familyUpdate(selectedRow.id, selectedRow.code);
		selectedRow.code = [];
		openEdit = false;
		familyData = familySelect();
	}}
>
	<div><h6>This will rename Family name.</h6></div>
	<TextInput bind:value={selectedRow.code} placeholder="Family name..." />
</Modal>

<style>
	div {
		margin-bottom: var(--cds-spacing-03, 0.5rem);
	}
</style>
