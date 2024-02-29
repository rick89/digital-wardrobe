import { View, TouchableOpacity, Dimensions, Text } from 'react-native';
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';
import { ClothingItem, Outfit } from '../store/slices/clothing-slice';
import { isOutfit } from '../utils/helpers';
import { useRef } from 'react';

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
	let imageUriRef = useRef<string | null>(null);

	console.log('imageUriRef', imageUriRef);
	console.log('item.images', item.images);
	// item is an individual clothing item
	// const image = item.images[0].uri;
	imageUriRef.current = item.images.length > 0 ? item.images[0].uri : '';

	return (
		<View>
			<TouchableOpacity
				style={{
					paddingTop: 8,
					paddingRight: 8,
					paddingLeft: 8,
					flex: 1,
					alignItems: 'center',
				}}
				onPress={() => onPress(type, item.id)}
			>
				<Image
					style={{
						flex: 1,
						width: windowWidth * 1,
						height: 165,
						aspectRatio: 1,
						borderRadius: 10,
					}}
					source={{
						uri: imageUriRef.current,
					}}
					placeholder={blurhash}
					contentFit='cover'
					transition={1000}
				/>
				<View>
					<Text style={{ fontSize: 16, marginTop: 5 }}>
						{item.title}
					</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => onDelete(item)}
				style={{
					position: 'absolute',
					right: 0,
					top: 0,
					paddingHorizontal: 10,
					paddingVertical: 8,
					backgroundColor: 'black',
					borderRadius: 16,
				}}
			>
				<FontAwesome name='trash-o' size={20} color='red' />
			</TouchableOpacity>
		</View>
	);
}
