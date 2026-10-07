import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1E1E2E' },
        headerTintColor: '#FFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Loja de Jogos' }} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalhes do Jogo' }} />
    </Stack.Navigator>
  );
};