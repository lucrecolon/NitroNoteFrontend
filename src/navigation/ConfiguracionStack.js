import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConfiguracionCuentaScreen from "../screens/Configuracion/ConfiguracionCuentaScreen";
import ConfiguracionNotificacionesScreen from "../screens/Configuracion/ConfiguracionNotificacionesScreen";
import ConfiguracionScreen from "../screens/Configuracion/ConfiguracionScreen";

const Stack = createNativeStackNavigator();

export default function ConfiguracionStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,   // 👈 el header lo maneja el stack, no el drawer
            }}
        >
            <Stack.Screen
                name="ConfiguracionMain"
                component={ConfiguracionScreen}
                options={{
                    title: "Configuración",
                }}
            />
            <Stack.Screen
                name="ConfiguracionCuenta"
                component={ConfiguracionCuentaScreen}
                options={{ title: "Configuración de Cuenta" }}
            />
            <Stack.Screen
                name="ConfiguracionNotificaciones"
                component={ConfiguracionNotificacionesScreen}
                options={{ title: "Configuración de Notificaciones" }}
            />
        </Stack.Navigator>
    );
}
