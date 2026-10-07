import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../context/UserContext';

export default function AuthScreen() {
  const router = useRouter();
  const { setUser } = useUser();
  const [isRegistering, setIsRegistering] = useState(false);

  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleAuth = () => {
    if (!emailInput || !passwordInput || (isRegistering && !nameInput)) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const displayName = isRegistering ? nameInput : emailInput.split('@')[0];
    setUser(displayName, emailInput);

    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{isRegistering ? 'Criar Conta' : 'Fazer Login'}</Text>

        {isRegistering && (
          <TextInput
            style={styles.input}
            placeholder="Nome / Gamertag"
            placeholderTextColor="#7F849C"
            value={nameInput}
            onChangeText={setNameInput}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#7F849C"
          value={emailInput}
          onChangeText={setEmailInput}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#7F849C"
          secureTextEntry
          value={passwordInput}
          onChangeText={setPasswordInput}
        />

        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>{isRegistering ? 'CADASTRAR' : 'ENTRAR'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
          <Text style={styles.switchText}>
            {isRegistering ? 'Já tem conta? Fazer Login' : 'Não tem conta? Cadastre-se'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D090A', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#161113', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#FF003C' },
  title: { color: '#FFFFFF', fontSize: 22, fontWeight: '900', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#21181B', color: '#FFFFFF', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#3D2228' },
  button: { backgroundColor: '#FF003C', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFFFFF', fontWeight: '900' },
  switchText: { color: '#FF2A55', textAlign: 'center', marginTop: 16, fontWeight: 'bold' },
});