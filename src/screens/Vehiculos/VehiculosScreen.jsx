import React, { useState, useCallback } from 'react';
import Api from '../../service/service';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
  StyleSheet,
  Image
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // 👈 importar iconos

export default function VehiculosScreen() {
  const [vehiculos, setVehiculos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  // 👉 Acción al finalizar mantenimiento
  const deleteVehicleByPatent = async (patente) => {
    try {
      await Api.deleteVehicleByPatent(patente); // DELETE al backend
      await onRefresh(); // refresca listas
      Alert.alert('Vehículo eliminado con éxito.');
    } catch (err) {
      console.error('Error al eliminar el vehículo', err);
      Alert.alert('Error', 'No se pudo eliminar el vehículo.');
    }
  };

const handleEditVehiculo = (vehiculo) => {
  navigation.navigate("Editar Vehiculo", {vehiculo});
};

  const fetchVehiculos = async () => {
    try {
      setRefreshing(true);
      const allvehiculos = await Api.getAllvehiculos();
      setVehiculos(allvehiculos);
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchVehiculos(); }, []));

  const handleCreateVehiculo = () => {
    navigation.navigate('Crear Vehiculo');
  };


  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={vehiculos}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchVehiculos} />
        }
        ListEmptyComponent={
          <Text style={{ textAlign: 'center' }}>
            No hay vehiculos registrados
          </Text>
        }
        renderItem={({ item }) => {

          return (
            <View style={styles.container}>
              <View style={styles.containerImage}>
                <Image
                  source={require('../../../assets/auto.png')}
                  style={styles.image}
                />
              </View>

              <View style={styles.containerDescription}>
                <Text style={styles.description}>
                  {item.marca + ' ' + item.modelo}
                </Text>
                <Text style={{ fontSize: 15, color: '#555' }}>
                  {item.kilometros + ' km - ' + item.patente}
                </Text>
              </View>

              {/* 👉 Botón de editar */}
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditVehiculo(item)}
              >
                <Ionicons name="pencil" size={24} color="#2563EB" />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      {vehiculos && (
        <TouchableOpacity style={styles.button} onPress={handleCreateVehiculo}>
          <Text style={{ color: '#fff', fontSize: 28, lineHeight: 28 }}>＋</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerImage: {
    flex: 1,
    backgroundColor: '#E0F0FF',
    maxHeight: 71,
    borderRadius: 12,
    maxWidth: 71,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  containerDescription: {
    flex: 1,
    left: 8,
    padding: 5,
  },
  description: {
    color: '#111827',
    fontSize: 25,
  },
  editButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
