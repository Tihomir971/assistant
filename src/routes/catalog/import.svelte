<script>
	import { FileUploader } from 'carbon-components-svelte';
	import Papa from 'papaparse';

	function handleChange(e) {
		for (let f of e.detail) {
			Papa.parse(f, {
				header: true,
				skipEmptyLines: true,
				complete: function (results) {
					console.log('Parsing complete', results);
				}
			});
		}
	}
</script>

<FileUploader
	accept={['.csv']}
	buttonLabel="Add .CSV file"
	status="edit"
	on:change={handleChange}
/>
