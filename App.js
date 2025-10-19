import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './src/hooks/AuthContext';
import * as Updates from 'expo-updates';
import { setupNotificationListeners } from './src/utils/notifications';
import React, { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';

export default function App() {
    const notificationListener = useRef();

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

        // Configurar listeners de notificaciones
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            const data = response.notification.request.content.data;

            // Redirigir cuando se toca la notificación
            if (data.type === 'maintenance_reminder' && data.maintenanceId) {
                // Navegar a la pantalla de mantenimientos
                navigation.replace("Mantenimientos");
                // La navegación se manejará cuando el usuario toque la notificación
                console.log('Redirigiendo a mantenimiento:', data.maintenanceId);
            }
        });

        return () => {
            subscription.remove();
        };
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