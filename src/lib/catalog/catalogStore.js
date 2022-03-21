import { supabase } from '$lib/db.js';
import { writable } from 'svelte/store';

export let catalogStore = writable(0);
export let productFilter = writable({ filterOnHand: false, activeCategory: 999999 });

// Category Tables
export const selectCategory = async () => {
	const { data, error } = await supabase.from('product_category').select('id,name,parent_id');

	// Sort Tree by name
	data.sort((a, b) => {
		let fa = a.name.toLowerCase(),
			fb = b.name.toLowerCase();

		if (fa < fb) {
			return -1;
		}
		if (fa > fb) {
			return 1;
		}
		return 0;
	});
	if (error) {
		return console.error(error);
	}
	return data;
};

export const insertCategory = async (newCategory) => {
	const { data, error } = await supabase.from('product_category').insert({ name: newCategory });
	if (error) {
		return console.error(error);
	}
	return data;
};

// Product Tables
export const upsertProduct = async (productRow) => {
	try {
		const { data, error } = await supabase
			.from('product')
			.upsert(productRow, { onConflict: 'sku' });

		if (data) return data;
		return error;
	} catch (error) {
		console.error('update error', error);
		return error;
	}
};

export const selectProduct = async (id) => {
	const { data, error } = await supabase.from('product').select().eq('id', id);
	if (data) return data[0];
	return error;
};

export const deleteProduct = async (selectedRowIds) => {
	for (let i = 0; i < selectedRowIds.length; i++) {
		console.log('Delete data', selectedRowIds[i]);
		const { data, error } = await supabase.from('product').delete().eq('id', selectedRowIds[i]);
		if (error) return error;
		if (data) return data;
	}
};

// Product Attribute Tables
export const selectAttribute = async () => {
	const { data, error } = await supabase
		.from('product_attribute')
		.select()
		.order('code', { ascending: true });
	if (error) return error;
	if (data) return data;
};

// Product Attribute Option Tables
export const selectAttributeOption = async () => {
	const { data, error } = await supabase
		.from('product_attribute_option')
		.select()
		.order('code', { ascending: true });
	if (error) return error;
	if (data) return data;
};

// export family {
// 		delete: async (id) => {
// 			const { data, error } = await supabase.from('product_family').delete().eq('id', id);
// 			if (data) console.log(data);
// 			if (error) console.log(error);
// 		},
// 		select: async () => {
// 			const { data, error } = await supabase
// 				.from('product_family')
// 				.select()
// 				.order('code', { ascending: true });
// 			if (error) console.log(error);
// 			return data;
// 		}
// 	}
// };

export const familySelect = async () => {
	const { data, error } = await supabase
		.from('product_family')
		.select()
		.order('code', { ascending: true });
	if (error) console.log(error);
	return data;
};
export const familyDelete = async (id) => {
	const { data, error } = await supabase.from('product_family').delete().eq('id', id);
	if (error) console.log(error);
	return data;
};
export const familyAdd = async () => {
	console.log('id');
};
