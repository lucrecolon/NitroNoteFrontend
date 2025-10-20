import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Api from '../../service/service';
import ModalActualizarKilometros from '../Vehiculos/ModalActualizarKilometros';

const Tab = createMaterialTopTabNavigator();

function Listado({ data, done, onAddPress, onRefresh, refreshing }) {
    const navigation = useNavigation();
    const [patenteFinalizar, setPatenteFinalizar] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [matenimientoId, setIdMantenimiento] = useState(0);

    const handleActualizarKilometros = (patente,id) => {
        console.log("Patente a actualizar:", patente);
        setModalVisible(true);
        setPatenteFinalizar(patente);
        setIdMantenimiento(id);
    }
    

    const handleEditMaintenance = (mantenimiento) => {
      navigation.navigate("EditarMantenimiento", {mantenimiento});
    };

    return (
        <View style={{ flex: 1 }}>
            <ModalActualizarKilometros 
                visible={modalVisible} 
                patente={patenteFinalizar}  
                idMantenimiento= {matenimientoId}
                onClose={()=> setModalVisible(false)}
                refresh={onRefresh}/>
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
                       const id = item.id ?? item.idMantenimiento;
                       const nombre = item?.nombre ?? item?.tipo ?? '-';
                       const fechaHecho = item?.fechaDeRealizacion && item.fechaDeRealizacion !== "" ? item.fechaDeRealizacion : "-";
                       const fechaPara = item?.fechaARealizar && item.fechaARealizar !== "" ? item.fechaARealizar : "-";
                       const km = item?.kmARealizar ?? item?.kmRealizados ?? '-';
                       const patente = item?.patente;
                       return (
                           <View
                               style={{
                                   padding: 14,
                                   borderWidth: 1,
                                   borderColor: done ? '#A7F3D0' : '#e5e7eb',
                                   backgroundColor: done ? '#ECFDF5' : '#fff',
                                   borderRadius: 12,
                                   marginBottom: 10,
                                   flexDirection: 'row', // dividimos en 2 columnas
                               }}
                           >
                               {/* Columna izquierda: textos */}
                               <View style={{ flex: 1 }}>
                                   <Text style={{ fontWeight: '600', color: done ? '#065F46' : '#111827' }}>
                                       {nombre}
                                   </Text>
                                   <Text style={{ opacity: 0.7, color: done ? '#047857' : '#374151' }}>
                                       {patente ?? '_'}
                                   </Text>
                                   <Text style={{ opacity: 0.7, color: done ? '#047857' : '#374151' }}>
                                       {done ? `Hecho el ${fechaHecho}` : `Realizar el ${fechaPara}`}
                                   </Text>
                                   <Text style={{ opacity: 0.7, color: done ? '#047857' : '#374151' }}>
                                       {done ? `Hecho a los ${km} KM` : `Realizar a los ${km} KM`}
                                   </Text>
                               </View>

                               {/* Columna derecha: acciones */}
                               <View
                                   style={{
                                       justifyContent: done ? 'center' : 'space-between',
                                       alignItems: 'center',
                                       marginRight: 8, // <-- mueve todo un poquito a la izquierda
                                   }}
                               >
                                   {/* Botón circular */}
                                   <View style={{ flex: 1, justifyContent: 'center' }}>
                                       <TouchableOpacity
                                           onPress={() => !done && handleActualizarKilometros(patente, id)}
                                           style={{
                                               width: 28,
                                               height: 28,
                                               borderRadius: 14,
                                               borderWidth: 2,
                                               borderColor: done ? '#047857' : '#9CA3AF',
                                               backgroundColor: done ? '#047857' : 'transparent',
                                               alignItems: 'center',
                                               justifyContent: 'center',
                                           }}
                                       >
                                           {done && (
                                               <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>✓</Text>
                                           )}
                                       </TouchableOpacity>
                                   </View>

                                   {/* Botón lápiz */}
                                   {!done && (
                                       <View style={{ flex: 1, justifyContent: 'center' }}>
                                           <TouchableOpacity
                                               onPress={() => handleEditMaintenance(item)}
                                               style={{
                                                   width: 28,
                                                   height: 28,
                                                   borderRadius: 14,
                                                   alignItems: 'center',
                                                   justifyContent: 'center',
                                               }}
                                           >
                                               <Ionicons name="pencil" size={18} color="#2563EB" />
                                           </TouchableOpacity>
                                       </View>
                                   )}
                               </View>
                           </View>
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
            const all = await Api.getMantenimientosUsuario();
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
            onSaved: fetchMantenimientos,
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
