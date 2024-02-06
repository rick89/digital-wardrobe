import { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
} from 'react-native';
import Input from './input';
import { useClothingSelector } from '../store/hooks';
import { AntDesign } from '@expo/vector-icons';
import { Tag } from '../store/slices/clothing-slice';
import { uniqueId } from '../utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export type TagInputProps = {
	selectedTag: (tag: Tag) => void;
	tags: Tag[];
	selectedTags?: Tag[] | undefined;
	style?: StyleProp<ViewStyle>;
	onChangeText: (inputText: string) => void;
	clearInput: () => void;
	inputText: string;
	isTagEditor?: boolean;
	onDelete?: (tag: Tag) => void;
};

export default function TagInput({
	selectedTag,
	tags,
	selectedTags,
	style,
	onChangeText,
	inputText,
	isTagEditor = false,
	onDelete,
	clearInput,
}: TagInputProps) {
	const filteredTags = tags.filter((tag) => {
		return tag.title.includes(inputText);
	});
	const inputTextIsNotSavedAsATag =
		!tags.find((tag) => tag.title === inputText) && inputText !== '';

	filteredTags.map((tag) => {
		selectedTags?.map((s) => {
			if (tag.id === s.id) {
				console.log('tag selcted', tag);
			}
		});
		console.log('included? ', selectedTags?.includes(tag), tag);
	});

	const newTag = (title: string) => {
		const newTag: Tag = {
			id: uniqueId(),
			new: true,
			title,
			type: 'clothing',
		};
		selectedTag(newTag);
	};

	const onSubmitEditing = () => {
		console.log('in onsubmit editing');
		if (!inputTextIsNotSavedAsATag) {
			return;
		}
		console.log('proper inside');
		newTag(inputText);
		clearInput();
	};

	return (
		<View>
			<View
				style={{
					flexDirection: 'row',
					width: 300,
					alignItems: 'center',
				}}
			>
				<Input
					value={inputText}
					placeholder={'Tags'}
					onSubmitEditing={onSubmitEditing}
					onChangeText={(inputText) =>
						onChangeText(inputText.toLowerCase())
					}
				/>

				{inputTextIsNotSavedAsATag ? (
					<TouchableOpacity
						style={{ marginLeft: 'auto', marginRight: 6 }}
						onPress={() => {
							onSubmitEditing();
						}}
					>
						<AntDesign name='pluscircle' size={24} color='green' />
					</TouchableOpacity>
				) : null}
			</View>

			{tags.length === 0 && (
				<Text style={{ marginTop: 6 }}>
					You have no tags, use the text input above to add as many
					tags as you want.
				</Text>
			)}

			<View
				style={{
					flexDirection: 'row',
					flexWrap: 'wrap',
					marginBottom: 20,
					marginTop: 2,
				}}
			>
				{filteredTags.map((filteredTag) => {
					return selectedTags?.find(
						(selectedTag) => selectedTag.id === filteredTag.id
					) ? (
						<View
							style={{
								backgroundColor: 'green',
								paddingHorizontal: 12,
								paddingVertical: 8,
								marginRight: 4,
								borderRadius: 200,
								marginTop: 6,
								flexDirection: 'row',
								alignItems: 'center',
							}}
							key={filteredTag.id}
						>
							<Text style={{ color: 'white' }}>
								{filteredTag.title}
							</Text>
							<Ionicons
								style={{
									marginLeft: 16,
								}}
								name='checkmark-circle'
								size={20}
								color='white'
							/>
						</View>
					) : (
						<TouchableOpacity
							onPress={() =>
								!isTagEditor
									? selectedTag(filteredTag)
									: onDelete && onDelete(filteredTag)
							}
							style={{
								backgroundColor: 'black',
								paddingHorizontal: 12,
								paddingVertical: 8,
								marginRight: 4,
								borderRadius: 200,
								marginTop: 6,
								flexDirection: 'row',
								alignItems: 'center',
							}}
							key={filteredTag.id}
						>
							<Text style={{ color: 'white', marginRight: 10 }}>
								{filteredTag.title}
							</Text>
							{isTagEditor ? (
								<FontAwesome
									name='trash-o'
									size={20}
									color='red'
								/>
							) : (
								<AntDesign
									name='pluscircle'
									size={16}
									color='white'
								/>
							)}
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
}
