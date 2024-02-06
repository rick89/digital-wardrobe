import { useState } from 'react';
import { Text, View, Image } from 'react-native';
import Input from '../components/input';
import ScreenWrapper from '../components/screen-wrapper';
import TagInput from '../components/tag-input';
import { ClothingItem, Outfit, Tag } from '../store/slices/clothing-slice';
import { useClothingDispatch } from '../store/hooks';
import Button from '../components/custom-button.tsx';
import { saveClothing } from '../store/slices/clothing-slice';
import { useNavigation } from '@react-navigation/native';
import { uniqueId } from '../utils/helpers.ts';
import { saveTag } from '../store/slices/clothing-slice';
import CustomDateTimePicker from '../components/custom-date-time-picker.tsx';
import { useClothingSelector } from '../store/hooks';
import ClothingOutfitTabNav from '../components/clothing-outfit-tab-nav.tsx';
import ImageUpload from '../components/image-upload.tsx';
import { AntDesign } from '@expo/vector-icons';
import { DateTime } from 'luxon';
import CustomButton from '../components/custom-button.tsx';

export default function CreateScreen() {
	const navigation = useNavigation();
	const dispatch = useClothingDispatch();
	const [clothingItemName, setClothingItemName] = useState<string>('');
	const [selectedClothingTags, setSelectedClothingTags] = useState<Tag[]>([]);
	const [clothingDateTime, setClothingDateTime] = useState<DateTime>(
		DateTime.now()
	);
	const [outfitItemName, setOutfitItemName] = useState<string>('');
	const [selectedOutfitTags, setSelectedOutfitTags] = useState<Tag[]>([]);
	const [outfitDateTime, setOutfitDateTime] = useState<DateTime>(
		DateTime.now()
	);
	const [selectedTab, setSelectedTab] = useState<string>('clothing');
	const [outfitTagInputText, setOutfitTagInputText] = useState<string>('');
	const [clothingTagInputText, setClothingTagInputText] =
		useState<string>('');
	const tags = useClothingSelector((state) => state.tags);
	const [uploadedClothingImageUris, setUploadedClothingImageUris] = useState<
		string[]
	>([]);

	const clearFormData = () => {
		if (selectedTab === 'clothing') {
			setClothingItemName('');
			setSelectedClothingTags([]);
			setClothingDateTime(DateTime.now());
			setClothingTagInputText('');
			setUploadedClothingImageUris([]);
		} else {
			setOutfitItemName('');
			setSelectedOutfitTags([]);
			setOutfitDateTime(DateTime.now());
			setOutfitTagInputText('');
			// setUploadedOutfitImageUris([]);
		}
	};

	const isDisabled = () => {
		if (selectedTab === 'clothing') {
			return clothingItemName === '';
		} else {
			return outfitItemName === '';
		}
	};

	const saveClothingItem = () => {
		let objectForStore: ClothingItem | Outfit;
		objectForStore = {
			id: uniqueId(),
			type: selectedTab,
			title: clothingItemName,
			images: uploadedClothingImageUris,
			date: clothingDateTime.toISO(),
			tags: selectedClothingTags,
		};
		if (selectedTab === 'outfit') {
			objectForStore = {
				id: uniqueId(),
				type: selectedTab,
				title: outfitItemName,
				images: [],
				date: outfitDateTime.toISO(),
				tags: selectedOutfitTags,
			};
		}
		dispatch(
			saveClothing({
				...objectForStore,
			})
		);
		clearFormData();
		// @ToDo type all routes
		// @ts-ignore
		navigation.navigate('Home');
	};

	const doSelectedClothingTag = (tag: Tag) => {
		if ('new' in tag && tag.new) {
			dispatch(saveTag(tag));
		}
		setSelectedClothingTags([...selectedClothingTags, tag]);
	};

	const doSelectedOutfitTag = (tag: Tag) => {
		if ('new' in tag && tag.new) {
			dispatch(saveTag(tag));
		}
		setSelectedOutfitTags([...selectedOutfitTags, tag]);
	};

	return (
		<ScreenWrapper>
			<ClothingOutfitTabNav
				onPress={(selectedTab) => setSelectedTab(selectedTab)}
				selectedTab={selectedTab}
			/>
			<View style={{ flexGrow: 1 }}>
				{selectedTab === 'clothing' ? (
					<View>
						<Input
							value={clothingItemName}
							placeholder='Name'
							onChangeText={(name) => setClothingItemName(name)}
							style={{ marginBottom: 20 }}
						/>
						<TagInput
							onChangeText={(tagInputText) =>
								setClothingTagInputText(tagInputText)
							}
							inputText={clothingTagInputText}
							selectedTags={selectedClothingTags}
							tags={tags}
							selectedTag={(tag) => doSelectedClothingTag(tag)}
							style={{ marginBottom: 20 }}
						/>
						<CustomDateTimePicker
							selectedDateTime={(dateTime) =>
								setClothingDateTime(
									DateTime.fromJSDate(dateTime)
								)
							}
							style={{ marginBottom: 20 }}
						/>
					</View>
				) : (
					<View>
						<Input
							value={outfitItemName}
							placeholder='Name'
							onChangeText={(name) => setOutfitItemName(name)}
							style={{ marginBottom: 20 }}
						/>
						<TagInput
							onChangeText={(outfitTagInputText) =>
								setOutfitTagInputText(outfitTagInputText)
							}
							inputText={outfitTagInputText}
							selectedTags={selectedOutfitTags}
							tags={tags}
							selectedTag={(tag) => doSelectedOutfitTag(tag)}
							style={{ marginBottom: 20 }}
						/>
						<CustomDateTimePicker
							selectedDateTime={(dateTime) =>
								setOutfitDateTime(DateTime.fromJSDate(dateTime))
							}
							style={{ marginBottom: 20 }}
						/>
					</View>
				)}
				{selectedTab === 'clothing' ? (
					<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
						<ImageUpload
							uploadedImage={(uri) =>
								setUploadedClothingImageUris([
									...uploadedClothingImageUris,
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
						{uploadedClothingImageUris.map((uri) => (
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
			<CustomButton
				disabled={isDisabled()}
				title='Save'
				onPress={() => saveClothingItem()}
			/>
		</ScreenWrapper>
	);
}
