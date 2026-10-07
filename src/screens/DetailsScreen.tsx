import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';

export const DetailsScreen = ({ route }: any) => {
  const { game } = route.params;
  const { addToCart } = useCart();

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: game.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.rating}>★ {game.rating}</Text>
        <Text style={styles.genres}>{game.genre.join(' • ')}</Text>
        <Text style={styles.description}>{game.description}</Text>
        
        <View style={styles.priceRow}>
          {game.originalPrice && (
            <Text style={styles.originalPrice}>R$ {game.originalPrice.toFixed(2)}</Text>
          )}
          <Text style={styles.price}>R$ {game.price.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => addToCart(game)}>
          <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181825',
  },
  image: {
    width: '100%',
    height: 240,
  },
  content: {
    padding: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  rating: {
    color: '#F9E2AF',
    fontSize: 16,
    marginVertical: 4,
  },
  genres: {
    color: '#A6ADC8',
    fontSize: 14,
    marginBottom: 12,
  },
  description: {
    color: '#BAC2DE',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  originalPrice: {
    color: '#6C7086',
    textDecorationLine: 'line-through',
    fontSize: 16,
  },
  price: {
    color: '#A6E3A1',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#89B4FA',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#11111B',
    fontSize: 16,
    fontWeight: 'bold',
  },
});