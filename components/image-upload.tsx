import { type ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uniqueId } from '../utils/helpers';

export type ImageObject = {
	id: string;
	uri: string;
};

export type ImageUploadProps = {
	children: ReactNode;
	uploadedImage: (uri: ImageObject) => void;
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
			const imageObject: ImageObject = {
				id: uniqueId(),
				uri: result.assets[0].uri,
			};
			uploadedImage(imageObject);
		}
	};

	return <TouchableOpacity onPress={pickImage}>{children}</TouchableOpacity>;
}
