import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FormLoginScreen from '../screens/Login/FormLoginScreen';
import MainTabs from './MainTabs';

const Stack = createNativeStackNavigator();
export default function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={FormLoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
