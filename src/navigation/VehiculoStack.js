import {createNativeStackNavigator} from "@react-navigation/native-stack";
import VehiculosScreen from "../screens/Vehiculos/VehiculosScreen";
import CrearVehiculoScreen from "../screens/Vehiculos/CrearVehiculoScreen";

const Stack = createNativeStackNavigator();
export default function VehiculoStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Vehiculo" component={VehiculosScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Crear Vehiculo" component={CrearVehiculoScreen} options={{ title: 'Nuevo vehiculo', headerShown: true }}/>
            {/*<Stack.Screen name="Editar Vehiculo" component={EditarVehiculoScreen} options={{ title: 'Editar vehiculo', headerShown: true }}/>*/}
        </Stack.Navigator>
    );
}