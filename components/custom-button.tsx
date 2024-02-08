import {
	TouchableOpacity,
	Text,
	View,
	ViewStyle,
	StyleProp,
	StyleSheet,
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
	if (disabled) {
		return (
			<View
				style={{
					...styles.button,
					backgroundColor: '#efefef',
					borderColor: '#999',
				}}
			>
				<Text
					style={{
						...styles.buttonText,
						color: '#999',
					}}
				>
					{title}
				</Text>
			</View>
		);
	}
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				...styles.button,
				backgroundColor: '#42a4f5',
				borderColor: '#42a4f5',
			}}
		>
			<Text
				style={{
					...styles.buttonText,
					color: 'white',
				}}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 4,
		paddingVertical: 14,
		borderWidth: 2,
	},
	buttonText: {
		fontSize: 18,
	},
});
