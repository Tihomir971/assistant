<script>
	import { FileUploader } from 'carbon-components-svelte';
	import Papa from 'papaparse';
	import { selectCategory, insertCategory, upsertProduct } from '$lib/catalog/catalogStore';

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
		let result;
		const categoryData = await selectCategory();
		for (let i = 0; i < products.length; i++) {
			let selectedCategoryRow = categoryData.find((x) => x.name === products[i].category);
			console.log('selectedCategoryRow', selectedCategoryRow);
			if (!selectedCategoryRow) {
				selectedCategoryRow = { id: null };
				console.log('selectedCategoryRow.Id', selectedCategoryRow.id);
				// if (!products[i].category) {
				// 	selectedCategoryRow = 'Neklasifikovano';
				// } else {
				// 	selectedCategoryRow = insertCategory(products[i].category);
				// }
			}

			let productRow = {
				sku: products[i].sku,
				brand: products[i].brand,
				mpn: products[i].mpn,
				name: products[i].name,
				// barcode: products[i].barcode,
				price: products[i].price,
				qtyonhand: products[i].qty,
				condition: products[i].condition,
				pricelastpo: products[i].pricelastpo,
				special_price: products[i].special_price,
				product_category_id: selectedCategoryRow.id,
				updated: new Date()
			};
			result = await upsertProduct(productRow);
			productRow = [];
		}
		console.log('Finsih upsert');
	}
</script>

<FileUploader
	accept={['.csv']}
	buttonLabel="Add .CSV file"
	status="edit"
	on:change={handleChange}
/>
