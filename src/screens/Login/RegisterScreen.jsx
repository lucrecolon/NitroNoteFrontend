import { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import Api from "../../service/service";

export default function LoginScreen({ navigation }) {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isBlank = (value) => {
      return !value || value.trim().length === 0;
    };

    const handleRegister = async () => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@(gmail\.com|hotmail\.com)$/;
        if (isBlank(name) || isBlank(email) || isBlank(password)) {
            Toast.show({ type: "error", text1: "Los campos no pueden estar vacíos", position: "top" });
            return;
        }
        if (!emailRegex.test(email)) {
            Toast.show({ type: "error", text1: "Formato email incorrecto", position: "top" });
            return;
        }
        if (password.length < 8) {
            Toast.show({ type: "error", text1: "La contraseña debe tener mínimo 8 caracteres", position: "top" });
            return;
        }
        if (password !== confirmPassword) {
            Toast.show({ type: "error", text1: "Las contraseñas no coinciden", position: "top" });
            return;
        }
        try {
            await Api.register(name, email, password);
            Toast.show({ type: "success", text1: "Usuario registrado con éxito", position: "top" });
            navigation.replace("Login");
        } catch (err) {
            if (err.response?.status === 409) {
                Toast.show({ type: "error", text1: "Dirección de correo electrónico ya registrada", position: "top" });
            } else {
                Toast.show({ type: "error", text1: "No se pudo registrar. Intente más tarde", position: "top" });
            }
        }
    };


    return(
        <>
                  <TextInput
                    placeholder="Nombre completo"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    keyboardType="default"
                    autoCapitalize="words"
                  />
                  <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                  />
                  <TextInput
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={styles.input}
                  />
                  <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={{ color: "white", fontWeight: "600", textAlign: "center" }}>
                      Crear Cuenta
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
    margin:10,
    left: 10,
    width:335,
    backgroundColor: "#f9fafb",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    width:335,
    left: 20,
    borderRadius: 10,
    marginTop: 10,
  },
};
