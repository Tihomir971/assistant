<script>
	import { catalogStore, selectFamilies } from '$lib/catalog/catalogStore';
	import { DataTable, DataTableSkeleton } from 'carbon-components-svelte';

	let promise = selectFamilies();
</script>

{#await promise}
	<DataTableSkeleton showHeader={false} rows={2} />
{:then data}
	<DataTable
		headers={[
			{ key: 'name', value: 'Name' },
			{ key: 'protocol', value: 'Protocol' },
			{ key: 'port', value: 'Port' },
			{ key: 'rule', value: 'Rule' }
		]}
		rows={[
			{
				id: 'a',
				name: 'Load Balancer 3',
				protocol: 'HTTP',
				port: 3000,
				rule: 'Round robin'
			},
			{
				id: 'b',
				name: 'Load Balancer 1',
				protocol: 'HTTP',
				port: 443,
				rule: 'Round robin'
			},
			{
				id: 'c',
				name: 'Load Balancer 2',
				protocol: 'HTTP',
				port: 80,
				rule: 'DNS delegation'
			},
			{
				id: 'd',
				name: 'Load Balancer 6',
				protocol: 'HTTP',
				port: 3000,
				rule: 'Round robin'
			},
			{
				id: 'e',
				name: 'Load Balancer 4',
				protocol: 'HTTP',
				port: 443,
				rule: 'Round robin'
			},
			{
				id: 'f',
				name: 'Load Balancer 5',
				protocol: 'HTTP',
				port: 80,
				rule: 'DNS delegation'
			}
		]}
	/>
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}
