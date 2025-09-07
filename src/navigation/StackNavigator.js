import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import MainTabs from './MainTabs';
import CrearVehiculoScreen from '../screens/Vehiculos/CrearVehiculoScreen'
import VehiculosScreen from '../screens/Vehiculos/VehiculosScreen';

const Stack = createNativeStackNavigator();
export default function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Crear Vehiculo" component={CrearVehiculoScreen}/>
            <Stack.Screen name="Vehiculo" component={VehiculosScreen}/>
        </Stack.Navigator>
    );
}
