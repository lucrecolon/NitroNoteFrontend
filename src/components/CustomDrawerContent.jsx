import React, { useContext } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../hooks/AuthContext';

export default function CustomDrawerContent(props) {
    const { user, logout } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
            {/* Perfil */}
            <View style={styles.profile}>
                <Ionicons name="person-circle-outline" size={60} color="#4A90E2" />
                <Text style={styles.name}>{user?.name || 'Usuario'}</Text>
                <Text style={styles.email}>{user?.email || 'email@ejemplo.com'}</Text>
            </View>

            {/* Contenido */}
            <View style={styles.menu}>
                {/* Configuración */}
                <DrawerItem
                    label="Configuración"
                    icon={({ color, size }) => (
                        <Ionicons name="settings-outline" size={size} color={color} />
                    )}
                    onPress={() => props.navigation.navigate("Configuracion")}
                />

                {/* Cerrar Sesion */}
                <DrawerItem
                    label="Cerrar sesión"
                    labelStyle={{ color: 'red' }}
                    icon={({ size }) => (
                        <Ionicons name="log-out-outline" size={size} color="red" />
                    )}
                    onPress={logout}
                />
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    profile: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 8,
    },
    email: {
        fontSize: 14,
        color: '#666',
    },
    menu: {
        flex: 1,
        marginTop: 10,
    },
});
