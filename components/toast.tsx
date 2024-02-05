import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export type ToastProps = {
	text?: string;
	type?: 'success' | 'error';
};

export default function Toast({
	text = 'Saved!',
	type = 'success',
}: ToastProps) {
	const [isVisible, setIsVisible] = useState<boolean>(true);
	const secondsToDisplayUntilHidden = 10;

	setTimeout(() => {
		setIsVisible(false);
	}, secondsToDisplayUntilHidden * 1000);

	if (!isVisible) {
		return null;
	}

	return (
		<View
			style={{
				backgroundColor: type === 'error' ? '#de2828' : '#44d446',
				flexDirection: 'row',
				width: 200,
				height: 40,
				borderRadius: 20,
				paddingHorizontal: 15,
				alignItems: 'center',
			}}
		>
			<Text style={{ color: 'white' }}>{text}</Text>
			<TouchableOpacity
				onPress={() => setIsVisible(false)}
				style={{ marginLeft: 'auto' }}
			>
				<Feather name='x' size={18} color='white' />
			</TouchableOpacity>
		</View>
	);
}
