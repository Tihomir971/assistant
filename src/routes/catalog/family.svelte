<script>
	import FamilyTable from '$lib/catalog/FamilyTable.svelte';
	import AttributeTable from '$lib/catalog/AttributeTable.svelte';
	import AttributeOptionTable from '$lib/catalog/AttributeOptionTable.svelte';
	import { Row, Column } from 'carbon-components-svelte';
</script>

<Row>
	<Column lg={5} noGutterRight><FamilyTable /></Column>
	<Column lg={5} noGutterRight><AttributeTable /></Column>
	<Column lg={5} noGutterRight><AttributeOptionTable /></Column>
</Row>
