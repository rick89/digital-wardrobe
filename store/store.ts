import { configureStore } from '@reduxjs/toolkit';
import { clothingSlice } from './slices/clothing-slice.ts';

export const store = configureStore({
	reducer: {
		clothing: clothingSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
