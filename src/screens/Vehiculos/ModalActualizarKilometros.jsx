import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import Api from "../../service/service";

export default function ModalActualizarKilometros({patente,visible,idMantenimiento,onClose,refresh}) {

    const [kilometros, setKilometros] = useState("");
    const [vehiculo, setVehiculo] = useState({});
    const fetchVehiculo = async () => {
        try {
            if (!patente) return;
            const data = await Api.getVehiculoByPatente(patente);
            setVehiculo(data);
        } catch (e) {
            console.error('fetchVehiculo error', e);
        }
    };

    const actualizar = async () => {
        try {
            if(!idMantenimiento) return
            await Api.finalizarMantenimiento(idMantenimiento);
            const actualizado = { ...vehiculo, kilometros: kilometros };
            await Api.updateVehiculo(actualizado);
            await refresh();
            Alert.alert('Exito', 'Mantenimiento marcado como finalizado.', [
                            { text: 'OK', onPress: () => onClose() },
    ]);
        } catch (err) {
            Alert.alert('Error', 'No se pudo finalizar el mantenimiento.');
        }
    };

    useEffect(() => {
        fetchVehiculo();
        setKilometros("");
    }, [idMantenimiento, patente]);

    return (
        <Modal 
        visible={visible} 
        onRequestClose={() => onClose}
        transparent={true}
        statusBarTranslucent={true}
        animationType="fade"
        style={styles.modal}
        >
            <View style= {styles.modal}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Kilometraje Actual
                    </Text>
                    <Text style={styles.subtitle}>
                        Ingrese el kilometraje actual del vehiculo para completar la tarea de mantenimiento.
                    </Text>
                    <Text style={{ fontWeight: '600', marginTop: 8 }}>
                        Kilometros
                    </Text>
                    <TextInput
                        value={kilometros}
                        onChangeText={setKilometros}
                        inputMode="numeric"
                        keyboardType="numeric"
                        placeholder="Kilometros"
                        placeholderTextColor = 'dark'
                        style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
                    />
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>Vehiculo: {vehiculo.marca} {vehiculo.modelo} </Text>
                        <Text style={styles.infoText}>Kilometraje Actual: {vehiculo.kilometros} </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                        onPress={actualizar}
                        style={[styles.button, { backgroundColor: "#16A34A" }]}>
                            <Text style={[styles.buttonText, {color: "#fff",}]}>Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={onClose}
                        style={[styles.button, { backgroundColor: "#E5E7EB" }]}>
                            <Text style={[styles.buttonText,{color: "#000"}]}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>    
            </View>     
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    content:{
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        width: "100%",
        maxWidth: 400,
        elevation: 10,
    },
    title:{
        textAlign: "center",
        fontSize: 20,
        color: "#000",
        fontWeight: "700",
        marginBottom: 15,
    },  
    subtitle:{
        textAlign: "center",
        color: "#555",
        fontSize: 14,
    },
    infoBox:{
        padding: 10,
        borderRadius: 8,
    },
    infoText:{
        fontSize: 14,
        color: "#333",
    },
    buttonContainer:{
        padding:5,
        gap:10,
    },
    button: {
        height: 48,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "700"
    }
});