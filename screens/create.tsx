import { useState } from 'react';
import {
	Text,
	View,
	Image,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
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
import ImageUpload, { ImageObject } from '../components/image-upload.tsx';
import { AntDesign } from '@expo/vector-icons';
import { DateTime } from 'luxon';
import CustomButton from '../components/custom-button.tsx';
import { FontAwesome } from '@expo/vector-icons';
import { deleteUploadedClothingImage } from '../store/slices/clothing-slice';
import Toast from '../components/toast.tsx';

export default function CreateScreen() {
	const navigation = useNavigation();
	const dispatch = useClothingDispatch();
	const [clothingItemName, setClothingItemName] = useState<string>('');
	const [selectedClothingTags, setSelectedClothingTags] = useState<Tag[]>([]);
	const [clothingDateTime, setClothingDateTime] = useState<DateTime | null>(
		null
	);
	const [outfitItemName, setOutfitItemName] = useState<string>('');
	const [selectedOutfitTags, setSelectedOutfitTags] = useState<Tag[]>([]);
	const [outfitDateTime, setOutfitDateTime] = useState<DateTime | null>(
		DateTime.now()
	);
	const [selectedTab, setSelectedTab] = useState<string>('clothing');
	const [outfitTagInputText, setOutfitTagInputText] = useState<string>('');
	const [clothingTagInputText, setClothingTagInputText] =
		useState<string>('');
	const tags = useClothingSelector((state) => state.tags);
	const [uploadedClothingImages, setUploadedClothingImages] = useState<
		ImageObject[]
	>([]);
	const [showOutfitDateTimePicker, setShowOutfitDateTimePicker] =
		useState<boolean>(false);
	const [showClothingDateTimePicker, setShowClothingDateTimePicker] =
		useState<boolean>(false);

	const clearFormData = () => {
		if (selectedTab === 'clothing') {
			setClothingItemName('');
			setSelectedClothingTags([]);
			setClothingDateTime(null);
			setClothingTagInputText('');
			setUploadedClothingImages([]);
			setShowClothingDateTimePicker(false);
		} else {
			setOutfitItemName('');
			setSelectedOutfitTags([]);
			setOutfitDateTime(null);
			setOutfitTagInputText('');
			setShowOutfitDateTimePicker(false);
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
			images: uploadedClothingImages,
			date: clothingDateTime ? clothingDateTime.toISO() : null,
			tags: selectedClothingTags,
		};
		if (selectedTab === 'outfit') {
			objectForStore = {
				id: uniqueId(),
				type: selectedTab,
				title: outfitItemName,
				images: [],
				date: outfitDateTime ? outfitDateTime.toISO() : null,
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
			console.log('is new clothing tag');
			dispatch(saveTag(tag));
		}
		console.log('select the clothing tag');
		setSelectedClothingTags([...selectedClothingTags, tag]);
	};

	const doSelectedOutfitTag = (tag: Tag) => {
		if ('new' in tag && tag.new) {
			console.log('is new outfit tag');
			dispatch(saveTag(tag));
		}
		console.log('select the tag', tag);
		setSelectedOutfitTags([...selectedOutfitTags, tag]);
	};

	const toggleOutfitDateTimePicker = () => {};

	const toggleDateTimePicker = (type: string) => {
		if (type === 'clothing') {
			setClothingDateTime(null);
			setShowClothingDateTimePicker(!showClothingDateTimePicker);
		} else {
			setOutfitDateTime(null);
			setShowOutfitDateTimePicker(!showOutfitDateTimePicker);
		}
	};

	const onDeleteUploadedClothingImage = (id: string) => {
		setUploadedClothingImages(
			uploadedClothingImages.filter((image) => image.id !== id)
		);
	};

	return (
		<ScreenWrapper>
			<ClothingOutfitTabNav
				onPress={(selectedTab) => setSelectedTab(selectedTab)}
				selectedTab={selectedTab}
			/>
			<ScrollView style={{ flexGrow: 1 }}>
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
							clearInput={() => setClothingTagInputText('')}
							inputText={clothingTagInputText}
							selectedTags={selectedClothingTags}
							tags={tags}
							selectedTag={(tag) => doSelectedClothingTag(tag)}
							style={{ marginBottom: 20 }}
						/>
						<View
							style={{
								...styles.calendarLinkContainer,
							}}
						>
							<TouchableOpacity
								onPress={() => {
									toggleDateTimePicker('clothing');
								}}
							>
								<Text
									style={{
										...styles.calendarLink,
									}}
								>
									{showClothingDateTimePicker
										? 'Cancel'
										: 'Add to calendar'}
								</Text>
							</TouchableOpacity>
						</View>
						{showClothingDateTimePicker ? (
							<CustomDateTimePicker
								selectedDateTime={(dateTime) =>
									setClothingDateTime(
										DateTime.fromJSDate(dateTime)
									)
								}
								style={{ marginBottom: 20 }}
							/>
						) : null}
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
							clearInput={() => setOutfitTagInputText('')}
							onChangeText={(outfitTagInputText) =>
								setOutfitTagInputText(outfitTagInputText)
							}
							inputText={outfitTagInputText}
							selectedTags={selectedOutfitTags}
							tags={tags}
							selectedTag={(tag) => {
								console.log('selectedTag', tag);
								doSelectedOutfitTag(tag);
							}}
							style={{ marginBottom: 20 }}
						/>
						<View
							style={{
								...styles.calendarLinkContainer,
							}}
						>
							<TouchableOpacity
								onPress={() => {
									toggleOutfitDateTimePicker();
								}}
								style={{
									...styles.calendarLinkContainer,
								}}
							>
								<Text
									style={{
										...styles.calendarLink,
									}}
								>
									{showOutfitDateTimePicker
										? 'Cancel'
										: 'Add to calendar'}
								</Text>
							</TouchableOpacity>
						</View>

						{showOutfitDateTimePicker ? (
							<CustomDateTimePicker
								selectedDateTime={(dateTime) =>
									setOutfitDateTime(
										DateTime.fromJSDate(dateTime)
									)
								}
								style={{ marginBottom: 20 }}
							/>
						) : null}
					</View>
				)}
				{selectedTab === 'clothing' ? (
					<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
						<ImageUpload
							uploadedImage={(uploadedImageObject) =>
								setUploadedClothingImages([
									...uploadedClothingImages,
									uploadedImageObject,
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
						{uploadedClothingImages.map((image) => (
							<View>
								<TouchableOpacity
									onPress={() =>
										onDeleteUploadedClothingImage(image.id)
									}
									style={{
										position: 'absolute',
										right: 0,
										zIndex: 100,
										top: 0,
										paddingVertical: 2,
										paddingHorizontal: 4,
										borderRadius: 10,
										backgroundColor: 'white',
									}}
								>
									<FontAwesome
										name='trash-o'
										size={24}
										color='black'
									/>
								</TouchableOpacity>
								<Image
									key={image.id}
									style={{
										width: 100,
										height: 100,
										borderRadius: 10,
									}}
									source={{ uri: image.uri }}
								/>
							</View>
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
			</ScrollView>
			<CustomButton
				disabled={isDisabled()}
				title='Save'
				onPress={() => saveClothingItem()}
			/>
			<Toast />
		</ScreenWrapper>
	);
}

const styles = StyleSheet.create({
	calendarLink: {
		marginBottom: 20,
		color: '#42a4f5',
		textDecorationLine: 'underline',
	},
	calendarLinkContainer: {
		flexWrap: 'wrap',
	},
});
