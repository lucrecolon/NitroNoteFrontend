import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './src/hooks/AuthContext';

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <StackNavigator />
                <Toast/>
            </NavigationContainer>
        </AuthProvider>
    );
}