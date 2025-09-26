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

    const handleRegister = async ()=>{
      const emailRegex = /^[A-Za-z0-9._%+-]+@(gmail\.com|hotmail\.com)$/
      console.log(email)
      console.log(isBlank(name))
      console.log(password)
      if(isBlank(name) || isBlank(email) || isBlank(password)){
        Toast.show({type:"error", text1:"Los campos no pueden estar vacios", position:'top'})
        return;
      }
      if(!emailRegex.test(email)){
        Toast.show({type:"error", text1:"Formato email incorrecto", position:'top'})
        return;
      }
      if(isBlank(name)){
        Toast.show({type:"error", text1:"El nombre no puede ser vacio", position:'top'})
        return;
      }
      if(password.length < 8){
        Toast.show({type:"error", text1:"La contraseña debe tener minimo 8 caracteres", position:'top'})
        return;
      }

      if(password != confirmPassword){
        Toast.show({type:"error", text1:"Las constraseñas no coinciden", position:'top'})
        return;
      }
      try{
        Api.register(name, email, password);
        Toast.show({type:"success", text1:'Usuario registrado con exito',  position: 'top' })
        navigation.replace('MainTabs')
      }
      catch(e){
        Toast.show({ type: 'error', text1: 'No se pudo registar con exito', position: 'top' })
      }
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
