<script>
	import { catalogStore, selectCategory } from '$lib/catalog/catalogStore';
	// import { selectCategory } from '$lib/stores/catalog';
	import UpdateNow20 from 'carbon-icons-svelte/lib/UpdateNow20';
	import Minimize20 from 'carbon-icons-svelte/lib/Minimize20';
	import AddAlt20 from 'carbon-icons-svelte/lib/AddAlt20';
	import SubtractAlt20 from 'carbon-icons-svelte/lib/SubtractAlt20';
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
		const data = await selectCategory();

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
			iconDescription="Add Category"
			icon={AddAlt20}
			on:click={() => {
				// promise = fetchData();
			}}
		/>
		<Button
			kind="ghost"
			size="field"
			iconDescription="Delete Category"
			icon={SubtractAlt20}
			on:click={() => {
				// promise = fetchData();
			}}
		/>
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
		<ToolbarSearch bind:value on:input={console.log(value)} />
	</ToolbarContent>
</Toolbar>
{#await promise}
	<p>Fetching data...</p>
{:then children}
	<TreeView
		style="overflow: auto; max-height: 85vh"
		hideLabel="true"
		{children}
		bind:activeId
		bind:expandedIds
		bind:this={treeview}
		on:select={() => {
			catalogStore.set(activeId);
		}}
	/>
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}
