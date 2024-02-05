import { ReactNode } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateScreen from '../screens/create.tsx';
import UpcomingScreen from '../screens/upcoming.tsx';
import { AntDesign } from '@expo/vector-icons';
import SettingsScreen from '../screens/settings.tsx';
import HomeScreen from '../screens/home.tsx';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
	return (
		<Tab.Navigator
			initialRouteName='Home'
			backBehavior='history'
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					if (route.name === 'Home') {
						return (
							<AntDesign
								name='home'
								size={24}
								color={focused ? 'black' : 'gray'}
							/>
						);
					} else if (route.name === 'Create') {
						return (
							<AntDesign
								name='pluscircleo'
								size={24}
								color={focused ? 'black' : 'gray'}
							/>
						);
					} else if (route.name === 'Upcoming') {
						return (
							<AntDesign
								name='calendar'
								size={24}
								color={focused ? 'black' : 'gray'}
							/>
						);
					} else if (route.name === 'Settings') {
						return (
							<AntDesign
								name='setting'
								size={24}
								color={focused ? 'black' : 'gray'}
							/>
						);
					}
				},
				tabBarActiveTintColor: 'black',
				tabBarInactiveTintColor: 'gray',
				tabBarOptions: {
					labelStyle: {
						fontSize: 20,
					},
				},
				tabBarLabelStyle: {
					fontSize: 12,
				},
			})}
		>
			<Tab.Screen name='Home' component={HomeScreen} />
			<Tab.Screen name='Create' component={CreateScreen} />
			<Tab.Screen name='Upcoming' component={UpcomingScreen} />
			<Tab.Screen name='Settings' component={SettingsScreen} />
		</Tab.Navigator>
	);
}
