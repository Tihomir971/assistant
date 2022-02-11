<script>
	import CategoryTree from '$lib/Catalog/CategoryTree.svelte';
	import ProductTable from '$lib/Catalog/ProductTable.svelte';
	import { Row, Column } from 'carbon-components-svelte';
</script>

<Row>
	<Column lg={3}><CategoryTree /></Column>
	<Column lg={13}>Text</Column>
</Row>

<style>
</style>
