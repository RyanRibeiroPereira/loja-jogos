import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../context/UserContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { username, email } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.avatarBox}>
          <Text style={styles.avatarIcon}>👤</Text>
        </View>

        <Text style={styles.username}>{username}</Text>
        <Text style={styles.email}>{email}</Text>

        <View style={styles.menuBox}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>🎮 Minha Biblioteca</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>⚙️ Configurações da Conta</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/')}>
          <Text style={styles.logoutText}>SAIR DA CONTA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>VOLTAR AO LOBBY</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D090A' },
  content: { padding: 24, alignItems: 'center' },
  avatarBox: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#161113',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF003C',
    marginTop: 20,
    marginBottom: 12,
  },
  avatarIcon: { fontSize: 40 },
  username: { color: '#FFFFFF', fontSize: 22, fontWeight: '900' },
  email: { color: '#FF2A55', fontSize: 14, marginBottom: 28, fontWeight: 'bold' },
  menuBox: { width: '100%', gap: 10, marginBottom: 30 },
  menuItem: {
    backgroundColor: '#161113',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3D2228',
  },
  menuText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  logoutButton: {
    backgroundColor: '#26181A',
    paddingVertical: 14,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF003C',
    marginBottom: 12,
  },
  logoutText: { color: '#FF003C', fontWeight: '900' },
  backButton: { paddingVertical: 10 },
  backText: { color: '#A69C9E', fontWeight: 'bold' },
});