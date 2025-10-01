import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ConfiguracionScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Botón Cuenta */}
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("ConfiguracionCuenta")}
            >
                <Ionicons name="person-outline" size={24} color="#2563EB" />
                <View style={{ marginLeft: 12 }}>
                    <Text style={styles.title}>Configuración de Cuenta</Text>
                    <Text style={styles.subtitle}>Datos personales y cuenta</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" style={{ marginLeft: "auto" }}/>
            </TouchableOpacity>

            {/* Botón Notificaciones */}
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("ConfiguracionNotificaciones")}
            >
                <Ionicons name="notifications-outline" size={24} color="#2563EB" />
                <View style={{ marginLeft: 12 }}>
                    <Text style={styles.title}>Configuración de Notificaciones</Text>
                    <Text style={styles.subtitle}>Alertas y recordatorios</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" style={{ marginLeft: "auto" }}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 1,
    },
    title: { fontSize: 16, fontWeight: "600" },
    subtitle: { fontSize: 13, color: "#666" },
});
