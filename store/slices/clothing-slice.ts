import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageObject } from '../../components/image-upload';

export type ClothingItem = {
	id: string;
	title: string;
	images: ImageObject[];
	date: string | null;
	tags: Tag[];
	type: string;
};

export type Outfit = {
	id: string;
	title: string;
	images: ImageObject[];
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

			// @ToDo why oes filter not work here?
			// state.individualClothingItems.filter(
			//  (item) => item.id === action.payload
			// );
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

			// @ToDo why does filter not work here
			//state.tags.filter((item) => item.id === action.payload);
		},
		removeClothingItemFromCalendar(state, action: PayloadAction<string>) {
			const clothingItem = state.individualClothingItems.find(
				(item) => item.id === action.payload
			);
			if (!clothingItem) {
				console.error(
					'could not find clothing item to remove from calendar with id: ',
					action.payload
				);
				return;
			}
			clothingItem.date = null;
		},
	},
});

export default testSlice;
export const {
	saveClothing,
	saveTag,
	deleteClothing,
	deleteTag,
	removeClothingItemFromCalendar,
} = testSlice.actions;
