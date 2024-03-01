import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { DateTime } from 'luxon';
import { AntDesign } from '@expo/vector-icons';
import { ItemType } from '../store/slices/clothing-slice';

export type CustomDateTimePickerProps = {
	selectedDateTime: (dateTime: DateTime | null) => void;
	for: ItemType;
	toggleVisibility: (isVisible: boolean) => void;
	isVisible: boolean;
};

export default function CustomDateTimePicker({
	selectedDateTime,
	toggleVisibility,
	isVisible,
}: CustomDateTimePickerProps) {
	const [date, setDate] = useState(new Date());
	const [isDateVisible, setIsDateVisible] = useState(true);
	const [isTimeVisible, setIsTimeVisible] = useState(true);

	const onChange = (
		event: DateTimePickerEvent,
		selectedDate: Date | undefined,
		type: 'date' | 'time'
	) => {
		if (typeof selectedDate === 'undefined') {
			return;
		}
		selectedDateTime(DateTime.fromJSDate(selectedDate));
		setDate(selectedDate);
	};

	const toggleDateTimePicker = () => {
		const addToCalendar = !isVisible;
		selectedDateTime(null);
		if (addToCalendar) {
			selectedDateTime(DateTime.now());
		}
		toggleVisibility(!isVisible);
	};

	return (
		<View>
			<View
				style={{
					flexWrap: 'wrap',
				}}
			>
				<TouchableOpacity
					onPress={() => {
						toggleDateTimePicker();
					}}
					style={{
						flexDirection: 'row',
						backgroundColor: '#42a4f5',
						borderRadius: 8,
						paddingVertical: 8,
						paddingHorizontal: 10,
						marginBottom: 20,
						alignItems: 'center',
					}}
				>
					<Text
						style={{
							color: 'white',
							fontSize: 16,
						}}
					>
						{isVisible ? 'Cancel' : 'Add to calendar'}
					</Text>
					{isVisible ? (
						<AntDesign
							style={{
								marginLeft: 20,
							}}
							name='closecircle'
							size={20}
							color='white'
						/>
					) : (
						<AntDesign
							style={{
								marginLeft: 20,
							}}
							name='calendar'
							size={20}
							color='white'
						/>
					)}
				</TouchableOpacity>
			</View>
			{isVisible ? (
				<View style={{ flexDirection: 'row', marginLeft: -10 }}>
					{isDateVisible && (
						<DateTimePicker
							testID='dateTimePicker'
							value={date}
							mode={'date'}
							onChange={(event, selectedDate) =>
								onChange(event, selectedDate, 'date')
							}
						/>
					)}
					{isTimeVisible && (
						<DateTimePicker
							testID='dateTimePicker'
							value={date}
							mode={'time'}
							onChange={(event, selectedDate) =>
								onChange(event, selectedDate, 'time')
							}
						/>
					)}
				</View>
			) : null}
		</View>
	);
}
