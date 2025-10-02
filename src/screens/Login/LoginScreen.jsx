import { useState, useContext } from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import { AuthContext } from "../../hooks/AuthContext";
import Toast from "react-native-toast-message";
import Api from "../../service/service";
import {Ionicons} from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setUser} = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    
    const handleLogin = async ()  => {
        try{
            const user = await Api.login(email, password);
            const userData = {
                id: user.id,
                name: user.nombre || user.name || "Usuario",
                email: user.email,
            };
            setUser(userData);
            Toast.show({type:"success", text1:'Inicio de session con exito',  position: 'top' })
            navigation.replace("Home");
        }
        catch(e){
           Toast.show({type:"error", text1:'Usuario o contraseña invalidos',  position: 'top' })
        }
    };
    return(
        <>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
            />

            <View style={styles.inputPassword}>
                <TextInput
                    placeholder="Contraseña"
                    style={styles.inputText}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                    <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="#666" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={{ color: "white", fontWeight: "600", textAlign: "center" }}>
                    Iniciar Sesión
                </Text>
            </TouchableOpacity>
        </>
    )   
}

const styles = {
    input: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 10,
        margin: 10,
        left: 10,
        width: 335,
        backgroundColor: "#f9fafb",
        padding: 10,
    },
    inputPassword: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 10,
        margin: 10,
        left: 10,
        width: 335,
        backgroundColor: "#f9fafb",
        paddingRight: 10, // espacio para el ojito
    },
    inputText: {
        flex: 1,
        padding: 10,
    },
    button: {
        backgroundColor: "#2563eb",
        padding: 15,
        width: 335,
        left: 20,
        borderRadius: 10,
        marginTop: 10,
    },
    eyeButton: {
        paddingLeft: 8,
    },
};
