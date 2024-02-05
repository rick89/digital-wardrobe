import { type ReactNode } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type ScreenWrapperProps = {
	children?: ReactNode;
};

export default function ScreenWrapper({ children }: ScreenWrapperProps) {
	const navigation = useNavigation();
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ paddingHorizontal: 14, flex: 1, marginBottom: 20 }}>
				<View style={{ flexDirection: 'row', marginBottom: 20 }}>
					{navigation.canGoBack() && (
						<Ionicons
							onPress={() => navigation.goBack()}
							name='chevron-back'
							size={24}
							color='black'
						/>
					)}
				</View>
				{children}
			</View>
		</SafeAreaView>
	);
}
