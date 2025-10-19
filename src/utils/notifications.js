import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Configurar el manejador de notificaciones
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

// Configurar para redirección cuando se toca la notificación
export function setupNotificationListeners(navigation) {
    // Listener para cuando el usuario TOCA la notificación
    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
        const data = response.notification.request.content.data;

        console.log('Usuario tocó la notificación:', data);

        // Redirigir basado en el tipo de notificación
        if (data.type === 'maintenance_reminder' && data.maintenanceId) {
            navigation.navigate('Mantenimientos', {
                screen: 'MantenimientoDetails',
                params: { maintenanceId: data.maintenanceId }
            });
        }
    });

    return responseListener;
}

export function handleRegistrationError(errorMessage) {
    console.error(errorMessage);
    throw new Error(errorMessage);
}

export async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            handleRegistrationError('Permiso denegado para notificaciones push!');
            return null;
        }

        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

        if (!projectId) {
            handleRegistrationError('Project ID not found');
            return null;
        }

        try {
            const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;

            console.log('Push token obtained:', pushTokenString);
            return pushTokenString;
        } catch (e) {
            handleRegistrationError(`${e}`);
            return null;
        }
    } else {
        handleRegistrationError('Must use physical device for push notifications');
        return null;
    }
}