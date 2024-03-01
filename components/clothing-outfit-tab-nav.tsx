import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export type ClothingOutfitTabNavProps = {
	onPress: (selectedTab: 'clothing' | 'outfit') => void;
	selectedTab: 'clothing' | 'outfit';
};

export default function ClothingOutfitTabNav({
	onPress,
	selectedTab,
}: ClothingOutfitTabNavProps) {
	return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'center',
				marginBottom: 20,
			}}
		>
			<TouchableOpacity
				style={{
					...styles.tab,
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
					...styles.tab,
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

const styles = StyleSheet.create({
	tab: {
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 20,
		flexGrow: 1,
	},
});
