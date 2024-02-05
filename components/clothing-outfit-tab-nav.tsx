import { View, TouchableOpacity, Text } from 'react-native';

export type ClothingOutfitTabNavProps = {
	onPress: (selectedTab: string) => void;
	selectedTab: string;
};

export default function ClothingOutfitTabNav({
	onPress,
	selectedTab,
}: ClothingOutfitTabNavProps) {
	const tabStyle = {
		tab: {
			borderWidth: 1,
			paddingVertical: 10,
			paddingHorizontal: 20,
			flexGrow: 1,
			marginBottom: 20,
		},
	};
	return (
		<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
			<TouchableOpacity
				style={{
					...tabStyle.tab,
					backgroundColor:
						selectedTab === 'clothing' ? '#42a4f5' : 'white',
					borderColor:
						selectedTab === 'clothing' ? '#42a4f5' : 'white',
				}}
				onPress={() => onPress('clothing')}
			>
				<Text
					style={{
						color: selectedTab === 'clothing' ? 'white' : '#999',
						textAlign: 'center',
					}}
				>
					Clothing
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={{
					...tabStyle.tab,
					backgroundColor:
						selectedTab === 'outfit' ? '#42a4f5' : 'white',
					borderColor: selectedTab === 'outfit' ? '#42a4f5' : 'white',
				}}
				onPress={() => onPress('outfit')}
			>
				<Text
					style={{
						color: selectedTab === 'outfit' ? 'white' : '#999',
						textAlign: 'center',
					}}
				>
					Outfit
				</Text>
			</TouchableOpacity>
		</View>
	);
}
