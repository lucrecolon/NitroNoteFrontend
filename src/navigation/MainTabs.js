import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {getFocusedRouteNameFromRoute} from "@react-navigation/core";
import MantenimientosStack from "./MantenimientosStack";
import VehiculoStack from "./VehiculoStack";
import {TouchableOpacity} from "react-native";


const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Vehiculos') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'Mantenimientos') {
            iconName = focused ? 'construct' : 'construct-outline';
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
            options={({ route, navigation }) => {
                const focused = getFocusedRouteNameFromRoute(route) ?? 'Vehiculo';
                const showHeaderOnTab = focused === 'Vehiculo';
                return {
                    headerShown: showHeaderOnTab,
                    title: 'Vehiculos',
                    headerTitleAlign: 'center',
                    // Hamburguesa en el header
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
                            <Ionicons name="menu" size={28} color="black" />
                        </TouchableOpacity>
                    ),
                };
            }}
        />
        <Tab.Screen
            name="Mantenimientos"
            component={MantenimientosStack}
            options={({ route, navigation }) => {
                const focused = getFocusedRouteNameFromRoute(route) ?? 'MantenimientosList';
                const showHeaderOnTab = focused === 'MantenimientosList';
                return {
                    headerShown: showHeaderOnTab,
                    title: 'Mantenimientos',
                    headerTitleAlign: 'center',
                    // Hamburguesa en el header
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
                            <Ionicons name="menu" size={28} color="black" />
                        </TouchableOpacity>
                    ),
                };
            }}
        />
    </Tab.Navigator>
  );
}
