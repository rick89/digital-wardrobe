import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { DropdownMultiselectView } from 'expo-dropdown-multiselect';
import { useClothingSelector } from '../store/hooks';
import { Filter, Tag } from '../store/slices/clothing-slice';

export type TagFilterProps = {
	onChange: (selectedItems: any[]) => any;
};

export default function TagFilterDropdown({ onChange }: TagFilterProps) {
	const tags = useClothingSelector((state) => state.clothing.tags);
	const [selectedItems, setSelectedItems] = useState<Tag[]>([]);

	console.log('selectedItems', selectedItems);

	return (
		<View style={{ flex: 1 }}>
			<DropdownMultiselectView
				data={tags}
				displayKey='name'
				displayValue='name'
				selectedItem={selectedItems}
				setSelectedItem={setSelectedItems}
				// @ts-ignore
				onChange={(selectedItems: any[]) => onChange(selectedItems)}
			/>
		</View>
	);
}
