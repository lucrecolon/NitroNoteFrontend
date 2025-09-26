import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {getFocusedRouteNameFromRoute} from "@react-navigation/core";
import PerfilScreen from '../screens/Perfil/PerfilScreen';
import MantenimientosStack from "./MantenimientosStack";
import VehiculoStack from "./VehiculoStack";


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
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
          name="Vehiculos"
          component={VehiculoStack}
          options={({ route }) => {
              const focused = getFocusedRouteNameFromRoute(route) ?? 'Vehiculo';
              // Mostrar header del Tab SOLO en la lista. Ocultarlo en Crear/Editar.
              const showHeaderOnTab = focused === 'Vehiculo';
              return { headerShown: showHeaderOnTab, title: 'Vehiculos' };
          }}
      />
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
