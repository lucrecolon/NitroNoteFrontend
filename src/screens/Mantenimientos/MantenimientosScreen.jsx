import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

// Datos de ejemplo
const PENDIENTES = [
    { id: '1', title: 'Cambio de aceite', date: '2025-10-10' },
    { id: '2', title: 'Revisión de frenos', date: '2025-09-20' },
];
const HECHOS = [
    { id: '3', title: 'VTV', date: '2025-06-01' },
];

// 🔹 Componente Listado
function Listado({ data, done }) {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                contentContainerStyle={{ padding: 16 }}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('EditarMantenimiento', { maintenanceId: item.id })
                        }
                        style={{
                            padding: 14,
                            borderWidth: 1,
                            borderColor: done ? '#A7F3D0' : '#e5e7eb',
                            backgroundColor: done ? '#ECFDF5' : '#fff',
                            borderRadius: 12,
                            marginBottom: 10,
                        }}
                    >
                        <Text style={{ fontWeight: '600', color: done ? '#065F46' : '#111827' }}>
                            {item.title}
                        </Text>
                        <Text style={{ opacity: 0.7, color: done ? '#047857' : '#374151' }}>
                            {done ? `Hecho: ${item.date}` : `Para: ${item.date}`}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            {/* FAB visible solo en "Por hacer" */}
            {!done && (
                <TouchableOpacity
                    onPress={() => navigation.navigate('CrearMantenimiento')}
                    style={{
                        position: 'absolute',
                        right: 20,
                        bottom: 28,
                        width: 56,
                        height: 56,
                        borderRadius: 28,
                        backgroundColor: '#2563EB',
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: 5,
                    }}
                >
                    <Text style={{ color: '#fff', fontSize: 28, lineHeight: 28 }}>＋</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

// 🔹 Tab "Por hacer"
function PorHacerTab() {
    return <Listado data={PENDIENTES} done={false} />;
}

// 🔹 Tab "Hechos"
function HechosTab() {
    return <Listado data={HECHOS} done={true} />;
}

// 🔹 Pantalla principal que exportás
export default function MantenimientosListScreen() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#2563EB',
                tabBarIndicatorStyle: { backgroundColor: '#2563EB' },
            }}
        >
            <Tab.Screen name="Por hacer" component={PorHacerTab} />
            <Tab.Screen name="Hechos" component={HechosTab} />
        </Tab.Navigator>
    );
}
