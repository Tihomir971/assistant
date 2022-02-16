<script>
	import { catalogStore } from './catalogStore.js';
	import { supabase } from '$lib/supabaseClient';
	import UpdateNow20 from 'carbon-icons-svelte/lib/UpdateNow20';
	import {
		TreeView,
		Toolbar,
		Button,
		ToolbarContent,
		ToolbarSearch,
		ToolbarMenu,
		ToolbarMenuItem
	} from 'carbon-components-svelte';

	export let activeId = '';

	async function fetchData() {
		const user = supabase.auth.user();
		console.log(user);

		let { data, error } = await supabase.from('product_category').select('id,name,parent_id');
		if (error) throw new Error(error.message);

		//Change column name
		data.forEach((item) => {
			item.text = item.name;
			delete item.name;
		});

		//Create Tree from Array
		const createDataTree = (dataset) => {
			const hashTable = Object.create(null);
			dataset.forEach((aData) => (hashTable[aData.id] = { ...aData, children: [] }));
			const dataTree = [];
			dataset.forEach((aData) => {
				if (aData.parent_id) hashTable[aData.parent_id].children.push(hashTable[aData.id]);
				else dataTree.push(hashTable[aData.id]);
			});
			return dataTree;
		};

		let children = createDataTree(data);

		//remove From Tree :(

		return children;
	}
	let promise = fetchData();
</script>

<Toolbar>
	<ToolbarContent>
		<ToolbarSearch />
		<Button
			kind="ghost"
			size="field"
			iconDescription="Refresh"
			icon={UpdateNow20}
			on:click={() => {
				promise = fetchData();
			}}
		/>
	</ToolbarContent>
</Toolbar>
{#await promise}
	<p>Fetching data...</p>
{:then children}
	<TreeView
		style="overflow: auto"
		hideLabel="true"
		{children}
		bind:activeId
		on:select={() => {
			catalogStore.set(activeId);
		}}
	/>
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}
