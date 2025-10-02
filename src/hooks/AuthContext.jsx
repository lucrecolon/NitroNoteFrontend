import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../service/service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const res = await Api.getUser();
                    setUser(res.data); // ⚠️ Ajustá según lo que devuelva tu backend
                }
            } catch (e) {
                console.log('No se pudo cargar usuario desde token', e);
            }
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        const u = await Api.login(email, password);
        setUser(u);
    };

    const logout = async () => {
        try {
            await Api.logout();
        } catch (err) {
            console.error("Error al cerrar sesión:", err);
        } finally {
            await AsyncStorage.removeItem("token");
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
