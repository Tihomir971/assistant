<script>
	import { catalogStore } from './catalogStore.js';
	import { supabase } from '$lib/db';
	import db from '$lib/db';
	import UpdateNow20 from 'carbon-icons-svelte/lib/UpdateNow20';
	import Minimize20 from 'carbon-icons-svelte/lib/Minimize20';
	import {
		TreeView,
		Toolbar,
		Button,
		ToolbarContent,
		ToolbarSearch
	} from 'carbon-components-svelte';

	export let activeId = '';
	let value = '';
	let treeview = null;
	let expandedIds = [];

	/* $: value, treeview?.expandNodes((node) => /^IBM/.test(node.text)); */

	async function fetchData() {
		// let { data, error } = await supabase.from('product_category').select('id,name,parent_id');
		// if (error) throw new Error(error.message);
		const data = await db.getCategory();

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

			return dataTree;
		}

		let children = createDataTree(data);

		return children;
	}
	let promise = fetchData();
</script>

<Toolbar>
	<ToolbarContent>
		<Button
			kind="ghost"
			size="field"
			iconDescription="Refresh"
			icon={UpdateNow20}
			on:click={() => {
				promise = fetchData();
			}}
		/>
		<Button
			kind="ghost"
			size="field"
			iconDescription="Collapse All"
			icon={Minimize20}
			on:click={treeview?.collapseAll}
		/>
		<ToolbarSearch bind:value />
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
		bind:expandedIds
		bind:this={treeview}
		on:toggle={() => {
			console.log('activeId', activeId);
			console.log('expandedIds', expandedIds);
		}}
		on:select={() => {
			console.log('Sel activeId', activeId);
			console.log('Sel expandedIds', expandedIds);
			catalogStore.set(activeId);
		}}
	/>
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}
