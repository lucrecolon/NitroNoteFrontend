import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabs from './MainTabs';
import ConfiguracionScreen from '../screens/ConfiguracionScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false, // 👈 ocultamos el header del Drawer
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Inicio" component={MainTabs} />
            <Drawer.Screen name="Configuración" component={ConfiguracionScreen} />
        </Drawer.Navigator>
    );
}
