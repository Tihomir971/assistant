<script>
	// import { catalogStore } from './catalogStore.js';
	import { supabase } from '$lib/db.js';
	import { catalogStore, deleteProduct, selectProduct } from '$lib/catalog/catalogStore';
	import {
		Button,
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		DataTableSkeleton,
		ToolbarBatchActions,
		Pagination,
		Modal,
		TextInput
	} from 'carbon-components-svelte';
	import UpdateNow20 from 'carbon-icons-svelte/lib/UpdateNow20';
	import Save16 from 'carbon-icons-svelte/lib/Save16';
	import Delete16 from 'carbon-icons-svelte/lib/Delete16';
	let countProducts;
	let editProduct = {
		name: null,
		brand: null,
		condition: null,
		enabled: false,
		gtin: null,
		id: null,
		mpn: null,
		price: null,
		pricelastpo: null,
		product_category_id: null,
		qtyonhand: null,
		sku: null,
		special_price: null,
		updated: null,
		created: null
	};

	$: $catalogStore, (promise = fetchData());

	async function fetchData() {
		let { data, error, count } = await supabase
			.from('product')
			.select('*', { count: 'exact' })
			.eq('product_category_id', $catalogStore)
			.not('qtyonhand', 'eq', 0);
		if (error) throw new Error(error.message);
		countProducts = count;
		return data;
	}

	async function openEditModal() {
		console.log('editProduct');
		editProduct = await selectProduct(selectedRowIds[0]);
		console.log(editProduct);
		openEdit = true;
	}

	async function deleteData() {
		await deleteProduct(selectedRowIds);
		selectedRowIds = [];
		promise = fetchData();
	}

	let promise = fetchData();
	let selectedRowIds;
	let pageSize = 16;
	let page;
	let openEdit = false;
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
				value: 'Last Price',
				display: (number) =>
					new Intl.NumberFormat('sr-Latn-RS', { minimumFractionDigits: 2 }).format(number)
			},
			{
				key: 'special_price',
				value: 'Spec. Price',
				display: (number) =>
					new Intl.NumberFormat('sr-Latn-RS', { minimumFractionDigits: 2 }).format(number)
			},
			{
				key: 'price',
				value: 'Price',
				display: (number) =>
					new Intl.NumberFormat('sr-Latn-RS', { minimumFractionDigits: 2 }).format(number)
			},
			{
				key: 'condition',
				value: 'Condition'
			},
			{
				key: 'enabled',
				value: 'Enabled'
			}
		]}
		{pageSize}
		{page}
		rows={data}
		sortable
		selectable
		bind:selectedRowIds
	>
		<Toolbar>
			<ToolbarBatchActions>
				<Button icon={Save16} on:click={openEditModal}>Edit</Button>
				<Button icon={Delete16} on:click={deleteData}>Delete</Button>
				<Button icon={Save16}>Toggle status</Button>
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
		<svelte:fragment slot="cell" let:cell>
			{#if cell.key === 'pricelastpo' || cell.key === 'price' || cell.key === 'special_price'}
				<div style="text-align:right">
					{new Intl.NumberFormat('sr-Latn-RS', { minimumFractionDigits: 2 }).format(cell.value)}
				</div>
			{:else if cell.key === 'qtyonhand'}
				<div style="text-align:right">
					{new Intl.NumberFormat('sr-Latn-RS').format(cell.value)}
				</div>
			{:else}
				{cell.value}
			{/if}
		</svelte:fragment>
		<!-- 		<svelte:fragment slot="cell" let:row let:cell>
			{#if row[cell.key] === null}
				<span />
			{:else}
				{row[cell.key]}
			{/if}
		</svelte:fragment> -->
	</DataTable>
	<Pagination totalItems={countProducts} bind:pageSize bind:page pageSizeInputDisabled />
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}

<Modal
	bind:open={openEdit}
	modalHeading="Edit product"
	primaryButtonText="Save and Close"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (openEdit = false)}
	on:open
	on:close
	on:submit
>
	<TextInput labelText="id" bind:value={editProduct.id} />
	<TextInput labelText="brand" bind:value={editProduct.brand} />
	<TextInput labelText="name" bind:value={editProduct.name} />
	<TextInput labelText="condition" bind:value={editProduct.condition} />
	<TextInput labelText="enabled" bind:value={editProduct.enabled} />
	<TextInput labelText="gtin" bind:value={editProduct.gtin} />
	<TextInput labelText="mpn" bind:value={editProduct.mpn} />
	<TextInput labelText="gtin" bind:value={editProduct.gtin} />
	<TextInput labelText="pricelastpo" bind:value={editProduct.pricelastpo} />
	<TextInput labelText="product_category_id" bind:value={editProduct.product_category_id} />
	<TextInput labelText="qtyonhand" bind:value={editProduct.qtyonhand} />
	<TextInput labelText="sku" bind:value={editProduct.sku} />
	<TextInput labelText="special_price" bind:value={editProduct.special_price} />
	<TextInput labelText="updated" bind:value={editProduct.updated} />
	<TextInput labelText="created" bind:value={editProduct.created} />
</Modal>
