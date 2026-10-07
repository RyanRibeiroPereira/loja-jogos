import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { GameCard } from '../components/ui/GameCard';
import { games } from '../data/games'; // confirme se o nome do seu arquivo em src/data é games.ts ou parecido

export const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GameCard
            game={item}
            onPress={() => navigation.navigate('Details', { game: item })}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181825',
  },
  list: {
    padding: 16,
  },
});