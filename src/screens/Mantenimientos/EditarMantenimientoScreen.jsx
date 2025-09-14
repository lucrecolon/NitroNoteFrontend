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

export default function EditarMantenimientoScreen() {
    const nav = useNavigation();
    const route = useRoute();

    const mantenimiento = route.params?.mantenimiento

    const [potentialNewDate, setNewDate] = useState(mantenimiento.fechaARealizar.toString());
    const [kilometros, setKilometros] = useState(mantenimiento.kmARealizar.toString());
    const [saving, setSaving] = useState(false);

     const handleSave = async () => {
        const kmNuevo = Number(kilometros);
        const newDate = potentialNewDate;
         // Js tiene esta particularidad que el date devuelve horas :S y queremos validar fecha -dpolverigiani
        const today = new Date();
        if (newDate && !/^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
            Alert.alert('Validación', 'La fecha debe estar en formato YYYY-MM-DD');
            return;
        };

        const newDateAsDateFormat = new Date(newDate);
        newDateAsDateFormat.setHours(0,0,0,0);
        today.setHours(0,0,0,0);
        if (newDateAsDateFormat < today) {
            Alert.alert('La fecha no puede ser menor a la fecha actual.');
            return;
        };

        if (isNaN(kmNuevo)) {
           Alert.alert('Error', 'El valor de kilometros no puede estar vacío.');
           return;
         };

        if (kmNuevo < mantenimiento.kmARealizar) {
            Alert.alert(
              'Error',
              'Los kilometros no pueden ser menores a los del mantenimiento.'
            );
            return;
        };

        try {
          setSaving(true);
          const actualizado = { ...mantenimiento, kmARealizar: kmNuevo,
              fechaARealizar: newDate};
          await Api.updateMantenimiento(actualizado.id, actualizado);

          Alert.alert('Éxito', 'Los cambios se guardaron con éxito.', [
            { text: 'OK', onPress: () => nav.navigate('MantenimientosList') },
          ]);
        } catch (e) {
          console.error(e);
           Alert.alert('Error', 'No se pudo actualizar el mantenimiento.', [
                { text: 'OK', onPress: () => nav.navigate('MantenimientosList') },
              ]);
        } finally {
          setSaving(false);
        }
      };

    const handleCancel = () => {
        nav.goBack();
      };

  return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Nombre del mantenimiento */}
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          value={mantenimiento.nombre}
          editable={false}
          style={[styles.input, styles.disabled]}
        />

        {/* Fecha a realizar  */}
        <Text style={styles.label}>Fecha a realizar</Text>
        <TextInput
          value={potentialNewDate}
          onChangeText={setNewDate}
          style={styles.input}
        />

        {/* Kilometros para finalización */}
        <Text style={styles.label}>Kilometros para finalización</Text>
        <TextInput
          value={kilometros}
          onChangeText={setKilometros}
          keyboardType="numeric"
          style={styles.input}
        />

        {/* Botones */}
        <View style={styles.buttonRow}>
          <Button title="Cancelar" onPress={handleCancel} color="#888" />
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

