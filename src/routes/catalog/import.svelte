<script>
	import { FileUploader } from 'carbon-components-svelte';
	import Papa from 'papaparse';
	import { supabase } from '$lib/db';
	import db from '$lib/db';

	function handleChange(e) {
		const file = e.detail[0];

		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: function (results) {
				// console.table(results.data);
				importProducts(results.data);
			}
		});
	}

	async function importProducts(products) {
		const categoryData = await db.getCategory();
		// console.log('Product', products, 'Length', products.length);
		for (let i = 0; i < products.length; i++) {
			let categoryId = categoryData.find((x) => x.name === products[i].category).id;

			let { error } = await supabase
				.from('product')
				.update({
					// sku: products[i].sku,
					brand: products[i].brand,
					mpn: products[i].mpn,
					name: products[i].name,
					gtin: products[i].gtin,
					price: products[i].price,
					qtyonhand: products[i].qty,
					condition: products[i].condition,
					pricelastpo: products[i].pricelastpo,
					special_price: products[i].special_price,
					product_category_id: categoryId,
					updated: new Date()
				})
				.eq('sku', products[i].sku);
			if (error) console.log('error', error);
		}
	}
</script>

<FileUploader
	accept={['.csv']}
	buttonLabel="Add .CSV file"
	status="edit"
	on:change={handleChange}
/>
