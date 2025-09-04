// screens/EditarMantenimientoScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditarMantenimientoScreen() {
    const nav = useNavigation();
    const { params } = useRoute();
    const { maintenanceId } = params ?? {};

    const guardar = () => {
        // PUT/PATCH a tu API con maintenanceId
        nav.goBack();
    };

    return (
        <View style={{ padding:16 }}>
            <Text style={{ fontWeight:'700', marginBottom:10 }}>Editar mantenimiento #{maintenanceId}</Text>
            {/* Inputs que necesites */}
            <Button title="Guardar cambios" onPress={guardar} />
        </View>
    );
}
