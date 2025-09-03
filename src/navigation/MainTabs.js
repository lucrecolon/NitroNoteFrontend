import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from '../screens/DashboardScreen';
import VehiculosScreen from '../screens/VehiculosScreen';
import MantenimientosScreen from '../screens/MantenimientosScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Vehiculos') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'Mantenimientos') {
            iconName = focused ? 'construct' : 'construct-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      
      <Tab.Screen name="Vehiculos" component={VehiculosScreen} />
      <Tab.Screen name="Mantenimientos" component={MantenimientosScreen} />
    </Tab.Navigator>
  );
}
