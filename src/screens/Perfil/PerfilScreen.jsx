import React, { useEffect, useState } from 'react';
import { View, Text, Image, Switch, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const PREFS_KEY = 'profile_prefs_v1';

export default function PerfilScreen({ navigation }) {
  const [name, setName] = useState('Leandro Peppe');
  const [email, setEmail] = useState('leandro@example.com');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadPrefs = async () => {
      try {
        const saved = await AsyncStorage.getItem(PREFS_KEY);
        if (saved) {
          const { notifications: n, darkMode: d } = JSON.parse(saved);
          if (typeof n === 'boolean') setNotifications(n);
          if (typeof d === 'boolean') setDarkMode(d);
        }
      } catch (e) { /* noop */ }
    };
    loadPrefs();
  }, []);

  useEffect(() => {
    const savePrefs = async () => {
      try {
        await AsyncStorage.setItem(PREFS_KEY, JSON.stringify({ notifications, darkMode }));
      } catch (e) { /* noop */ }
    };
    savePrefs();
  }, [notifications, darkMode]);

  const openLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) Linking.openURL(url);
    else Alert.alert('No se puede abrir', url);
  };

  const onLogout = () => {
    // acá podrías limpiar tokens/estado real de auth
    navigation.replace('Login');
  };

  const themeBg = darkMode ? '#0f172a' : '#f8fafc';
  const cardBg = darkMode ? '#111827' : '#ffffff';
  const textPrimary = darkMode ? '#e5e7eb' : '#111827';
  const textSecondary = darkMode ? '#9ca3af' : '#6b7280';
  const divider = darkMode ? '#1f2937' : '#e5e7eb';
  const accent = '#2563eb';

  return (
    <View style={[styles.container, { backgroundColor: themeBg }]}>
      {/* Header / Perfil */}
      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <View style={styles.row}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
            style={styles.avatar}
          />
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={[styles.name, { color: textPrimary }]}>{name}</Text>
            <Text style={{ color: textSecondary }}>{email}</Text>
          </View>
          <TouchableOpacity
            style={styles.roundBtn}
            onPress={() => Alert.alert('Editar perfil', 'Acá podrías abrir una pantalla/modal de edición.')}
          >
            <Ionicons name="create-outline" size={20} color={accent} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Preferencias */}
      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <Text style={[styles.cardTitle, { color: textPrimary }]}>Preferencias</Text>

        <View style={[styles.itemRow, { borderBottomColor: divider }]}>
          <View style={styles.itemLeft}>
            <Ionicons name="notifications-outline" size={20} color={textSecondary} />
            <Text style={[styles.itemText, { color: textPrimary }]}>Notificaciones</Text>
          </View>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>

        <View style={styles.itemRow}>
          <View style={styles.itemLeft}>
            <Ionicons name="moon-outline" size={20} color={textSecondary} />
            <Text style={[styles.itemText, { color: textPrimary }]}>Tema oscuro</Text>
          </View>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
      </View>

      {/* Accesos rápidos */}
      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <Text style={[styles.cardTitle, { color: textPrimary }]}>Accesos rápidos</Text>

        <TouchableOpacity
          style={[styles.itemRow, { borderBottomColor: divider }]}
          onPress={() => navigation.navigate('Vehiculos')}
        >
          <View style={styles.itemLeft}>
            <Ionicons name="car-sport-outline" size={20} color={textSecondary} />
            <Text style={[styles.itemText, { color: textPrimary }]}>Mis vehículos</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemRow}
          onPress={() => navigation.navigate('Mantenimientos')}
        >
          <View style={styles.itemLeft}>
            <Ionicons name="construct-outline" size={20} color={textSecondary} />
            <Text style={[styles.itemText, { color: textPrimary }]}>Historial de mantenimientos</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Sobre la app */}
      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <Text style={[styles.cardTitle, { color: textPrimary }]}>Sobre NitroNote</Text>

        <TouchableOpacity
          style={[styles.itemRow, { borderBottomColor: divider }]}
          onPress={() => openLink('https://example.com/soporte')}
        >
          <View style={styles.itemLeft}>
            <Ionicons name="help-circle-outline" size={20} color={textSecondary} />
            <Text style={[styles.itemText, { color: textPrimary }]}>Ayuda y soporte</Text>
          </View>
          <Ionicons name="open-outline" size={18} color={textSecondary} />
        </TouchableOpacity>

        <View style={styles.itemRow}>
          <View style={styles.itemLeft}>
            <Ionicons name="information-circle-outline" size={20} color={textSecondary} />
            <Text style={[styles.itemText, { color: textPrimary }]}>Versión de la app</Text>
          </View>
          <Text style={{ color: textSecondary }}>1.0.0</Text>
        </View>
      </View>

      {/* Logout */}
      <TouchableOpacity style={[styles.logoutBtn, { borderColor: divider }]} onPress={onLogout}>
        <Ionicons name="log-out-outline" size={18} color="#ef4444" />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  card: {
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#e5e7eb' },
  name: { fontSize: 18, fontWeight: '700' },
  roundBtn: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(37,99,235,0.08)'
  },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  itemRow: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  itemText: { fontSize: 15 },
  logoutBtn: {
    marginTop: 'auto',
    paddingVertical: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  logoutText: { color: '#ef4444', fontWeight: '600' }
});
