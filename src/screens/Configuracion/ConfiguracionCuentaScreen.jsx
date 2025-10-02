import { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import Api from "../../service/service";
import { AuthContext } from "../../hooks/AuthContext";

export default function ConfiguracionCuentaScreen({navigation}) {
    const { user, setUser } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [originalName, setOriginalName] = useState("");
    const [originalEmail, setOriginalEmail] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.nombre || "");
            setEmail(user.email || "");
            setOriginalName(user.nombre || "");
            setOriginalEmail(user.email || "");
            setPassword("");
        }
    }, [user]);

    const handleUpdate = async () => {
        if (!name.trim() || !email.trim()) {
            Toast.show({ type: "error", text1: "Nombre y email no pueden estar vacíos" });
            return;
        }

        try {
            const updated = await Api.updateUser({
                id: user.id,
                nombre: name,
                email,
                password,
            });
            setUser(updated);
            Toast.show({ type: "success", text1: "Datos actualizados con éxito" });

            navigation.reset({
                index: 0,
                routes: [{ name: "ConfiguracionMain" }],
            });
        } catch (err) {
            console.error(err);
            Toast.show({ type: "error", text1: "No se pudo actualizar el usuario" });
        }
    };

    const hasChanges =
        name !== originalName || email !== originalEmail || (password && password.trim().length > 0);


    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text>Nombre completo</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <Text>Nueva Contraseña</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    key={showPassword ? "text" : "password"}
                    style={[styles.input, { flex: 1, marginBottom: 0 }]}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                    <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="#666" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[styles.button, { opacity: hasChanges ? 1 : 0.5 }]}
                onPress={handleUpdate}
                disabled={!hasChanges}
            >
                <Text style={{ color: "white", fontWeight: "600", textAlign: "center" }}>
                    Guardar cambios
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = {
    input: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 10,
        marginBottom: 15,
        padding: 10,
        backgroundColor: "#f9fafb",
    },
    button: {
        backgroundColor: "#2563eb",
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: "#f9fafb",
    },
    eyeButton: {
        paddingHorizontal: 10,
    },
};
