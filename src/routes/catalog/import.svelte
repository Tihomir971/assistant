<script>
	import { FileUploader } from 'carbon-components-svelte';
	import Papa from 'papaparse';
	import {
		selectCategory,
		insertCategory,
		updateProduct,
		selectProduct
	} from '$lib/stores/catalog';

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
		const categoryData = await selectCategory();
		let result;
		let existingProduct = null;
		let prodId;
		for (let i = 0; i < products.length; i++) {
			let selectedCategoryRow = categoryData.find((x) => x.name === products[i].category);
			if (!selectedCategoryRow) {
				selectedCategoryRow = insertCategory(products[i].category);
			}

			existingProduct = await selectProduct(products[i].sku);
			// console.log('existingProduct', existingProduct);

			let productRow = {
				sku: products[i].sku,
				brand: products[i].brand,
				mpn: products[i].mpn,
				name: products[i].name,
				// gtin: products[i].gtin,
				price: products[i].price,
				qtyonhand: products[i].qty,
				condition: products[i].condition,
				pricelastpo: products[i].pricelastpo,
				special_price: products[i].special_price,
				product_category_id: selectedCategoryRow.id,
				updated: new Date()
			};
			if (existingProduct.length != 0) productRow.id = existingProduct[0].id;
			result = await updateProduct(productRow, products[i].sku);
			productRow = [];
			// console.log('Update result', result);
		}
	}
</script>

<FileUploader
	accept={['.csv']}
	buttonLabel="Add .CSV file"
	status="edit"
	on:change={handleChange}
/>
