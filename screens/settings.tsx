import { useState } from 'react';
import { Text, View, Alert } from 'react-native';
import ScreenWrapper from '../components/screen-wrapper';
import TagInput from '../components/tag-input';
import { useClothingSelector } from '../store/hooks';
import { Tag } from '../store/slices/clothing-slice';
import { useClothingDispatch } from '../store/hooks';
import { deleteTag, saveTag } from '../store/slices/clothing-slice';

export default function SettingsScreen() {
	const tags = useClothingSelector((state) => state.tags);
	const [tagInputText, setTagInputText] = useState<string>('');
	const dispatch = useClothingDispatch();
	console.log('tags', tags);
	const onSave = (tag: Tag) => {
		if ('new' in tag) {
			dispatch(saveTag(tag));
		}
	};

	const onDelete = (tag: Tag) => {
		Alert.alert('Delete', `Are you sure you want to delete ${tag.title}`, [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{ text: 'OK', onPress: () => dispatch(deleteTag(tag.id)) },
		]);
	};

	return (
		<ScreenWrapper>
			<View>
				<Text style={{ fontSize: 22, marginBottom: 20 }}>
					Tag editor
				</Text>
				<TagInput
					selectedTag={(tag) => onSave(tag)}
					onChangeText={(tagInputText) =>
						setTagInputText(tagInputText)
					}
					inputText={tagInputText}
					tags={tags}
					isTagEditor={true}
					onDelete={(tag) => onDelete(tag)}
				/>
			</View>
		</ScreenWrapper>
	);
}
