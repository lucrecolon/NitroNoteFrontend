import React from 'react';
//import Api from '../service.js';

import { View, Text, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
  
  /*const products = ()=>{
    Api.all_vehiculo().then(response => {
      console.log(response);
    })
  }*/
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login / Registro</Text>
      <Button title="Ingresar" onPress={navigation.replace('MainTabs')} />
    </View>
  );
}
