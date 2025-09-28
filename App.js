import {useEffect, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext, AuthProvider } from './src/hooks/AuthContext';
import StackNavigator from './src/navigation/StackNavigator';
import Toast from 'react-native-toast-message';
import Api from './src/service/service';

export default function App() {

//  const { setUser } = useContext(AuthContext);
// 
//  useEffect(() => {
//    const checkToken = async () => {
//        try {
//        const token = await AsyncStorage.getItem('token');
//        if (!!token) {
//          const userData = await Api.getUser();
//          console.log(userData);
//          setUser(userData ); 
//        } 
//        } catch (error) {
//          console.log(error)
//        }
//    };
//
//  checkToken();
//}, []);

  return (
      <NavigationContainer>
        <StackNavigator />
        <Toast/>
      </NavigationContainer>
  );
}
