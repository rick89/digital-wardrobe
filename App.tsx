import { Provider } from 'react-redux';
import { persistor, store } from './store/store.ts';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './components/tab-navigator.tsx';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<NavigationContainer>
					<TabNavigator />
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
}
