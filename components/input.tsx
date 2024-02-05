import {
	NativeSyntheticEvent,
	StyleProp,
	TextInput,
	TextInputKeyPressEventData,
	ViewStyle,
} from 'react-native';

export type TextInputProps = {
	placeholder?: string;
	onChangeText: (newText: string) => void;
	onSubmitEditing?: () => void;
	value: string;
	style?: StyleProp<ViewStyle>;
};

export default function Input({
	placeholder,
	value,
	onChangeText,
	onSubmitEditing,
	style,
}: TextInputProps) {
	return (
		<TextInput
			value={value}
			autoCorrect={false}
			onSubmitEditing={onSubmitEditing}
			onChangeText={(newText) => onChangeText(newText)}
			style={{
				backgroundColor: 'white',
				borderWidth: 1,
				borderColor: '#d9d9d9',
				width: 300,
				paddingVertical: 10,
				paddingHorizontal: 5,
				borderRadius: 5,
				//@ts-ignore
				...style,
			}}
			placeholder={placeholder}
		/>
	);
}
