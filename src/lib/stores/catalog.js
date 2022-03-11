// import { supabase } from '$lib/db.js';

// export const selectCategory = async () => {
// 	const { data, error } = await supabase.from('product_category').select('id,name,parent_id');
// 	if (error) {
// 		return console.error(error);
// 	}
// 	return data;
// };

// export const insertCategory = async (newCategory) => {
// 	const { data, error } = await supabase.from('product_category').insert({ name: newCategory });
// 	if (error) {
// 		return console.error(error);
// 	}
// 	return data;
// };

// export const updateProduct = async (productRow) => {
// 	try {
// 		const { data, error } = await supabase
// 			.from('product')
// 			.upsert(productRow, { onConflict: 'sku' });
// 		if (data) return data;
// 		return error;
// 	} catch (error) {
// 		console.error(error);
// 		return error;
// 	}
// };

// export const selectProduct = async (sku) => {
// 	const { data, error } = await supabase.from('product').select('id').eq('sku', sku);
// 	// console.error('Inside select', data);
// 	// const { data, error } = await supabase.from('product').update(productRow).match({ sku: sku });
// 	if (data) return data;
// 	return error;
// };
