import React from 'react';
import { View, Text, Button } from 'react-native';

export default function VehiculosScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Mis Vehículos</Text>
      <Button title="Detalle vehículo" onPress={() => navigation.navigate('DetalleVehiculo')} />
    </View>
  );
}
