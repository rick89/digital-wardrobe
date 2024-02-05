import { useState } from 'react';
import { View, SafeAreaView, Text, StyleProp, ViewStyle } from 'react-native';
import Button from './button';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

export type CustomDateTimePickerProps = {
	selectedDateTime: (dateTime: Date) => void;
	style?: StyleProp<ViewStyle>;
};

export default function CustomDateTimePicker({
	selectedDateTime,
	style,
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
		selectedDateTime(selectedDate);
		setDate(selectedDate);
	};

	return (
		<View
			style={{
				//@ts-ignore
				...style,
			}}
		>
			<SafeAreaView>
				<View>
					{/* <Button
						onPress={() => {
							setIsDateVisible(true);
							setIsTimeVisible(true);
						}}
						title='Pick a date'
					/> */}
				</View>
				<View style={{ flexDirection: 'row' }}>
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
			</SafeAreaView>
		</View>
	);
}
