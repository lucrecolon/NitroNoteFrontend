import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {getFocusedRouteNameFromRoute} from "@react-navigation/core";

import VehiculosScreen from '../screens/Vehiculos/VehiculosScreen';
import PerfilScreen from '../screens/Perfil/PerfilScreen';
import MantenimientosStack from "./MantenimientosStack";


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
        <Tab.Screen
            name="Mantenimientos"
            component={MantenimientosStack}
            options={({ route }) => {
                const focused = getFocusedRouteNameFromRoute(route) ?? 'MantenimientosList';
                // Mostrar header del Tab SOLO en la lista. Ocultarlo en Crear/Editar.
                const showHeaderOnTab = focused === 'MantenimientosList';
                return { headerShown: showHeaderOnTab, title: 'Mantenimientos' };
            }}
        />
    </Tab.Navigator>
  );
}
