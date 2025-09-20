import React, { useState } from 'react';
import Api from '../../service/service';
import { View, Text, TextInput, ActivityIndicator, ScrollView, Button } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { MARCAS, MODELOS } from '../../constants/brands.js';

export default function DetalleVehiculoScreen() {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [patente, setPatente] = useState("");
  const [kilometros, setKilometros] = useState();
  const [anio, setAnio] = useState();
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleCreateVehiculo = () => {
    navigation.navigate('Vehiculo');
  };

  const fetchCreateVehiculo = async () => {
    const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const patenteRegex = /^([A-Za-z]{2}\d{3}[A-Za-z]{2}|[A-Za-z]{3}\d{3})$/;

    try {
      setLoading(true);

      if (!marca.trim()) {
        Toast.show({
          type: 'error',
          text1: 'Debe seleccionar una marca',
          position: 'top',
          autoHide: true,
          visibilityTime: 3000,
        });
        return;
      }

      if (!modelo.trim()) {
        Toast.show({
          type: 'error',
          text1: 'Debe seleccionar un modelo',
          position: 'top',
          autoHide: true,
          visibilityTime: 3000,
        });
        return;
      }

      if (!patenteRegex.test(patente)) {
        Toast.show({
          type: 'error',
          text1: 'Formato de la patente invalido',
          position: 'top',
          autoHide: true,
          visibilityTime: 3000,
        });
        return;
      }

      if (isNaN(anio) || anio < 1900 || anio > 2025) {
        Toast.show({
          type: 'error',
          text1: 'Año ingresado invalido',
          position: 'top',
          autoHide: true,
          visibilityTime: 3000,
        });
        return;
      }

      if (isNaN(kilometros) || kilometros < 0) {
        Toast.show({
          type: 'error',
          text1: 'Los kilometros tienen que ser mayor o igual a 0',
          position: 'top',
          autoHide: true,
          visibilityTime: 3000,
        });
        return;
      }

      await Api.createVehiculo(marca, modelo, patente, kilometros, anio).then(() => {
        Toast.show({
          type: 'success',
          text1: 'Vehiculo creado con exito',
          position: 'top',
          autoHide: true,
          visibilityTime: 3000,
        });
      });

      handleCreateVehiculo();
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: `${e.response?.data?.message || 'Error al crear el vehículo'}`,
        position: 'top',
        autoHide: true,
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      {/* Marca */}
      <Text style={{ fontWeight: '600' }}>Marca</Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          backgroundColor: '#fff',
          paddingHorizontal: 8,
        }}
      >
        <Picker
          selectedValue={marca}
          onValueChange={(itemValue) => setMarca(itemValue)}
          style={{ height: 50 }}
          mode="dropdown"
        >
          <Picker.Item label="Selecciona una marca..." value="" />
          {MARCAS.map((m) => (
            <Picker.Item key={m} label={m} value={m} />
          ))}
        </Picker>
      </View>

      {/* Modelo */}
      <Text style={{ fontWeight: '600', marginTop: 8 }}>Modelo</Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          backgroundColor: '#fff',
          paddingHorizontal: 8,
        }}
      >
        <Picker
          selectedValue={modelo}
          onValueChange={(itemValue) => setModelo(itemValue)}
          style={{ height: 50 }}
          mode="dropdown"
        >
          <Picker.Item label="Selecciona un modelo..." value="" />
          {MODELOS.map((m) => (
            <Picker.Item key={m} label={m} value={m} />
          ))}
        </Picker>
      </View>

      {/* Patente */}
      <Text style={{ fontWeight: '600', marginTop: 8 }}>Patente</Text>
      <TextInput
        value={patente}
        onChangeText={(text) => setPatente(text.toUpperCase())}
        placeholder="AA000AA o ABC123"
        style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
      />

      {/* Año */}
      <Text style={{ fontWeight: '600', marginTop: 8 }}>Año</Text>
      <TextInput
        value={anio}
        onChangeText={setAnio}
        inputMode="numeric"
        keyboardType="numeric"
        placeholder="Año"
        style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
      />

      {/* Kilómetros */}
      <Text style={{ fontWeight: '600', marginTop: 8 }}>Kilometros</Text>
      <TextInput
        value={kilometros}
        onChangeText={setKilometros}
        inputMode="numeric"
        keyboardType="numeric"
        placeholder="Kilometros"
        style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
      />

      {/* Botón guardar */}
      {loading ? (
        <View style={{ marginTop: 12 }}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={{ marginTop: 12 }}>
          <Button title="Guardar" onPress={fetchCreateVehiculo} />
        </View>
      )}
    </ScrollView>
  );
}
