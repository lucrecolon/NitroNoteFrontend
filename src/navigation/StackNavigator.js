import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FormLoginScreen from '../screens/Login/FormLoginScreen';
import MainTabs from './MainTabs';
import { AuthProvider } from '../hooks/AuthContext';
import DrawerNavigator from './DrawerNavigator';
import ConfiguracionStack from "./ConfiguracionStack";

const Stack = createNativeStackNavigator();
export default function StackNavigator() {
    return (
        
    <AuthProvider>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={FormLoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Configuracion" component={ConfiguracionStack} options={{ headerShown: false }} />
        </Stack.Navigator>
    </AuthProvider>    
    );
}
