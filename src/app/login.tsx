import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permissão necessária', 'Permita o acesso à galeria para escolher uma foto.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Atenção', 'Preencha o e-mail e a senha.');
      return;
    }

    // Navega para a tela principal
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar na Conta</Text>

      {/* Seleção da Foto de Perfil */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>+ Foto</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Campo E-mail */}
      <TextInput
        style={styles.input}
        placeholder="Seu e-mail"
        placeholderTextColor="#A6ADC8"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo Senha */}
      <TextInput
        style={styles.input}
        placeholder="Sua senha"
        placeholderTextColor="#A6ADC8"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Botão Entrar */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181825',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  imagePicker: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#313244',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#89B4FA',
  },
  avatarText: {
    color: '#89B4FA',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1E1E2E',
    color: '#FFF',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#89B4FA',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#11111B',
    fontSize: 16,
    fontWeight: 'bold',
  },
});