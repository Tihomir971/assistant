<script>
	import { Modal, TextInput, Toggle } from 'carbon-components-svelte';
	export let openEdit = false;
	// export let editProduct = {
	// 	name: null,
	// 	brand: null,
	// 	condition: null,
	// 	enabled: null,
	// 	gtin: null,
	// 	id: null,
	// 	mpn: null,
	// 	price: null,
	// 	pricelastpo: null,
	// 	product_category_id: null,
	// 	qtyonhand: null,
	// 	sku: null,
	// 	special_price: null,
	// 	attributes: null,
	// 	updated: null,
	// 	created: null
	// };
	// $: console.log('In modal', editProduct);
	export let name;
	export let brand;
	export let condition;
	export let enabled;
	export let gtin;
	export let id;
	export let mpn;
	export let price;
	export let pricelastpo;
	export let product_category_id;
	export let qtyonhand;
	export let sku;
	export let special_price;
	export let attributes;
	export let updated;
	export let created;
</script>

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
	<TextInput labelText="id" bind:value={id} />
	<Toggle labelText="Enabled" bind:toggled={enabled} />
	<TextInput labelText="sku" bind:value={sku} />
	<TextInput labelText="brand" bind:value={brand} />
	<TextInput labelText="mpn" bind:value={mpn} />
	<TextInput labelText="name" bind:value={name} />
	<TextInput labelText="condition" bind:value={condition} />
	<TextInput labelText="gtin" bind:value={gtin} />
	<TextInput labelText="pricelastpo" bind:value={pricelastpo} />
	<TextInput labelText="price" bind:value={price} />
	<TextInput labelText="special_price" bind:value={special_price} />
	<TextInput labelText="product_category_id" bind:value={product_category_id} />
	<TextInput labelText="qtyonhand" bind:value={qtyonhand} />
	<TextInput labelText="created" bind:value={created} />
	<TextInput labelText="updated" bind:value={updated} />
	<TextInput labelText="attributes" bind:value={attributes} />
</Modal>
