import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import { ClothingItem } from '../store/slices/clothing-slice';
import { DateTime } from 'luxon';

type MonthCardProps = {
	month: string;
	items: ClothingItem[];
};
const blurhash =
	'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function MonthCard({ month, items }: MonthCardProps) {
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
					}}
				>
					<View>
						<Text style={{ fontSize: 20 }}>{item.title}</Text>
						<Text style={{ marginTop: 'auto' }}>
							{DateTime.fromISO(item.date).toFormat('DDDD')}
						</Text>
					</View>
					<Image
						style={{
							height: 100,
							width: 100,
							borderRadius: 10,
							marginLeft: 'auto',
						}}
						source={{
							uri: item.images[0],
						}}
						placeholder={blurhash}
					/>
				</View>
			))}
		</View>
	);
}
