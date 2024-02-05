import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './components/tab-navigator.tsx';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<TabNavigator />
			</NavigationContainer>
		</Provider>
	);
}
