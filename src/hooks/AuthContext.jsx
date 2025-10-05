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

    // Guardar y setear usuario - CORREGIDO
    const saveUser = async (newUser) => {
        try {
            // Si newUser es null, limpiar el estado y storage
            if (newUser === null) {
                setUser(null);
                await AsyncStorage.removeItem("user");
                return;
            }

            // Si newUser es un objeto válido, normalizar y guardar
            const normalizedUser = {
                ...newUser,
                nombre: newUser.nombre ?? newUser.name ?? '', // Manejar casos undefined/null
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
