<script>
	import CategoryTree from '$lib/catalog/CategoryTree.svelte';
	import ProductTable from '$lib/catalog/ProductTable.svelte';
	import { Row, Column } from 'carbon-components-svelte';
</script>

<Row>
	<Column lg={3} noGutter><CategoryTree /></Column>
	<Column lg={13} noGutterRight><ProductTable /></Column>
</Row>
