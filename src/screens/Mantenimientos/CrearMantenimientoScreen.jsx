import React, { useState } from 'react';
import {View, Text, TextInput, Button, Alert, ActivityIndicator,
        KeyboardAvoidingView, Platform, ScrollView,} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createMantenimiento } from '../../service/service';

export default function CrearMantenimientoScreen() {
    const nav = useNavigation();
    const route = useRoute();

    // Opcionales: callback para refrescar y vehicleId si venís desde un auto
    const onSaved = route.params?.onSaved;
    const preVehicleId = route.params?.vehicleId ?? null;

    const [nombre, setNombre] = useState('');
    const [fechaARealizar, setFechaARealizar] = useState(''); // "YYYY-MM-DD"
    const [kmARealizar, setKmARealizar] = useState('');
    const [loading, setLoading] = useState(false);

    const validar = () => {
        if (!nombre.trim()) {
            Alert.alert('Validación', 'Completá el nombre del mantenimiento.');
            return false;
        }
        // Validación simple de fecha (opcional)
        if (fechaARealizar && !/^\d{4}-\d{2}-\d{2}$/.test(fechaARealizar)) {
            Alert.alert('Validación', 'La fecha debe ser YYYY-MM-DD (ej: 2025-10-10).');
            return false;
        }
        if (kmARealizar && isNaN(Number(kmARealizar))) {
            Alert.alert('Validación', 'Km a realizar debe ser un número.');
            return false;
        }
        if (!fechaARealizar && !kmARealizar) {
            Alert.alert('Validación', 'Debés ingresar una fecha o un kilometraje.');
            return false;
        }
        return true;
    };

    const onSave = async () => {
        if (!validar()) return;
        try {
            setLoading(true);

            const payload = {
                nombre: nombre.trim(),
                fechaARealizar: fechaARealizar || null,
                kmARealizar: kmARealizar ? Number(kmARealizar) : 0,
                finalizado: false,
                vehicleId: preVehicleId, // si tu backend todavía no lo usa, podés quitarlo
            };

            await createMantenimiento(payload);

            // refrescá la lista de la pantalla anterior si pasaron callback
            onSaved?.();

            Alert.alert('Listo', 'Mantenimiento creado correctamente.');
            nav.goBack();
        } catch (e) {
            console.error(e);
            Alert.alert('Error', 'No se pudo crear el mantenimiento. Verificá la conexión y la URL del backend.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.select({ ios: 'padding', android: undefined })}
        >
            <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
                <Text style={{ fontWeight: '600' }}>Nombre</Text>
                <TextInput
                    value={nombre}
                    onChangeText={(text) => setNombre(text.toUpperCase())}
                    placeholder="CAMBIO DE ACEITE"
                    autoCapitalize="characters"
                    style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
                />

                <Text style={{ fontWeight: '600', marginTop: 8 }}>Fecha a realizar (YYYY-MM-DD)</Text>
                <TextInput
                    value={fechaARealizar}
                    onChangeText={setFechaARealizar}
                    placeholder="2025-10-10"
                    keyboardType="numbers-and-punctuation"
                    style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
                />

                <Text style={{ fontWeight: '600', marginTop: 8 }}>Km a realizar </Text>
                <TextInput
                    value={kmARealizar}
                    onChangeText={setKmARealizar}
                    keyboardType="numeric"
                    placeholder="125000"
                    style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
                />

                {loading ? (
                    <View style={{ marginTop: 12 }}>
                        <ActivityIndicator />
                    </View>
                ) : (
                    <View style={{ marginTop: 12 }}>
                        <Button title="Guardar" onPress={onSave} />
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
