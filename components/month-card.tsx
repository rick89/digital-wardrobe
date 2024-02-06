import { Text, View } from 'react-native';

type MonthCardProps = {
	month: string;
	items: [];
};

export default function MonthCard({ month, items }: MonthCardProps) {
	return (
		<View>
			<Text style={{ fontSize: 22 }}>{month}</Text>
			{items.map((item) => (
				<Text>{item.title}</Text>
			))}
		</View>
	);
}
