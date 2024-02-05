import { type ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export type ImageUploadProps = {
	children: ReactNode;
	uploadedImage: (uri: string) => void;
};

export default function ImageUpload({
	children,
	uploadedImage,
}: ImageUploadProps) {
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			uploadedImage(result.assets[0].uri);
		}
	};

	return <TouchableOpacity onPress={pickImage}>{children}</TouchableOpacity>;
}
