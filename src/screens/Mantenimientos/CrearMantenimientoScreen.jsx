import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createMantenimiento, getAllvehiculos } from '../../service/service';
import { Picker } from '@react-native-picker/picker';

export default function CrearMantenimientoScreen() {
  const nav = useNavigation();
  const route = useRoute();

  // Si viene desde un auto, se puede setear preseleccionado
  const preVehicleId = route.params?.vehicleId ?? null;

  // Form
  const [nombre, setNombre] = useState('');
  const [fechaARealizar, setFechaARealizar] = useState(''); // "YYYY-MM-DD"
  const [kmARealizar, setKmARealizar] = useState('');
  const [saving, setSaving] = useState(false);

  // Vehículos
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculosLoading, setVehiculosLoading] = useState(true);
  const [vehiculoId, setVehiculoId] = useState(preVehicleId);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setVehiculosLoading(true);
        const list = await getAllvehiculos();
        if (!mounted) return;
        setVehiculos(Array.isArray(list) ? list : []);
        if (!preVehicleId && list?.length) setVehiculoId(list[0].id);
      } catch (e) {
        console.error(e);
        Alert.alert('Error', 'No se pudieron cargar los vehículos.');
      } finally {
        if (mounted) setVehiculosLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [preVehicleId]);

  const validar = () => {
    if (!nombre.trim()) {
      Alert.alert('Validación', 'Completá el nombre del mantenimiento.');
      return false;
    }
    if (!vehiculoId) {
      Alert.alert('Validación', 'Debés seleccionar un vehículo.');
      return false;
    }
    if (fechaARealizar && !/^\d{4}-\d{2}-\d{2}$/.test(fechaARealizar)) {
      Alert.alert(
        'Validación',
        'La fecha debe ser YYYY-MM-DD (ej: 2025-10-10).'
      );
      return false;
    }
    if (kmARealizar && isNaN(Number(kmARealizar))) {
      Alert.alert('Validación', 'Km a realizar debe ser un número.');
      return false;
    }
    if (!fechaARealizar && !kmARealizar) {
      Alert.alert(
        'Validación',
        'Debés ingresar una fecha o un kilometraje.'
      );
      return false;
    }
    if (fechaARealizar) {
      const fechaARealizarAsDate = new Date(fechaARealizar);
      const today = new Date();
      fechaARealizarAsDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      if (fechaARealizarAsDate < today) {
        Alert.alert(
          'Validación',
          'La fecha ingresada debe ser mayor al día actual.'
        );
        return false;
      }
    }

    return true;
  };

  const onSave = async () => {
    if (!validar()) return;
    try {
      setSaving(true);

      const payload = {
        vehiculoId: Number(vehiculoId),
        nombre: nombre.trim(),
        fechaARealizar: fechaARealizar || null,
        kmARealizar: kmARealizar ? Number(kmARealizar) : 0,
      };

      await createMantenimiento(payload);

      Alert.alert('Listo', 'Mantenimiento creado correctamente.');
      nav.goBack(); // 👈 se vuelve, y la lista se refresca sola con useFocusEffect
    } catch (e) {
      console.error(e);
      Alert.alert(
        'Error',
        'No se pudo crear el mantenimiento. Verificá la conexión y la URL del backend.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {/* Nombre */}
        <Text style={{ fontWeight: '600' }}>Nombre</Text>
        <TextInput
          value={nombre}
          onChangeText={(text) => setNombre(text.toUpperCase())}
          placeholder="Nombre"
          placeholderTextColor="#aaa"
          autoCapitalize="characters"
          style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
        />

        {/* Vehículo */}
        <Text style={{ fontWeight: '600', marginTop: 8 }}>Vehículo</Text>
        {vehiculosLoading ? (
          <ActivityIndicator />
        ) : vehiculos.length === 0 ? (
          <>
            <Text style={{ opacity: 0.7, marginBottom: 8 }}>
              No hay vehículos cargados. Creá uno antes de registrar un
              mantenimiento.
            </Text>
            <Button
              title="Crear vehículo"
              onPress={() =>
                nav.navigate('Vehiculos', { screen: 'Crear Vehiculo' })
              }
            />
          </>
        ) : (
          <View style={{ borderWidth: 1, borderRadius: 8, overflow: 'hidden' }}>
            <Picker
              selectedValue={vehiculoId}
              onValueChange={(val) => setVehiculoId(val)}
            >
              {vehiculos.map((v) => (
                <Picker.Item
                  key={v.id}
                  value={v.id}
                  label={`${v.marca ?? ''} ${v.modelo ?? ''} ${
                    v.patente ?? ''
                  }`.trim()}
                />
              ))}
            </Picker>
          </View>
        )}

        {/* Fecha a realizar */}
        <Text style={{ fontWeight: '600', marginTop: 8 }}>
          Fecha de realización
        </Text>
        <TextInput
          value={fechaARealizar}
          onChangeText={setFechaARealizar}
          placeholder="YYYY-MM-DD"
          keyboardType="numbers-and-punctuation"
          placeholderTextColor="#aaa"
          style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
        />

        {/* Km a realizar */}
        <Text style={{ fontWeight: '600', marginTop: 8 }}>Km a realizar</Text>
        <TextInput
          value={kmARealizar}
          onChangeText={setKmARealizar}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#aaa"
          style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
        />

        {/* Guardar */}
        {saving ? (
          <View style={{ marginTop: 12 }}>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={{ marginTop: 12 }}>
            <Button
              title="Guardar"
              onPress={onSave}
              disabled={vehiculosLoading || vehiculos.length === 0}
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
