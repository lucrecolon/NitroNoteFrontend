import React, { useState } from 'react';
import Api from '../../service/service';
import { View, Text, TextInput, ActivityIndicator, ScrollView, Button } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';


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
  }
  
  const fetchCreateVehiculo = async () => {
    const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const patenteRegex = /^([A-Za-z]{2}\d{3}[A-Za-z]{2}|[A-Za-z]{3}\d{3})$/;
    
      try{
        setLoading(true);
        if (!marca.trim()) {
          Toast.show({
            type: 'error',
            text1: 'La marca no puede estar vacia',
            position: 'top',
            autoHide: true,
            visibilityTime: 3000
          });
          return;
        }

        if (!modelo.trim()) {
          Toast.show({
            type: 'error',
            text1: 'El modelo no puede estar vacio',
            position: 'top',
            autoHide: true,
            visibilityTime: 3000
          });
          return;
        }
        if (!soloLetrasRegex.test(modelo) || !soloLetrasRegex.test(marca)) {
          Toast.show({
            type: 'error',
            text1: 'Marca o Modelo no pueden tener numeros',
            position: 'top',
            autoHide: true,
            visibilityTime: 3000
          });
          return;
        }

        if (!patenteRegex.test(patente)) {
          Toast.show({
            type: 'error',
            text1: 'Formato de la patente invalido',
            position: 'top',
            autoHide: true,
            visibilityTime: 3000
          });
          return;
        }
        if (isNaN(anio) || anio < 1900 || anio > 2025) {
          Toast.show({
            type: 'error',
            text1: 'Año ingresado invalido',
            position: 'top',
            autoHide: true,
            visibilityTime: 3000
          });
          return;
        }

        if (isNaN(kilometros) || kilometros <= 0 || Number.isInteger(anio)) {
          Toast.show({
            type: 'error',
            text1: 'Los kilometros tienen que ser mayor o igual a 0',
            position: 'top',
            autoHide: true,
            visibilityTime: 3000
          });
          return ;
        }
          await Api.createVehiculo(marca, modelo, patente, kilometros, anio).then(() =>{
            Toast.show({
            type: 'success',
            text1: 'Vehiculo creado con exito',
            position: 'top',
            autoHide: true,
            visibilityTime: 3000
          });
          });
          handleCreateVehiculo();
          
        } catch (e) {Toast.show({
            type: 'error',
            text1: `${e.response.data.message}`,
            position: 'top',
            autoHide: true,
            visibilityTime: 3000
          });;
        } finally {
          setLoading(false);
        }
    };
  return (

    
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
                    <Text style={{ fontWeight: '600' }}>Marca</Text>
                    <TextInput
                        value={marca}
                        onChangeText={setMarca}
                        placeholder="Marca"
                        autoCapitalize="words"
                        inputMode = "text"
                        style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
                    />
    
                    <Text style={{ fontWeight: '600', marginTop: 8 }}>Modelo</Text>
                    <TextInput
                        value={modelo}
                        onChangeText={setModelo}
                        placeholder="Modelo"
                        autoCapitalize="words"
                        inputMode = "text"
                        style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
                    />
    
                    <Text style={{ fontWeight: '600', marginTop: 8 }}>Patente </Text>
                    <TextInput
                        value={patente}
                        onChangeText={(text) => setPatente(text.toUpperCase())}
                        placeholder="AA000AA o ABC123"
                        style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
                    />

                    <Text style={{ fontWeight: '600', marginTop: 8 }}>Año </Text>
                    <TextInput
                        value={anio}
                        onChangeText={setAnio}
                        inputMode= "numeric"
                        keyboardType="numeric"
                        placeholder="Año"
                        style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
                    />

                    <Text style={{ fontWeight: '600', marginTop: 8 }}>Kilometros </Text>
                    <TextInput
                        value={kilometros}
                        onChangeText={setKilometros}
                        inputMode= "numeric"
                        keyboardType="numeric"
                        placeholder="Kilometros"
                        style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
                    />
    
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
