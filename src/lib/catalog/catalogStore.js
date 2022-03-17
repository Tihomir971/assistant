import { supabase } from '$lib/db.js';
import { writable } from 'svelte/store';

export let catalogStore = writable(0);

// Category Tables
export const selectCategory = async () => {
	const { data, error } = await supabase.from('product_category').select('id,name,parent_id');
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

// Product Family Tables
export const selectFamilies = async () => {
	const { data, error } = await supabase
		.from('product_family')
		.select()
		.order('code', { ascending: true });
	return data;
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
