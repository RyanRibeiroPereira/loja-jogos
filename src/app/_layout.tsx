import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CartProvider } from "../context/CartContext";
import { UserProvider } from "../context/UserContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <CartProvider>
        <View style={styles.container}>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#0D090A" },
              animation: "fade",
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="home" />
            <Stack.Screen name="details" />
            <Stack.Screen name="cart" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="friends" />
          </Stack>
        </View>
      </CartProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D090A",
  },
});