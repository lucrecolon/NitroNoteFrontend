import React from 'react';
import { View, Text, Button } from 'react-native';

export default function DashboardScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dashboard - Próximos mantenimientos</Text>
      <Button title="Ver Vehículos" onPress={() => navigation.navigate('Vehiculos')} />
    </View>
  );
}
