import { type ReactNode } from 'react';
import { Text, View } from 'react-native';
import ScreenWrapper from '../components/screen-wrapper';
import { useClothingSelector } from '../store/hooks';
import { DateTime } from 'luxon';
import { ClothingItem } from '../store/slices/clothing-slice';
import MonthCard from '../components/month-card';

export default function UpcomingScreen() {
	const allClothing = useClothingSelector(
		(state) => state.individualClothingItems
	);

	const groupByDate = (allClothing: ClothingItem[]) => {
		return allClothing.reduce((months, note) => {
			if (!note.date) {
				console.error('note.date is undefined');
			} else {
				const date = DateTime.fromISO(note.date).toFormat('MMMM');
				if (!months.hasOwnProperty(date)) {
					months[date] = [];
				}
				months[date].push(note);
				return months;
			}
		}, {});
	};

	const grouped = groupByDate(allClothing);

	console.log('GROUPED', typeof grouped);
	console.log('GROUPED', grouped);
	console.log('Object.keys(grouped)', Object.keys(grouped));

	console.log('grouped["February"]', grouped['February']);

	Object.keys(grouped).forEach((value, index, array) => {
		// console.log('value', value);
		// console.log('index', index);
		// console.log('array', JSON.stringify(array));
		array.map((objectKey) => {
			grouped[objectKey].map((a, b) => {
				// console.log('a', a);
				// console.log('b', b);
			});
		});
	});

	// Object.keys(items[0]).forEach((key, index) => {
	// 	console.log('items[key]', JSON.stringify(items[key]));
	// 	console.log('index', index);
	// });

	return (
		<ScreenWrapper>
			{Object.keys(grouped).map((month) => {
				return <MonthCard month={month} items={grouped[month]} />;
			})}
		</ScreenWrapper>
	);
}
