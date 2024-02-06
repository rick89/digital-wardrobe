import { type ReactNode } from 'react';
import { Text, View, ScrollView } from 'react-native';
import ScreenWrapper from '../components/screen-wrapper';
import { useClothingSelector } from '../store/hooks';
import { DateTime } from 'luxon';
import { ClothingItem } from '../store/slices/clothing-slice';
import MonthCard from '../components/month-card';
import { groupByDate, objectIsEmpty } from '../utils/helpers';

export default function UpcomingScreen() {
	const allClothing = useClothingSelector(
		(state) => state.individualClothingItems
	);

	const filteredClothing = allClothing.filter((item) => {
		return item.date;
	});

	filteredClothing.sort((a, b) => {
		return DateTime.fromISO(a.date) - DateTime.fromISO(b.date);
	});

	const grouped = groupByDate(filteredClothing);

	Object.keys(grouped).forEach((value, index, array) => {
		array.map((objectKey) => {
			grouped[objectKey].map((a, b) => {});
		});
	});

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

	return (
		<ScreenWrapper>
			<ScrollView>
				{Object.keys(grouped).map((month) => {
					let clothingItem: ClothingItem[] = grouped[month];
					return (
						<MonthCard
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
