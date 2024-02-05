import { useState } from 'react';
import { Text, View, Image } from 'react-native';
import Input from '../components/input';
import ScreenWrapper from '../components/screen-wrapper';
import TagInput from '../components/tag-input';
import { Tag } from '../store/slices/clothing-slice';
import { useClothingDispatch } from '../store/hooks';
import Button from '../components/button';
import { saveClothing } from '../store/slices/clothing-slice';
import { useNavigation } from '@react-navigation/native';
import { uniqueId } from '../utils/helpers.ts';
import { saveTag } from '../store/slices/clothing-slice';
import CustomDateTimePicker from '../components/custom-date-time-picker.tsx';
import { useClothingSelector } from '../store/hooks';
import ClothingOutfitTabNav from '../components/clothing-outfit-tab-nav.tsx';
import ImageUpload from '../components/image-upload.tsx';
import { AntDesign } from '@expo/vector-icons';

export default function CreateScreen() {
	const navigation = useNavigation();
	const dispatch = useClothingDispatch();
	const [clothingItemName, setClothingItemName] = useState<string>('');
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [dateTime, setDateTime] = useState<Date>(new Date());
	const [selectedTab, setSelectedTab] = useState<string>('clothing');
	const [tagInputText, setTagInputText] = useState<string>('');
	const tags = useClothingSelector((state) => state.clothing.tags);
	const [uploadedImageUris, setUploadedImageUris] = useState<string[]>([]);

	const clearFormData = () => {
		setClothingItemName('');
		setSelectedTags([]);
		setDateTime(new Date());
		setTagInputText('');
		setUploadedImageUris([]);
	};

	const saveClothingItem = () => {
		dispatch(
			saveClothing({
				id: uniqueId(),
				title: clothingItemName,
				images: uploadedImageUris,
				date: dateTime.toString(),
				tags: selectedTags,
			})
		);
		clearFormData();
		// @ToDo type all routes
		// @ts-ignore
		navigation.navigate('Home');
	};

	const doSelectedTag = (tag: Tag) => {
		if ('new' in tag && tag.new) {
			dispatch(saveTag(tag));
		}
		setSelectedTags([...selectedTags, tag]);
	};

	return (
		<ScreenWrapper>
			<ClothingOutfitTabNav
				onPress={(selectedTab) => setSelectedTab(selectedTab)}
				selectedTab={selectedTab}
			/>
			<View style={{ flexGrow: 1 }}>
				<Input
					value={clothingItemName}
					placeholder='Name'
					onChangeText={(name) => setClothingItemName(name)}
					style={{ marginBottom: 20 }}
				/>
				<TagInput
					onChangeText={(tagInputText) =>
						setTagInputText(tagInputText)
					}
					inputText={tagInputText}
					selectedTags={selectedTags}
					tags={tags}
					selectedTag={(tag) => doSelectedTag(tag)}
					style={{ marginBottom: 20 }}
				/>
				<CustomDateTimePicker
					selectedDateTime={(dateTime) => setDateTime(dateTime)}
					style={{ marginBottom: 20 }}
				/>
				{selectedTab === 'clothing' ? (
					<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
						<ImageUpload
							uploadedImage={(uri) =>
								setUploadedImageUris([
									...uploadedImageUris,
									uri,
								])
							}
						>
							<View
								style={{
									width: 100,
									height: 100,
									borderRadius: 10,
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: '#d9d9d9',
								}}
							>
								<AntDesign
									name='pluscircleo'
									size={34}
									color='#444'
								/>
							</View>
						</ImageUpload>
						{uploadedImageUris.map((uri) => (
							<Image
								key={uri}
								style={{
									width: 100,
									height: 100,
									borderRadius: 10,
								}}
								source={{ uri: uri }}
							/>
						))}
					</View>
				) : (
					<View>
						<View>
							<Text style={{ fontSize: 22 }}>Clothes</Text>
						</View>
						<View>
							<Text style={{ fontSize: 22 }}>Accessories</Text>
						</View>
					</View>
				)}
			</View>
			<Button title='Save' onPress={() => saveClothingItem()} />
		</ScreenWrapper>
	);
}
