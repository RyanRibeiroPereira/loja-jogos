import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../context/CartContext";

// Imagem padrão para quando a URL falhar ou estiver vazia
const FALLBACK_IMAGE =
  "https://via.placeholder.com/150/161113/FF003C?text=GAME";

function CartItem({
  item,
  onRemove,
}: {
  item: any;
  onRemove: (id: string) => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <View style={styles.itemCard}>
      <Image
        source={{ uri: imgError || !item.image ? FALLBACK_IMAGE : item.image }}
        onError={() => setImgError(true)}
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onRemove(item.id)}
      >
        <Text style={styles.removeText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function CartScreen() {
  const router = useRouter();
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, game) => acc + (game.priceValue || 0), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    Alert.alert(
      "Sucesso! 🎉",
      `Compra de R$ ${total.toFixed(2).replace(".", ",")} efetuada com sucesso!`,
    );
    clearCart();
    router.replace("/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyText}>O seu carrinho está vazio.</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/home")}
          >
            <Text style={styles.backButtonText}>IR PARA A LOJA</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.headerTitle}>🛒 TEU CARRINHO</Text>

          <FlatList
            data={cart}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
              <CartItem item={item} onRemove={removeFromCart} />
            )}
            contentContainerStyle={styles.list}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TOTAL:</Text>
              <Text style={styles.totalValue}>
                R$ {total.toFixed(2).replace(".", ",")}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutText}>FINALIZAR COMPRA 💳</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => router.back()}
            >
              <Text style={styles.continueText}>CONTINUAR COMPRANDO</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D090A",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyIcon: {
    fontSize: 50,
    marginBottom: 12,
  },
  emptyText: {
    color: "#A69C9E",
    fontSize: 16,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#FF003C",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },
  list: {
    padding: 16,
  },
  itemCard: {
    flexDirection: "row",
    backgroundColor: "#161113",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3D2228",
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: "#2A1B20",
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  itemCategory: {
    color: "#7F849C",
    fontSize: 11,
    marginTop: 2,
  },
  itemPrice: {
    color: "#FF2A55",
    fontSize: 14,
    fontWeight: "900",
    marginTop: 6,
  },
  removeButton: {
    padding: 8,
  },
  removeText: {
    fontSize: 16,
  },
  footer: {
    padding: 20,
    backgroundColor: "#161113",
    borderTopWidth: 1,
    borderTopColor: "#3D2228",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    alignItems: "center",
  },
  totalLabel: {
    color: "#A69C9E",
    fontSize: 14,
    fontWeight: "bold",
  },
  totalValue: {
    color: "#FF003C",
    fontSize: 22,
    fontWeight: "900",
  },
  checkoutButton: {
    backgroundColor: "#FF003C",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  checkoutText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
  continueButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  continueText: {
    color: "#A69C9E",
    fontSize: 12,
    fontWeight: "bold",
  },
});
