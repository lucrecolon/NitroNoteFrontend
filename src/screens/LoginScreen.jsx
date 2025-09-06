import React from 'react';

import { View, Text, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
  
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login / Registro</Text>
      <Button title="Ingresar" onPress={navigation.replace('MainTabs')} />
    </View>
  );
}
