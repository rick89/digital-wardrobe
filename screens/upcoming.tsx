import { type ReactNode } from 'react';
import { Text, View } from 'react-native';
import ScreenWrapper from '../components/screen-wrapper';
import { useClothingSelector } from '../store/hooks';
import { DateTime } from 'luxon';
import { ClothingItem } from '../store/slices/clothing-slice';

export default function UpcomingScreen() {
	const allClothing = useClothingSelector(
		(state) => state.individualClothingItems
	);

	let clothingSortedByDate = allClothing.sort((a: ClothingItem, b) => {
		console.log('a.date', a.date);
		console.log('tyepof ', typeof a.date);
		return DateTime.fromISO(a.date) - DateTime.fromISO(b.date);
	});
	// https://stackoverflow.com/questions/71912724/react-separate-array-of-timestamps-into-days
	let obj = [];
	clothingSortedByDate.map((item) => {
		if (!item.date) {
			return;
		}
		let monthAsString = DateTime.fromISO(item.date).toFormat('MMMM');
		console.log('month', monthAsString);
		obj[monthAsString] = [];
		obj[monthAsString].push(item);
		console.log('item', item);
	});

	let upcomingClothingItems = [];
	upcomingClothingItems.push(obj);

	console.log('upcoming', upcomingClothingItems);
	console.log('------------------------------------------------------------');
	// allClothing.map((item) => {
	// 	if (!item.date) {
	// 		return;
	// 	}
	// 	console.log('date ', typeof DateTime.fromISO(item.date));
	// });
	upcomingClothingItems.map((month, index) => {
		console.log(Object.keys(month));
		month.map((clothing, index) => {
			console.log(clothing);
		});
	});

	return (
		<ScreenWrapper>
			{upcomingClothingItems.map((month, index) => {
				return (
					<View>
						<View style={{ flexDirection: 'column' }}>
							<Text>{Object.keys(month)}</Text>
						</View>
						<View>
							<Text>{month.length}</Text>
							{month.map((clothing, index) => {
								return (
									<Text style={{ backgroundColor: 'red' }}>
										{clothing.title + index} abc
									</Text>
								);
							})}
						</View>
					</View>
				);
			})}
		</ScreenWrapper>
	);
}
