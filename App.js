import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './src/hooks/AuthContext';
import * as Updates from 'expo-updates';
import {useEffect} from "react";

export default function App() {
    async function checkForUpdates() {
        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                await Updates.fetchUpdateAsync();
                // ...reload the app
                await Updates.reloadAsync();
            }
        } catch (error) {
            // Manejar error
        }
    }
    useEffect(() => {
        checkForUpdates();
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