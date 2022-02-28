<script>
	import { FileUploader } from 'carbon-components-svelte';
	import Papa from 'papaparse';
	import { supabase } from '$lib/db';

	let product = [];

	function handleChange(e) {
		for (let f of e.detail) {
			Papa.parse(f, {
				header: true,
				skipEmptyLines: true,
				step: function (results, parser) {
					var hash = {};

					hash.sku = results.data.sku;
					hash.brand = results.data.brand;
					hash.mpn = results.data.mpn;
					hash.name = results.data.name;
					element.gtin = results.data.gtin;
					element.updated = new Date();
					product.push(hash);
				}
			});
			createProduct();
		}
	}

	async function createProduct() {
		console.log(product);
		for (let i = 0; i < product.length; i++) {
			console.log('Row data:', product[i]);
			let { error } = await supabase.from('product').insert({
				sku: product[i].sku,
				brand: product[i].brand,
				mpn: product[i].mpn,
				name: product[i].name,
				gtin: product[i].gtin,
				updated: product[i].updated
			});
		}
	}
</script>

{{ product }}
<FileUploader
	accept={['.csv']}
	buttonLabel="Add .CSV file"
	status="edit"
	on:change={handleChange}
/>
