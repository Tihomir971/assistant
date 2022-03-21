<script>
	import { Modal, Grid, Row, Column, ComboBox, TextInput, Toggle } from 'carbon-components-svelte';
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
	<Grid fullWidth>
		<Row>
			<Column lg={4}>
				<TextInput labelText="ID" bind:value={id} />
			</Column>
			<Column lg={4}>
				<TextInput labelText="SKU" bind:value={sku} />
			</Column>
			<Column lg={4}>
				<ComboBox
					titleText="Condition"
					placeholder="Select condition"
					items={[
						{ id: '0', text: 'New' },
						{ id: '1', text: 'Used' },
						{ id: '2', text: 'Refurbished' }
					]}
				/>
				<TextInput labelText="Condition" bind:value={condition} />
			</Column>
			<Column lg={4}>
				<Toggle labelText="Enabled" bind:toggled={enabled} />
			</Column>
		</Row>

		<TextInput labelText="Brand" bind:value={brand} />
		<TextInput labelText="MPN" bind:value={mpn} />
		<TextInput labelText="Name" bind:value={name} />

		<TextInput labelText="Barcode" bind:value={barcode} />
		<TextInput labelText="Pricelastpo" bind:value={pricelastpo} />
		<TextInput labelText="Price" bind:value={price} />
		<TextInput labelText="Special_price" bind:value={special_price} />
		<TextInput labelText="Product_category_id" bind:value={product_category_id} />
		<TextInput labelText="Qtyonhand" bind:value={qtyonhand} />
		<Row>
			<Column lg={8}>
				<p>{created}</p>
				<TextInput labelText="Created" bind:value={created} />
			</Column>
			<Column lg={8}>
				<TextInput labelText="Updated" bind:value={updated} />
			</Column>
		</Row>
		<TextInput labelText="Attributes" bind:value={attributes} />
	</Grid>
</Modal>
