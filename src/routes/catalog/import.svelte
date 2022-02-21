<script>
	import { FileUploader } from 'carbon-components-svelte';
	let files;
	$: console.log('$ bind', files);

	import Papa from 'papaparse';

	function handleChange(e) {
		console.log('Pre', files);
		files = e.target.files;
		console.log('Posle', files);
		for (let f of files) {
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
	bind:files
	accept={['.csv']}
	buttonLabel="Add .CSV file"
	status="edit"
	on:change={handleChange}
/>
