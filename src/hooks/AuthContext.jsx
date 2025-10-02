import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    // Cargar usuario al iniciar la app
    useEffect(() => {
        (async () => {
            try {
                const savedUser = await AsyncStorage.getItem("user");
                if (savedUser) {
                    const parsed = JSON.parse(savedUser);
                    setUser(parsed);
                } else {
                    console.log("No había usuario en storage");
                }
            } catch (e) {
                console.error("Error cargando usuario desde storage", e);
            }
        })();
    }, []);

    // Guardar y setear usuario
    const saveUser = async (newUser) => {
        try {
            const normalizedUser = {
                ...newUser,
                nombre: newUser.nombre ?? newUser.name,
            };

            setUser(normalizedUser);
            await AsyncStorage.setItem("user", JSON.stringify(normalizedUser));
        } catch (e) {
            console.error("Error guardando usuario en storage", e);
        }
    };

    return (
        <AuthContext.Provider value={{user, setUser: saveUser}}>
            {children}
        </AuthContext.Provider>
    );
};