import { ComponentPropsWithoutRef } from 'react';
import {
	TouchableOpacity,
	Text,
	View,
	ViewStyle,
	StyleProp,
	Button,
} from 'react-native';

type ButtonProps = {
	title: string;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
	disabled?: boolean;
};

export default function CustomButton({
	title,
	onPress,
	style,
	disabled = false,
}: ButtonProps) {
	return (
		<View
			style={{
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: 4,
				elevation: 3,
				backgroundColor: '#42a4f5',
			}}
		>
			<Button
				disabled={disabled}
				onPress={onPress}
				color='#fff'
				title={title}
			/>
		</View>
	);
}
