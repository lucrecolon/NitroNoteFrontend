import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import {getUser, updateNotificationEmailPreferences} from "../../service/service";
import {registerForPushNotificationsAsync} from "../../utils/notifications";

const PRIMARY = "#1E63FF";

export default function ConfiguracionNotificacionesScreen({ navigation }) {
    const [enabledEmail, setEnabledEmail] = useState(false);
    const [enabledPush, setEnabledPush] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser();
                const user = response.data;
                if (user && typeof user.emailNotificationsEnabled === "boolean") {
                    setEnabledEmail(user.emailNotificationsEnabled);
                }
                if (user && typeof user.pushNotificationsEnabled === "boolean") {
                    setEnabledPush(user.pushNotificationsEnabled);
                }
            } catch (e) {
                console.error("Error al guardar:", e);
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "No se pudo cargar la configuración."
                });
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    const onSave = async () => {
        if (saving) return;
        try {
            setSaving(true);

            let pushToken = null;

            // Si activa push notifications, obtener token
            if (enabledPush) {
                pushToken = await registerForPushNotificationsAsync();
                if (!pushToken) {
                    Toast.show({
                        type: "error",
                        text1: "Error",
                        text2: "No se pudo obtener permiso para notificaciones"
                    });
                    return;
                }
            }
            console.log(enabledPush, pushToken);
            await updateNotificationEmailPreferences({
                emailEnabled: enabledEmail,
                pushEnabled: enabledPush,
                pushToken: pushToken
            });

            Toast.show({
                type: "success",
                text1: "Preferencias actualizadas"
            });
            navigation.goBack();
        } catch (e) {
            const msg = e?.data || "No se pudo guardar. Intenta nuevamente.";
            Toast.show({
                type: "error",
                text1: "Error",
                text2: String(msg)
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.screen, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color={PRIMARY} />
                <Text style={{ marginTop: 12 }}>Cargando configuración...</Text>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.subtitle}>
                Elige cómo quieres recibir los recordatorios de mantenimiento de tu vehículo:
            </Text>

            {/* Email */}
            <View style={styles.card}>
                <Pressable
                    accessible
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: enabledEmail }}
                    accessibilityLabel="Por correo electrónico"
                    onPress={() => setEnabledEmail(v => !v)}
                    style={styles.row}
                >
                    <View style={[styles.checkbox, enabledEmail && styles.checkboxChecked]}>
                        {enabledEmail && <Ionicons name="checkmark" size={18} color="#fff" />}
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.cardTitle}>Por correo electrónico</Text>
                        <Text style={styles.cardDesc}>
                            Recibe recordatorios de mantenimiento directamente en tu bandeja de entrada.
                        </Text>
                    </View>
                </Pressable>
            </View>

            {/* Push */}
            <View style={styles.card}>
                <Pressable
                    accessible
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: enabledPush }}
                    accessibilityLabel="Por notificación push"
                    onPress={() => setEnabledPush(v => !v)}
                    style={styles.row}
                >
                    <View style={[styles.checkbox, enabledPush && styles.checkboxChecked]}>
                        {enabledPush && <Ionicons name="checkmark" size={18} color="#fff" />}
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.cardTitle}>Por notificación push</Text>
                        <Text style={styles.cardDesc}>
                            Recibe recordatorios mediante una alerta en tu celular, incluso si la app está cerrada.
                        </Text>
                    </View>
                </Pressable>
            </View>

            {/* Botón Guardar */}
            <Pressable
                onPress={onSave}
                disabled={saving}
                style={({ pressed }) => [
                    styles.button,
                    pressed && { opacity: 0.9 },
                    saving && { opacity: 0.6 }
                ]}
            >
                {saving ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <>
                        <Ionicons name="checkmark" size={18} color="#fff" style={{ marginRight: 8 }} />
                        <Text style={styles.buttonText}>Guardar cambios</Text>
                    </>
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#FAFAFC",
        paddingHorizontal: 46,
        paddingTop: 16
    },
    subtitle: {
        fontSize: 16,
        color: "#50545C",
        marginBottom: 16
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E6E7EB",
        marginBottom: 24,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2
    },
    row: {
        flexDirection: "row",
        alignItems: "flex-start"
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: "#C8CBD2",
        backgroundColor: "#fff",
        marginRight: 12,
        justifyContent: "center",
        alignItems: "center"
    },
    checkboxChecked: {
        backgroundColor: PRIMARY,
        borderColor: PRIMARY
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 4
    },
    cardDesc: {
        fontSize: 15,
        color: "#606776",
        lineHeight: 18
    },
    button: {
        height: 48,
        backgroundColor: PRIMARY,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700"
    }
});

