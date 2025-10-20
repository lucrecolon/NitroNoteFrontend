import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createMantenimiento, getUserAllvehiculos } from '../../service/service';
import {useContext} from "react";
import {AuthContext} from "../../hooks/AuthContext";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView, TouchableOpacity,
} from 'react-native';

export default function CrearMantenimientoScreen() {
  const nav = useNavigation();
  const route = useRoute();

  const preVehicleId = route.params?.vehicleId ?? null;

  const mantenimientosDisponibles = [
    { value: 'Cambio de aceite',              label: 'Cambio de aceite' },
    { value: 'Correa de distribucion',        label: 'Correa de distribución' },
    { value: 'Pastillas de freno',            label: 'Pastillas de freno' },
    { value: 'Alineacion y balanceo',         label: 'Alineación y balanceo' },
    { value: 'Revision general',              label: 'Revisión general' },
    { value: 'Cambio de escobillas',          label: 'Cambio de escobillas'},
    { value: 'Engrase de rodamientos',        label: 'Engrase de rodamientos'},
    { value: 'Completar nivel de liquidos',   label: 'Completar nivel de líquidos'},
    { value: 'Revisar presion de neumaticos', label: 'Revisar presión de neumáticos'},
    { value: 'Cambio filtro de aceite',       label: 'Cambio filtro de aceite'},
    { value: 'Cambio filtro de combustible',  label: 'Cambio filtro de combustible'},
    { value: 'Bujias',                        label: 'Bujías'},
    { value: 'Discos de freno',               label: 'Discos de freno'},
    { value: 'Liquido refrigerante',          label: 'Líquido refrigerante'},
    { value: 'Bateria',                       label: 'Batería'},

  ];

  const {user} = useContext(AuthContext);
  const [nombre, setNombre] = useState('');
  const [fechaARealizar, setFechaARealizar] = useState(''); // "YYYY-MM-DD"
  const [kmARealizar, setKmARealizar] = useState('');
  const [saving, setSaving] = useState(false);

  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculosLoading, setVehiculosLoading] = useState(true);
  const [vehiculoId, setVehiculoId] = useState(preVehicleId);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setVehiculosLoading(true);
        const list = await getUserAllvehiculos(user.id);
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

  const isDisabled =
      saving ||
      vehiculosLoading ||
      vehiculos.length === 0 ||
      !vehiculoId ||
      !nombre ||
      (!fechaARealizar && !kmARealizar);


  const validar = () => {
    if (!nombre) {
      Alert.alert('Validación', 'Seleccioná el nombre del mantenimiento.');
      return false;
    }
    if (!vehiculoId) {
      Alert.alert('Validación', 'Debés seleccionar un vehículo.');
      return false;
    }
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
    if (fechaARealizar) {
      const fechaARealizarAsDate = new Date(fechaARealizar);
      const today = new Date();
      fechaARealizarAsDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      if (fechaARealizarAsDate < today) {
        Alert.alert('Validación', 'La fecha ingresada debe ser mayor al día actual.');
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
        nombre,
        fechaARealizar: fechaARealizar || null,
        kmARealizar: kmARealizar ? Number(kmARealizar) : 0,
      };

      await createMantenimiento(payload);

      Alert.alert('Listo', 'Mantenimiento creado correctamente.');
      nav.goBack();
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'No se pudo crear el mantenimiento.');
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
          {}
          <Text style={{ fontWeight: '600' }}>Nombre del mantenimiento</Text>
          <View style={{ borderWidth: 1, borderRadius: 8, overflow: 'hidden' }}>
            <Picker
                selectedValue={nombre}
                onValueChange={(val) => setNombre(val)}
                style={{color: '#000'}}
            >
              <Picker.Item label="Selecciona un mantenimiento..." value="" />
              {mantenimientosDisponibles.map((m) => (
                  <Picker.Item key={m.value} label={m.label} value={m.value} />
              ))}
            </Picker>
          </View>

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
                    style={{color: '#000'}}
                >
                  {vehiculos.map((v) => (
                      <Picker.Item
                          key={v.id}
                          value={v.id}
                          label={`${v.marca ?? ''} ${v.modelo ?? ''} ${v.patente ?? ''}`.trim()}
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
              <TouchableOpacity
                  onPress={onSave}
                  disabled={isDisabled}
                  style={{
                    marginTop: 12,
                    backgroundColor: isDisabled ? '#9CA3AF' : '#007BFF',
                    paddingVertical: 10,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 , textAlign: "center" }}>
                  Guardar
                </Text>
              </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
  );
}