import { useState } from 'react';
import { Text, View, FlatList, Alert } from 'react-native';
import Button from '../components/button';
import ScreenWrapper from '../components/screen-wrapper';
import Toast from '../components/toast';
import Input from '../components/input';
import SearchInput from '../components/search-input';
import CustomDateTimePicker from '../components/custom-date-time-picker';
import FilterDropdown from '../components/filter-dropdown';
import ClothingCard from '../components/clothing-card';
import TagInput from '../components/tag-input';
import ImageUpload from '../components/image-upload';
import { useClothingSelector } from '../store/hooks';
import { useClothingDispatch } from '../store/hooks';
import {
	ClothingItem,
	Outfit,
	deleteClothing,
} from '../store/slices/clothing-slice';
import ClothingOutfitTabNav from '../components/clothing-outfit-tab-nav';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
	const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const dispatch = useClothingDispatch();
	const [selectedTab, setSelectedTab] = useState<string>('clothing');
	const navigation = useNavigation();
	// @Todo in theory you should not be able to create an outfit without having created a clothing item first
	// so the null check can happen on this object only! Write a test for this.
	const clothes = useClothingSelector(
		(state) => state.clothing.individualClothingItems
	);

	console.log('CLOTHES', clothes);

	const doDelete = (item: ClothingItem | Outfit) => {
		Alert.alert('Delete', `Are you sure you want to delete ${item.title}`, [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{ text: 'OK', onPress: () => dispatch(deleteClothing(item.id)) },
		]);
	};

	if (clothes.length === 0) {
		return (
			<ScreenWrapper>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						flex: 1,
					}}
				>
					<Text style={{ fontSize: 16 }}>
						Welcome to Garms, use the bouncing button below to add
						clothes to your wardrobe once you have added a clothing
						item you will be able to create outfits and assign them
						to your calendar.
					</Text>
				</View>
			</ScreenWrapper>
		);
	}

	return (
		<ScreenWrapper>
			<View
				style={{
					flexDirection: 'row',
					marginBottom: 20,
				}}
			>
				<View style={{ flex: 2 }}>
					<FilterDropdown
						onChange={(filters) => console.log('filters', filters)}
					/>
				</View>
				<View style={{ flex: 2 }}>
					<SearchInput
						value={searchTerm}
						onChangeText={(searchTerm) => setSearchTerm(searchTerm)}
					/>
				</View>
			</View>
			<ClothingOutfitTabNav
				onPress={(selectedTab) => setSelectedTab(selectedTab)}
				selectedTab={selectedTab}
			/>

			<FlatList
				columnWrapperStyle={{
					marginTop: 20,
					flex: 1,
					justifyContent: 'space-around',
				}}
				numColumns={2}
				data={clothes}
				renderItem={({ item }) => (
					<ClothingCard
						item={item}
						onPress={() => {
							// navigation.navigate('TabNavigator', {
							// 	screen: 'create',
							// });
						}}
						onDelete={(item) => {
							doDelete(item);
						}}
						key={item.id}
					/>
				)}
				keyExtractor={(item) => item.id}
			/>
			{/* <Button
				title='Save & close'
				onPress={() => console.log('pressed')}
			/> */}
			{/* <Toast /> */}
			{/* <Input onChangeText={(text) => console.log('text', text)} /> */}
			{/* <SearchInput
				onChangeText={(searchTerm) => console.log(searchTerm)}
			/> */}
			{/* <CustomDateTimePicker /> */}
			{/* <FilterDropdown onChange={(items) => console.log('ITEMS', items)} /> */}
			{/* <ClothingCard
				item={{
					id: 'abc',
					title: 'tee shirt froma ll saints that I love very much so so',
					images: ['', ''],
					date: new Date(),
					tags: [
						{
							id: '123',
							name: 'winter',
							type: 'clothing',
						},
					],
				}}
				onPress={(type, item) =>
					console.log('navigate', type, 'item', item)
				}
				onDelete={(id) => {
					console.log('delete', id);
				}}
			/> */}
			{/* <TagInput
				addTag={(tag) => console.log('addTag', tag)}
				onPress={(tagName) => console.log('tagName', tagName)}
			/> */}
			{/* <ImageUpload>
				<View
					style={{
						width: 40,
						height: 40,
						borderWidth: 1,
						borderRadius: 10,
					}}
				>
					<Text style={{ textAlign: 'center', fontSize: 28 }}>+</Text>
				</View>
			</ImageUpload> */}
		</ScreenWrapper>
	);
}
