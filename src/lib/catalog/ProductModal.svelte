<script>
	import { Modal, TextInput, Toggle } from 'carbon-components-svelte';
	export let openEdit = false;
	export let name;
	export let brand;
	export let condition;
	export let enabled;
	export let barcode;
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
	let editProduct;
	editProduct = {
		brand: brand,
		condition: condition,
		enabled: enabled,
		barcode: barcode,
		id: id,
		mpn: mpn,
		price: price,
		pricelastpo: pricelastpo,
		product_category_id: product_category_id,
		qtyonhand: qtyonhand,
		sku: sku,
		special_price: special_price,
		attributes: attributes,
		updated: updated,
		created: created
	};
	$: editProduct.name = { name };
	$: editProduct.brand = { brand };
	$: editProduct.condition = { condition };
	$: editProduct.enabled = { enabled };
	$: editProduct.barcode = { barcode };
	$: editProduct.id = { id };
	$: editProduct.mpn = { mpn };
	$: editProduct.price = { price };
	$: editProduct.pricelastpo = { pricelastpo };
	$: editProduct.product_category_id = { product_category_id };
	$: editProduct.qtyonhand = { qtyonhand };
	$: editProduct.sku = { sku };
	$: editProduct.special_price = { special_price };
	$: editProduct.attributes = { attributes };
	$: editProduct.updated = { updated };
	$: editProduct.created = { created };
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
	<TextInput labelText="barcode" bind:value={barcode} />
	<TextInput labelText="pricelastpo" bind:value={pricelastpo} />
	<TextInput labelText="price" bind:value={price} />
	<TextInput labelText="special_price" bind:value={special_price} />
	<TextInput labelText="product_category_id" bind:value={product_category_id} />
	<TextInput labelText="qtyonhand" bind:value={qtyonhand} />
	<TextInput labelText="created" bind:value={created} />
	<TextInput labelText="updated" bind:value={updated} />
	<TextInput labelText="attributes" bind:value={attributes} />
</Modal>
