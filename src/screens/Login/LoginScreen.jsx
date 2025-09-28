import { useState, useContext } from "react";
import {Text, TextInput, TouchableOpacity } from "react-native";
import Api from "../../service/service";
import { AuthContext } from "../../hooks/AuthContext";

export default function LoginScreen({ navigation }) {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     const {setUser} = useContext(AuthContext);
      
    const handleLogin = async ()  => {
        try{
            const user = await Api.login(email, password);
            setUser(user);
            navigation.replace("MainTabs");
        }
        catch(e){
           // console.log(e)
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
            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />
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