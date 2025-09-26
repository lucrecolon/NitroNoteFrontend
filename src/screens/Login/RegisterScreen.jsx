import { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";

export default function LoginScreen({ navigation }) {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const handleRegister = ()=>{
        navigation.replace('MainTabs')
    }

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
