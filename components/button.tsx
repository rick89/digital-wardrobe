import { ComponentPropsWithoutRef } from 'react';
import { TouchableOpacity, Text, ViewStyle, StyleProp } from 'react-native';

type ButtonProps = {
	title: string;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
};

export default function Button({ title, onPress, style }: ButtonProps) {
	return (
		<TouchableOpacity
			style={{
				alignItems: 'center',
				justifyContent: 'center',
				paddingVertical: 12,
				paddingHorizontal: 32,
				borderRadius: 4,
				elevation: 3,
				backgroundColor: '#42a4f5',
			}}
			onPress={onPress}
		>
			<Text
				style={{
					fontSize: 16,
					lineHeight: 21,
					fontWeight: 'bold',
					letterSpacing: 0.25,
					color: 'white',
				}}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
}
