import { useState, useEffect } from 'react';
import {
	Text,
	View,
	FlatList,
	Alert,
	ScrollView,
	TouchableOpacity,
	ListRenderItem,
} from 'react-native';
import ScreenWrapper from '../components/screen-wrapper';
import SearchInput from '../components/search-input';
import ClothingCard from '../components/clothing-card';
import TagFilter from '../components/tag-filter';
import { useClothingSelector } from '../store/hooks';
import { useClothingDispatch } from '../store/hooks';
import { AntDesign } from '@expo/vector-icons';

import {
	ClothingItem,
	Outfit,
	Tag,
	deleteClothing,
} from '../store/slices/clothing-slice';
import ClothingOutfitTabNav from '../components/clothing-outfit-tab-nav';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
	const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [filteredClothes, setFilteredClothes] = useState<ClothingItem[]>([]);
	const [filteredOutfits, setFilteredOutfits] = useState<ClothingItem[]>([]);
	const clothingTags = useClothingSelector((state) => state.tags).filter(
		(tag) => tag.type === 'clothing'
	);
	const dispatch = useClothingDispatch();
	const [selectedTab, setSelectedTab] = useState<string>('clothing');

	let allClothing = useClothingSelector((state) => {
		return state.individualClothingItems;
	}).sort((a, b) => (a.created > b.created ? -1 : 1));

	const clothes = allClothing.filter((item) => item.type === 'clothing');
	const outfits = allClothing.filter((item) => item.type === 'outfit');

	allClothing.map((c) => {
		console.log('title: ', c.title);
		c.tags.map((tag) => console.log('tag', tag));
	});

	useEffect(() => {
		let filteredClothesResult: ClothingItem[];
		let filteredOutfitsResult: ClothingItem[];
		if (searchTerm !== '') {
			if (selectedTab === 'clothing') {
				filteredClothesResult = clothes.filter((item) =>
					item.title.toLowerCase().includes(searchTerm.toLowerCase())
				);
				setFilteredClothes(filteredClothesResult);
			} else {
				filteredOutfitsResult = outfits.filter((item) =>
					item.title.toLowerCase().includes(searchTerm.toLowerCase())
				);
				setFilteredOutfits(filteredOutfitsResult);
			}
		}
	}, [searchTerm]);

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

	const toggleTagSelection = (tag: Tag) => {
		if (selectedTags.includes(tag)) {
			const filteredTags = selectedTags.filter(
				(item) => item.id !== tag.id
			);
			setSelectedTags(filteredTags);
		} else {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	const filterClothes = () => {};

	if (allClothing.length === 0) {
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

	const Item = ({ item }: { item: ClothingItem }) => (
		<ClothingCard
			item={item}
			onPress={() => {
				// navigation.navigate('TabNavigator', {
				//  screen: 'create',
				// });
			}}
			onDelete={(item) => {
				doDelete(item);
			}}
			key={item.id}
		/>
	);

	const renderItem: ListRenderItem<ClothingItem> = ({ item }) => (
		<Item item={item} />
	);

	return (
		<ScreenWrapper>
			<View
				style={{
					marginBottom: 20,
					flexDirection: 'column',
				}}
			>
				<View style={{ marginBottom: 10 }}>
					<SearchInput
						value={searchTerm}
						onChangeText={(searchTerm) => setSearchTerm(searchTerm)}
					/>
				</View>
				<ScrollView
					horizontal={true}
					style={{ flexDirection: 'row', marginTop: 20 }}
				>
					<TagFilter
						selectedTags={selectedTags}
						onPress={(tag) => toggleTagSelection(tag)}
						tags={clothingTags}
					/>
				</ScrollView>
			</View>
			<ClothingOutfitTabNav
				onPress={(selectedTab) => {
					setSelectedTab(selectedTab);
					setSearchTerm('');
				}}
				selectedTab={selectedTab}
			/>

			{selectedTab === 'clothing' ? (
				<FlatList
					columnWrapperStyle={{
						marginTop: 20,
						flex: 1,
						justifyContent: 'space-around',
					}}
					numColumns={2}
					data={searchTerm !== '' ? filteredClothes : clothes}
					renderItem={renderItem}
					keyExtractor={(item: ClothingItem) => item.id}
					extraData={clothes}
					ListFooterComponent={
						<View>
							<TouchableOpacity
								style={{
									flex: 1,
									marginTop: 20,
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<View
									style={{
										flex: 1,
										width: 120,
										height: 120,
										aspectRatio: 1,
										borderRadius: 10,
										backgroundColor: '#d9d9d9',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<AntDesign
										name='pluscircleo'
										size={34}
										color='#444'
									/>
								</View>
							</TouchableOpacity>
						</View>
					}
				/>
			) : (
				<FlatList
					columnWrapperStyle={{
						marginTop: 20,
						flex: 1,
						justifyContent: 'space-around',
						alignItems: 'flex-start',
					}}
					numColumns={2}
					data={searchTerm !== '' ? filteredOutfits : outfits}
					renderItem={({ item }) => (
						<ClothingCard
							item={item}
							onPress={() => {
								// navigation.navigate('TabNavigator', {
								//  screen: 'create',
								// });
							}}
							onDelete={(item) => {
								doDelete(item);
							}}
							key={item.id}
						/>
					)}
					keyExtractor={(item) => item.id}
					ListFooterComponent={
						<View>
							<TouchableOpacity
								style={{
									flex: 1,
									marginTop: 20,
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<View
									style={{
										flex: 1,
										width: 120,
										height: 120,
										aspectRatio: 1,
										borderRadius: 10,
										backgroundColor: '#d9d9d9',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<AntDesign
										name='pluscircleo'
										size={34}
										color='#444'
									/>
								</View>
							</TouchableOpacity>
						</View>
					}
				/>
			)}
		</ScreenWrapper>
	);
}
