import { type ReactNode } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import ScreenWrapper from '../components/screen-wrapper';
import { useClothingSelector } from '../store/hooks';
import { DateTime } from 'luxon';
import {
	ClothingItem,
	removeClothingItemFromCalendar,
} from '../store/slices/clothing-slice';
import MonthCard from '../components/month-card';
import { groupByDate, objectIsEmpty } from '../utils/helpers';
import { useClothingDispatch } from '../store/hooks';

export default function UpcomingScreen() {
	const dispatch = useClothingDispatch();
	const allClothing = useClothingSelector(
		(state) => state.individualClothingItems
	);

	let filteredClothing = allClothing
		.filter((item) => {
			return item.date;
		})
		.sort((a, b) => (a.created < b.created ? 1 : -1));

	const grouped = groupByDate(filteredClothing);

	if (objectIsEmpty(grouped)) {
		return (
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
				}}
			>
				<Text>You have nothing in your calendar.</Text>
			</View>
		);
	}

	const onDelete = (clothingItem: ClothingItem[]) => {
		console.log('clothingItem', clothingItem);
		Alert.alert(
			'Delete',
			`Are you sure you want to delete ${clothingItem[0].title}`,
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{
					text: 'OK',
					onPress: () =>
						dispatch(
							removeClothingItemFromCalendar(clothingItem[0].id)
						),
				},
			]
		);
	};

	return (
		<ScreenWrapper>
			<ScrollView>
				{Object.keys(grouped).map((month) => {
					let clothingItem: ClothingItem[] = grouped[month];
					return (
						<MonthCard
							onDelete={(id) => onDelete(clothingItem)}
							key={month}
							month={month}
							items={clothingItem}
						/>
					);
				})}
			</ScrollView>
		</ScreenWrapper>
	);
}
