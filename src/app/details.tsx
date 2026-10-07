import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function DetailsScreen() {
  const router = useRouter();

  const handleBuy = () => {
    Alert.alert('Sucesso! 🎉', 'Jogo adicionado à tua biblioteca com sucesso!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>🎮</Text>
        <Text style={styles.title}>Detalhes do Jogo</Text>
        <Text style={styles.subtitle}>Pronto para entrar na ação?</Text>

        <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
          <Text style={styles.buyButtonText}>CONFIRMAR COMPRA 💳</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>VOLTAR AO LOBBY</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D090A', justifyContent: 'center', alignItems: 'center' },
  content: { width: '85%', alignItems: 'center', backgroundColor: '#161113', padding: 24, borderRadius: 16, borderWidth: 1, borderColor: '#FF003C' },
  icon: { fontSize: 50, marginBottom: 12 },
  title: { color: '#FFFFFF', fontSize: 22, fontWeight: '900', marginBottom: 8 },
  subtitle: { color: '#A69C9E', fontSize: 14, marginBottom: 24 },
  buyButton: { backgroundColor: '#FF003C', paddingVertical: 14, width: '100%', borderRadius: 10, alignItems: 'center', marginBottom: 12 },
  buyButtonText: { color: '#FFFFFF', fontWeight: '900', fontSize: 14 },
  backButton: { paddingVertical: 10 },
  backButtonText: { color: '#FF2A55', fontWeight: 'bold', fontSize: 12 },
});