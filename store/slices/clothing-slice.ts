// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ClothingItem = {
	id: string;
	title: string;
	images: string[];
	date: string;
	tags: Tag[];
};

export type Outfit = {
	id: string;
	title: string;
	clothes: ClothingItem[];
	date: Date;
	tags: Tag[];
};

export type Tag = {
	id: string;
	new?: boolean;
	title: string;
	type: 'clothing' | 'outfit';
};

export type Filter = {
	id: string;
	name: string;
};

type ClothingItemState = {
	individualClothingItems: ClothingItem[];
	outfits: Outfit[];
	tags: Tag[];
	text: Text[];
};

const initialState: ClothingItemState = {
	individualClothingItems: [],
	outfits: [],
	tags: [],
	text: [],
};

// export const clothingSlice = createSlice({
// 	name: 'clothing-item',
// 	initialState,
// 	reducers: {
// 		saveClothing(state, action: PayloadAction<ClothingItem>) {
// 			state.individualClothingItems.push({
// 				...action.payload,
// 			});
// 		},
// 		saveTag(state, action: PayloadAction<Tag>) {
// 			state.tags.push({
// 				...action.payload,
// 			});
// 			const itemIndex = state.tags.findIndex((item) => {
// 				return item.id === action.payload.id;
// 			});
// 			state.tags[itemIndex].new = false;
// 		},
// 		deleteClothing(state, action: PayloadAction<string>) {
// 			const itemIndex = state.individualClothingItems.findIndex(
// 				(item) => {
// 					return item.id === action.payload;
// 				}
// 			);
// 			state.individualClothingItems.splice(itemIndex, 1);
// 		},
// 		deleteTag(state, action: PayloadAction<string>) {
// 			const itemIndex = state.tags.findIndex((item) => {
// 				return item.id === action.payload;
// 			});
// 			state.tags.splice(itemIndex, 1);
// 		},
// 	},
// });

// export default clothingSlice;

// export const { saveClothing, saveTag, deleteClothing, deleteTag } =
// 	clothingSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const testSlice = createSlice({
	name: 'test-slice',
	initialState,
	reducers: {
		saveClothing(state, action: PayloadAction<ClothingItem>) {
			state.individualClothingItems.push({
				...action.payload,
			});
		},
		deleteClothing(state, action: PayloadAction<string>) {
			const itemIndex = state.individualClothingItems.findIndex(
				(item) => {
					return item.id === action.payload;
				}
			);
			state.individualClothingItems.splice(itemIndex, 1);
		},
		saveTag(state, action: PayloadAction<Tag>) {
			state.tags.push({
				...action.payload,
			});
			const itemIndex = state.tags.findIndex((item) => {
				return item.id === action.payload.id;
			});
			state.tags[itemIndex].new = false;
		},
		deleteTag(state, action: PayloadAction<string>) {
			const itemIndex = state.tags.findIndex((item) => {
				return item.id === action.payload;
			});
			state.tags.splice(itemIndex, 1);
		},
	},
});

export default testSlice;
export const { saveClothing, saveTag, deleteClothing, deleteTag } =
	testSlice.actions;
