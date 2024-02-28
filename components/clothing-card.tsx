import { View, TouchableOpacity, Dimensions, Text } from 'react-native';
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';
import { ClothingItem, Outfit } from '../store/slices/clothing-slice';
import { isOutfit } from '../utils/helpers';

export type ClothingCardProps = {
	onPress: (type: string, id: string) => void;
	onDelete: (item: ClothingItem | Outfit) => void;
	item: Outfit | ClothingItem;
};

const blurhash =
	'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
const windowWidth = Dimensions.get('window').width;

export default function ClothingCard({
	onPress,
	onDelete,
	item,
}: ClothingCardProps) {
	let type: 'clothingItem' | 'outfit' = 'clothingItem';
	const images: string[] = [];
	if (isOutfit(item)) {
		type = 'outfit';
		item.clothes.map((item) => {
			item.images.map((image) => images.push(image.uri));
		});
	} else {
		// item is an individual clothing item
		const images = item.images;
	}

	return (
		<View>
			<TouchableOpacity
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
				onPress={() => onPress(type, item.id)}
			>
				<Image
					style={{
						flex: 1,
						width: windowWidth * 1,
						height: 120,
						aspectRatio: 1,
						borderRadius: 10,
					}}
					source={{
						uri:
							item.images.length > 0
								? item.images[0].uri
								: blurhash,
					}}
					placeholder={blurhash}
					contentFit='cover'
					transition={1000}
				/>
				<Text>{item.title}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => onDelete(item)}
				style={{
					position: 'absolute',
					right: 0,
					bottom: 0,
					paddingVertical: 2,
					paddingHorizontal: 4,
					borderRadius: 10,
					backgroundColor: 'white',
				}}
			>
				<FontAwesome name='trash-o' size={24} color='black' />
			</TouchableOpacity>
		</View>
	);
}
