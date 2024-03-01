import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageObject } from '../../components/image-upload';
import { DateTime } from 'luxon';

export type ItemType = 'clothing' | 'outfit';

export type ClothingItem = {
	id: string;
	title: string;
	images: ImageObject[];
	date: string | null;
	tags: Tag[];
	type: string;
	created: string;
};

export type Outfit = {
	id: string;
	title: string;
	images: ImageObject[];
	clothes: ClothingItem[];
	date: string | null;
	tags: Tag[];
};

export type Tag = {
	id: string;
	new?: boolean;
	title: string;
	type: ItemType;
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
				created: DateTime.now().toISO(),
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
