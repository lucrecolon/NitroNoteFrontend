import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabs from './MainTabs';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: { width: 280 },
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Inicio" component={MainTabs} />
        </Drawer.Navigator>
    );
}
