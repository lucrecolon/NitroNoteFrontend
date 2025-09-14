import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Api from '../../service/service';

export default function EditarVehiculoScreen() {
  const nav = useNavigation();
  const route = useRoute();

  const vehiculo = route.params?.vehiculo

  const [kilometros, setKilometros] = useState(String(vehiculo.kilometros));
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const kmNuevo = Number(kilometros);

    if (isNaN(kmNuevo)) {
       Alert.alert('Error', 'El valor de kilometros no puede estar vacío.', [
         { text: 'OK', onPress: () => nav.navigate('Vehiculo') },
       ]);
       return;
     }

     if (kmNuevo < vehiculo.kilometros) {
       Alert.alert(
         'Error',
         'El kilometraje no puede ser menor al actual.',
         [
           { text: 'OK' }, // No mover al usuario de la pantalla actual, solo informar y que pueda continuar la operación -dpolverigiani
         ],
         { cancelable: false }
       );
       return;
     }

    try {
      setSaving(true);

      const actualizado = { ...vehiculo, kilometros: kmNuevo };
      await Api.updateVehiculo(actualizado);

      Alert.alert('Éxito', 'Los cambios se guardaron con éxito.', [
        { text: 'OK', onPress: () => nav.navigate('Vehiculo') },
      ]);
    } catch (e) {
      console.error(e);
       Alert.alert('Error', 'No se pudo actualizar el vehículo.', [
            { text: 'OK', onPress: () => nav.navigate('Vehiculo') },
          ]);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCar = async () => {
        try {
            await Api.deleteVehicleByPatent(vehiculo.patente);
            nav.navigate('Vehiculo');
        } catch (e) {
              console.error(e);
               Alert.alert('Error', 'No se pudo eliminar el vehículo.', [
                    { text: 'OK', onPress: () => nav.navigate('Vehiculo') },
                  ]);
            }
  };

  return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Marca */}
        <Text style={styles.label}>Marca</Text>
        <TextInput
          value={vehiculo.marca}
          editable={false}
          style={[styles.input, styles.disabled]}
        />

        {/* Modelo */}
        <Text style={styles.label}>Modelo</Text>
        <TextInput
          value={vehiculo.modelo}
          editable={false}
          style={[styles.input, styles.disabled]}
        />

        {/* Patente */}
        <Text style={styles.label}>Patente</Text>
        <TextInput
          value={vehiculo.patente}
          editable={false}
          style={[styles.input, styles.disabled]}
        />

        {/* Kilómetros */}
        <Text style={styles.label}>Kilómetros</Text>
        <TextInput
          value={kilometros}
          onChangeText={setKilometros}
          keyboardType="numeric"
          style={styles.input}
        />

        {/* Año */}
        <Text style={styles.label}>Año</Text>
        <TextInput
          value={vehiculo.anio.toString()}
          editable={false}
          keyboardType="numeric"
          style={[styles.input, styles.disabled]}
        />

        {/* Botones */}
        <View style={styles.buttonRow}>
          <Button title="Eliminar" onPress={handleDeleteCar} color="#FF684A"/>
          <Button
            title={saving ? 'Guardando...' : 'Guardar cambios'}
            onPress={handleSave}
            disabled={saving}
          />
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  label: {
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  disabled: {
    backgroundColor: '#f3f3f3',
    color: '#555',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});
