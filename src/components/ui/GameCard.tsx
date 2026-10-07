import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Game } from '../../types';

interface GameCardProps {
  game: Game;
  onPress: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: game.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.genre}>{game.genre.join(' • ')}</Text>
        <View style={styles.priceRow}>
          {game.originalPrice && (
            <Text style={styles.originalPrice}>R$ {game.originalPrice.toFixed(2)}</Text>
          )}
          <Text style={styles.price}>R$ {game.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 12,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  genre: {
    color: '#A6ADC8',
    fontSize: 12,
    marginTop: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  originalPrice: {
    color: '#6C7086',
    textDecorationLine: 'line-through',
    fontSize: 14,
  },
  price: {
    color: '#A6E3A1',
    fontSize: 16,
    fontWeight: 'bold',
  },
});