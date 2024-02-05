import {
	useDispatch,
	useSelector,
	type TypedUseSelectorHook,
} from 'react-redux';
import { type AppDispatch, RootState } from './store.ts';

type DispatchFunction = () => AppDispatch;

export const useClothingDispatch: DispatchFunction = useDispatch;
export const useClothingSelector: TypedUseSelectorHook<RootState> = useSelector;
