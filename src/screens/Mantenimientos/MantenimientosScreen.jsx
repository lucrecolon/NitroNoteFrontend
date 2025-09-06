import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import Api from '../../service/service';

const Tab = createMaterialTopTabNavigator();

function Listado({ data, done, onAddPress, onRefresh, refreshing }) {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                contentContainerStyle={{ padding: 16 }}
                data={data}
                keyExtractor={(item) => String(item.id ?? item.idMantenimiento)}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={
                    <Text style={{ textAlign: 'center', marginTop: 40, opacity: 0.6 }}>
                        {done ? 'No hay mantenimientos realizados' : 'No hay mantenimientos por hacer'}
                    </Text>
                }
                renderItem={({ item }) => {
                    const fechaHecho = item.fechaDeRealizacion ?? item.fechaRealizacion ?? '-';
                    const fechaPara = item.fechaARealizar ?? '-';
                    const km = item.kmARealizar ?? item.kmARealizar ?? '-';

                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('EditarMantenimiento', { maintenanceId: item.id ?? item.idMantenimiento })}
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
                                {item.nombre}
                            </Text>
                            <Text style={{ opacity: 0.7, color: done ? '#047857' : '#374151' }}>
                                {done ? `Hecho el ${fechaHecho}` : `Realizar el ${fechaPara}`}
                            </Text>
                            <Text style={{ opacity: 0.7, color: done ? '#047857' : '#374151' }}>
                                {done ? `Hecho a los ${km} KM` : `Realizar a los ${km} KM`}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />

            {!done && (
                <TouchableOpacity
                    onPress={onAddPress}
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



export default function MantenimientosScreen() {
    const [pendientes, setPendientes] = useState([]);
    const [hechos, setHechos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    const fetchMantenimientos = async () => {
        try {
            setRefreshing(true);
            const all = await Api.getAllMantenimientos();
            setPendientes((all ?? []).filter((m) => !m.finalizado));
            setHechos((all ?? []).filter((m) => m.finalizado));
        } catch (e) {
            console.error('fetchMantenimientos error', e);
            Alert.alert('Error', 'No se pudo cargar la lista de mantenimientos.');
        } finally {
            setRefreshing(false);
        }
    };

    useFocusEffect(useCallback(() => { fetchMantenimientos(); }, []));

    const handleAddPress = () => {
        navigation.navigate('CrearMantenimiento', {
            // refresca cuando vuelve de crear mantenimiento
            onSaved: fetchMantenimientos,
            // vehicleId: 123, // cuando vinculemos con el auto
        });
    };

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#2563EB',
                tabBarIndicatorStyle: { backgroundColor: '#2563EB' },
            }}
        >
            <Tab.Screen name="Por hacer">
                {() => (
                    <Listado
                        data={pendientes}
                        done={false}
                        onAddPress={handleAddPress}
                        onRefresh={fetchMantenimientos}
                        refreshing={refreshing}
                    />
                )}
            </Tab.Screen>
            <Tab.Screen name="Hechos">
                {() => (
                    <Listado
                        data={hechos}
                        done={true}
                        onRefresh={fetchMantenimientos}
                        refreshing={refreshing}
                    />
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
}