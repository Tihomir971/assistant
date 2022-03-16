<script>
	import FamilyTable from '$lib/catalog/FamilyTable.svelte';
	import AttributeData from '$lib/catalog/AttributeTable.svelte';
	import AttributeOption from '$lib/catalog/AttributeOption.svelte';
	import { Row, Column } from 'carbon-components-svelte';
</script>

<Row>
	<Column lg={5} noGutterRight><FamilyTable /></Column>
	<Column lg={5} noGutterRight><AttributeData /></Column>
	<Column lg={5} noGutterRight><AttributeOption /></Column>
</Row>
