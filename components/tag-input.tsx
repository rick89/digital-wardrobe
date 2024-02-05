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
}: TagInputProps) {
	const filteredTags = tags.filter((tag) => {
		return tag.title.includes(inputText);
	});
	const inputTextIsNotSavedAsATag =
		!tags.find((tag) => tag.title === inputText) && inputText !== '';

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
		onChangeText('');
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
							newTag(inputText);
							onChangeText('');
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
				{filteredTags.map((tag) => {
					return selectedTags && selectedTags.includes(tag) ? (
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
							key={tag.id}
						>
							<Text style={{ color: 'white' }}>{tag.title}</Text>
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
									? selectedTag(tag)
									: onDelete && onDelete(tag)
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
							key={tag.id}
						>
							<Text style={{ color: 'white', marginRight: 10 }}>
								{tag.title}
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
