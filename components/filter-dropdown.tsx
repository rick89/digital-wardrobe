import { useState } from 'react';
import { View } from 'react-native';
import { DropdownMultiselectView } from 'expo-dropdown-multiselect';
import { Tag } from '../store/slices/clothing-slice';

export type TagFilterProps = {
	onChange: (selectedItems: any[]) => any;
	tags: Tag[];
};

export default function TagFilterDropdown({ onChange, tags }: TagFilterProps) {
	const [selectedItems, setSelectedItems] = useState<Tag[]>([]);

	console.log('selectedItems', selectedItems);

	return (
		<View style={{ flex: 1 }}>
			<DropdownMultiselectView
				data={tags}
				displayKey='title'
				displayValue='title'
				selectedItem={selectedItems}
				setSelectedItem={setSelectedItems}
				// @ts-ignore
				onChange={(selectedItems: any[]) => onChange(selectedItems)}
			/>
		</View>
	);
}
