import { TouchableOpacity, Text } from 'react-native';
import { Tag } from '../store/slices/clothing-slice';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export type TagFilter = {
	tags: Tag[];
	selectedTags: Tag[];
	onPress: (tag: Tag) => void;
};

export default function TagFilter({ onPress, tags, selectedTags }: TagFilter) {
	return tags.map((tag) => {
		return (
			<TouchableOpacity
				onPress={() => onPress(tag)}
				key={tag.id}
				style={{
					flexDirection: 'row',
					backgroundColor: selectedTags.includes(tag)
						? 'green'
						: 'black',
					borderRadius: 100,
					paddingHorizontal: 12,
					paddingVertical: 8,
					marginRight: 4,
					alignItems: 'center',
				}}
			>
				<Text
					style={{
						color: 'white',
						textAlign: 'center',
						marginRight: 10,
					}}
				>
					{tag.title}
				</Text>
				{selectedTags.includes(tag) ? (
					<Entypo name='circle-with-cross' size={24} color='white' />
				) : (
					<Ionicons name='checkmark-circle' size={24} color='white' />
				)}
			</TouchableOpacity>
		);
	});
}
