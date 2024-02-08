import { ClothingItem } from '../store/slices/clothing-slice';
import { DateTime } from 'luxon';

export const uniqueId = () => {
	const dateString = Date.now().toString(36);
	const randomness = Math.random().toString(36).substr(2);
	return dateString + randomness;
};

export const objectIsEmpty = (obj: {}) => {
	return Object.keys(obj).length === 0;
};

// @Tod REMOVE ANY we need a new type to represent the object being returned, type that can be indexe by a string
export const groupByDate = (filteredClothing: ClothingItem[]): any => {
	return filteredClothing.reduce((months, item) => {
		if (!item.date) {
			console.error('note.date is undefined');
		} else {
			const date = DateTime.fromISO(item.date).toFormat('MMMM');
			if (!months.hasOwnProperty(date)) {
				months[date] = [];
			}
			months[date].push(item);
			return months;
		}
	}, {});
};
