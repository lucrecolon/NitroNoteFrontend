import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RegisterScreen from "./RegisterScreen";
import LoginScreen from "./LoginScreen";

export default function FormLoginScreen({ navigation }) {

  const [activeTab, setActiveTab] = useState("login");

  return (
    <View style={{ backgroundColor: "#e9e9e9ff", padding: 20, height: "100%", flex:1, justifyContent: "center"}}>
      {/* Logo */}
      <View style={{ alignItems:"center", marginBottom: 20}}>
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: "#2563eb",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 30 }}>🚗</Text>
        </View>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>NitroNote</Text>
        <Text style={{ color: "gray" }}>Gestiona el mantenimiento de tus vehículos</Text>
    </View>
    <View style={{backgroundColor:"#fff", height: 500, borderRadius: 10}}>
      <View style={{ flexDirection: "row", margin: 20, borderRadius: 10, overflow: "hidden" }}>
        <TouchableOpacity
          onPress={() => setActiveTab("login")}
          style={{
            flex: 1,
            padding: 12,
            backgroundColor: activeTab === "login" ? "#e9e9e9ff" : "#f1f5f9",
          }}
        >
          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontWeight: "600"
            }}
          >
            Iniciar Sesión
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("register")}
          style={{
            flex: 1,
            padding: 12,
            backgroundColor: activeTab === "register" ? "#e9e9e9ff" : "#f1f5f9",
          }}
        >
          <Text
            style={{
              color:"black",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Registrarse
          </Text>
        </TouchableOpacity>
      </View>
      {activeTab === "register" ? (
        <RegisterScreen navigation={navigation}/>
        
      ) : (
        <LoginScreen navigation={navigation}/>
      )}
      </View>
    </View>
  );
}



