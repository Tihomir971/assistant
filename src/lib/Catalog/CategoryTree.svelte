<script>
	import { catalogStore } from './catalogStore.js';
	import { supabase } from '$lib/supabaseClient';
	import UpdateNow20 from 'carbon-icons-svelte/lib/UpdateNow20';
	import {
		TreeView,
		Toolbar,
		Button,
		ToolbarContent,
		ToolbarSearch
	} from 'carbon-components-svelte';

	export let activeId = '';

	async function fetchData() {
		const user = supabase.auth.user();

		let { data, error } = await supabase.from('product_category').select('id,name,parent_id');
		if (error) throw new Error(error.message);

		//Change column name
		data.forEach((item) => {
			item.text = item.name;
			delete item.name;
		});

		//Create Tree from Array
		function createDataTree(dataset) {
			const hashTable = Object.create(null);
			dataset.forEach((aData) => (hashTable[aData.id] = { ...aData, children: [] }));

			const dataTree = [];
			dataset.forEach((aData) => {
				if (aData.parent_id) hashTable[aData.parent_id].children.push(hashTable[aData.id]);
				else dataTree.push(hashTable[aData.id]);
				delete hashTable[aData.id].parent_id;
			});

			const cleanUp = (data) =>
				data.forEach((n) =>
					n.children && n.children.length ? cleanUp(n.children) : delete n.children
				);

			cleanUp(dataTree);

			console.log('dataTree', dataTree);
			return dataTree;
		}

		let children = createDataTree(data);

		/* 		const findObj = (arr) => {
			for (const item of arr) {
				if (item.children.length === 0) {
					console.log('Before Del', item);
					delete item.parent_id;
					console.log('After Del', item);
				}
				if (item.children.length > 0) findObj(item.children);
				return;
			}
		};
		findObj(children);
		console.log(children); */

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
