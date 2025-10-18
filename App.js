import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './src/hooks/AuthContext';
import * as Updates from 'expo-updates';
import { useEffect } from "react";
import { registerForPushNotificationsAsync } from './src/utils/notifications';

export default function App() {
    async function checkForUpdates() {
        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
            }
        } catch (error) {
            console.log('Error checking for updates:', error);
        }
    }

    useEffect(() => {
        checkForUpdates();

        // Registrar para push notifications
        registerForPushNotificationsAsync()
            .then(token => console.log('Push token:', token))
            .catch(error => console.log('Push notification error:', error));
    }, []);

    return (
        <AuthProvider>
            <NavigationContainer>
                <StackNavigator />
                <Toast/>
            </NavigationContainer>
        </AuthProvider>
    );
}