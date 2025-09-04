import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CrearMantenimientoScreen from '../screens/Mantenimientos/CrearMantenimientoScreen';
import EditarMantenimientoScreen from '../screens/Mantenimientos/EditarMantenimientoScreen';
import MantenimientosScreen from "../screens/Mantenimientos/MantenimientosScreen";

const Stack = createNativeStackNavigator();
export default function MantenimientosStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MantenimientosList" component={MantenimientosScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CrearMantenimiento" component={CrearMantenimientoScreen} options={{ title: 'Nuevo mantenimiento' }}/>
            <Stack.Screen name="EditarMantenimiento" component={EditarMantenimientoScreen} options={{ title: 'Editar mantenimiento' }}/>
        </Stack.Navigator>
    );
}
