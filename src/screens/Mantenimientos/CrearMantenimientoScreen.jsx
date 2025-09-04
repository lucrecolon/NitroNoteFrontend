// screens/CrearMantenimientoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function CrearMantenimientoScreen() {
    const nav = useNavigation();
    const route = useRoute();
    const preVehicleId = route.params?.vehicleId; // opcional si venís desde un auto

    const [nombre, setNombre] = useState('');
    const [fechaARealizar, setFechaARealizar] = useState('');
    const [kmARealizar, setKmARealizar] = useState('');

    const onSave = async () => {
        // const payload = { nombre, fechaARealizar, kmARealizar: kmARealizar? Number(kmARealizar): 0, finalizado: false, vehicleId: preVehicleId };
        // await api.post('/mantenimientos', payload);
        Alert.alert('OK', 'Mantenimiento creado');
        nav.goBack();
    };

    return (
        <View style={{ padding: 16, gap: 10 }}>
            <Text>Nombre</Text>
            <TextInput value={nombre} onChangeText={setNombre} placeholder="Cambio de aceite"
                       style={{ borderWidth:1, borderRadius:8, padding:10 }} />
            <Text>Fecha a realizar (YYYY-MM-DD)</Text>
            <TextInput value={fechaARealizar} onChangeText={setFechaARealizar} placeholder="2025-10-10"
                       style={{ borderWidth:1, borderRadius:8, padding:10 }} />
            <Text>Km a realizar (opcional)</Text>
            <TextInput value={kmARealizar} onChangeText={setKmARealizar} keyboardType="numeric" placeholder="125000"
                       style={{ borderWidth:1, borderRadius:8, padding:10 }} />
            <Button title="Guardar" onPress={onSave} />
        </View>
    );
}
