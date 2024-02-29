import { Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { ClothingItem } from '../store/slices/clothing-slice';
import { DateTime } from 'luxon';
import { FontAwesome } from '@expo/vector-icons';

type MonthCardProps = {
	month: string;
	items: ClothingItem[];
	onDelete: (clothingItem: ClothingItem) => void;
};
const blurhash =
	'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function MonthCard({ month, items, onDelete }: MonthCardProps) {
	console.log('items', items);
	return (
		<View
			style={{
				marginBottom: 20,
			}}
			key={month}
		>
			<Text style={{ fontSize: 22 }}>{month}</Text>
			{items.map((item) => (
				<View
					key={item.id}
					style={{
						flexDirection: 'row',
						padding: 10,
						backgroundColor: '#d9d9d9',
						marginTop: 10,
						borderRadius: 10,
						marginBottom: 10,
					}}
				>
					<TouchableOpacity
						onPress={() => onDelete(item)}
						style={{
							position: 'absolute',
							right: 0,
							top: -10,
							paddingHorizontal: 10,
							zIndex: 100,
							paddingVertical: 8,
							backgroundColor: 'black',
							borderRadius: 16,
						}}
					>
						<FontAwesome name='trash-o' size={20} color='red' />
					</TouchableOpacity>
					{item.date && (
						<View>
							<Text style={{ fontSize: 20 }}>{item.title}</Text>
							<Text style={{ marginTop: 'auto' }}>
								{DateTime.fromISO(item.date).toFormat('DDDD')}
							</Text>
						</View>
					)}
					<Image
						style={{
							height: 100,
							width: 100,
							borderRadius: 10,
							marginLeft: 'auto',
						}}
						source={{
							uri:
								item.images.length > 0
									? item.images[0].uri
									: blurhash,
						}}
						placeholder={blurhash}
					/>
				</View>
			))}
		</View>
	);
}
