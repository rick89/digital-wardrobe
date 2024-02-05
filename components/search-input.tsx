import { View } from 'react-native';
import Input from './input';
import { FontAwesome } from '@expo/vector-icons';

export type SearchInputProps = {
	onChangeText: (searchTerm: string) => void;
	value: string;
};

export default function SearchInput({ onChangeText, value }: SearchInputProps) {
	return (
		<View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
			<Input
				style={{
					width: '100%',
					height: 40,
				}}
				value={value}
				onChangeText={(searchTerm) => onChangeText(searchTerm)}
				placeholder='Search'
			/>
			<FontAwesome
				style={{
					marginLeft: 'auto',
					position: 'absolute',
					right: 0,
					marginRight: 10,
				}}
				name='search'
				size={20}
				color='#999'
			/>
		</View>
	);
}
