<script>
	import { FileUploader } from 'carbon-components-svelte';
	import Papa from 'papaparse';
	import { supabase } from '$lib/db';

	let product = [];

	function handleChange(e) {
		product = [];
		for (let f of e.detail) {
			Papa.parse(f, {
				header: true,
				skipEmptyLines: true,
				step: function (results, parser) {
					var hash = {};

					// element.sku = results.data.sku;
					// element.brand = results.data.brand;
					// element.mpn = results.data.mpn;
					hash.name = results.data.name;
					// element.gtin = results.data.gtin;
					// element.updated = new Date();
					product.push(hash);
				}
			});
			createProduct();
		}
	}

	async function createProduct() {
		console.log('In function');
		product.forEach((element) => {
			async () => {
				try {
					// const user = supabase.auth.user();
					console.log('Row data:', product);

					let { error } = await supabase.from('product').insert(element);
					if (error) throw error;
				} catch (error) {
					console.log('Update error', error);
					alert(error.message);
				}
			};
		});
	}
</script>

<FileUploader
	accept={['.csv']}
	buttonLabel="Add .CSV file"
	status="edit"
	on:change={handleChange}
/>
