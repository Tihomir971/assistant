<script>
	// import { catalogStore } from './catalogStore.js';
	import { supabase } from '$lib/db.js';
	import { catalogStore, deleteProduct, selectProduct } from '$lib/catalog/catalogStore';
	import ProductModal from '$lib/catalog/ProductModal.svelte';
	import UpdateNow20 from 'carbon-icons-svelte/lib/UpdateNow20';
	import Save16 from 'carbon-icons-svelte/lib/Save16';
	import Delete16 from 'carbon-icons-svelte/lib/Delete16';
	import {
		Button,
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		DataTableSkeleton,
		ToolbarBatchActions,
		Pagination,
		Row
	} from 'carbon-components-svelte';
	let selectedRowIds;
	let pageSize = 16;
	let page;
	let countProducts;
	let openEdit = false;
	let editProduct = null;

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
		editProduct = await selectProduct(selectedRowIds[0]);
		if (editProduct) {
			// console.log('openEditModal', editProduct);
			openEdit = true;
		}
	}

	async function deleteData() {
		await deleteProduct(selectedRowIds);
		selectedRowIds = [];
		promise = fetchData();
	}

	let promise = fetchData();
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
			{ key: 'margin', value: '%' },
			{
				key: 'special_price',
				value: 'Spec. Price',
				display: (number) =>
					new Intl.NumberFormat('sr-Latn-RS', {
						minimumFractionDigits: 2
					}).format(number)
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
				value: 'Active'
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
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'pricelastpo' || cell.key === 'price' || cell.key === 'special_price'}
				<div style="text-align:right">
					{new Intl.NumberFormat('sr-Latn-RS', { minimumFractionDigits: 2 }).format(cell.value)}
				</div>
			{:else if cell.key === 'qtyonhand'}
				<div style="text-align:right">
					{new Intl.NumberFormat('sr-Latn-RS').format(cell.value)}
				</div>
			{:else if cell.key === 'margin'}
				<div style="text-align:right">
					{new Intl.NumberFormat('sr-Latn-RS').format(
						((row.special_price / 1.2 / row.pricelastpo - 1) * 100).toFixed(2)
					)}
				</div>
			{:else if cell.key === 'enabled'}
				<div>
					{cell.value ? 'Enabled' : 'Disabled'}
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

{#if openEdit === true}
	<ProductModal openEdit {...editProduct} />
{/if}
