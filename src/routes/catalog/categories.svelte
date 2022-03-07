<script>
	import CategoryTree from '$lib/catalog/CategoryTree.svelte';
	import { Row, Column } from 'carbon-components-svelte';
</script>

<Row>
	<Column lg={3}><CategoryTree /></Column>
	<Column lg={13}>Text</Column>
</Row>
