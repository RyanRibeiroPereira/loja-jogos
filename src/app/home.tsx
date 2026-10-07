import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameItem, useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

interface ExtendedGameItem extends GameItem {
  buyUrl: string;
}

const GAMES: ExtendedGameItem[] = [
  {
    id: "1",
    title: "Cyberpunk 2077",
    category: "Ação / RPG",
    price: "R$ 199,90",
    priceValue: 199.9,
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    buyUrl: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/",
  },
  {
    id: "2",
    title: "Elden Ring",
    category: "Souls-like / RPG",
    price: "R$ 249,00",
    priceValue: 249.0,
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
    buyUrl: "https://store.steampowered.com/app/1245620/ELDEN_RING/",
  },
  {
    id: "3",
    title: "Valorant",
    category: "FPS / Competitivo",
    price: "Grátis",
    priceValue: 0,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2mdf.jpg",
    buyUrl: "https://playvalorant.com/",
  },
  {
    id: "4",
    title: "God of War Ragnarök",
    category: "Ação / Aventura",
    price: "R$ 299,90",
    priceValue: 299.9,
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/header.jpg",
    buyUrl: "https://store.steampowered.com/app/2322010/God_of_War_Ragnarok/",
  },
];

const CATEGORIES = ["Todos", "Ação", "RPG", "FPS"];

export default function HomeScreen() {
  const router = useRouter();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const { username } = useUser();

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [bannerFailed, setBannerFailed] = useState(false);

  // Estado para o Modal do QR Code
  const [selectedQrGame, setSelectedQrGame] = useState<ExtendedGameItem | null>(
    null,
  );

  const handleCartClick = (game: ExtendedGameItem) => {
    const isInCart = cart.some((item) => item.id === game.id);
    if (isInCart) {
      setIsCartVisible(true);
    } else {
      addToCart(game);
    }
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.priceValue || 0), 0);
  }, [cart]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    Alert.alert(
      "Sucesso! 🎉",
      `Compra de R$ ${cartTotal.toFixed(2).replace(".", ",")} efetuada com sucesso!`,
    );
    clearCart();
    setIsCartVisible(false);
  };

  const filteredGames = useMemo(() => {
    return GAMES.filter((game) => {
      const matchesCategory =
        selectedCategory === "Todos" ||
        game.category.includes(selectedCategory);
      const matchesSearch = game.title
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D090A" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>BEM-VINDO AO LOBBY 👋</Text>
            <Text style={styles.username}>{username}</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar jogos, expansões..."
            placeholderTextColor="#7F849C"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.banner}>
          {bannerFailed ? (
            <View style={styles.bannerFallback}>
              <Text style={{ fontSize: 50 }}>🔥</Text>
            </View>
          ) : (
            <Image
              source={{
                uri: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg",
              }}
              style={styles.bannerImage}
              resizeMode="cover"
              onError={() => setBannerFailed(true)}
            />
          )}
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>OFERTAS CYBERPUNK</Text>
            <Text style={styles.bannerSubtitle}>
              Até 70% OFF em jogos selecionados
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>JOGOS POPULARES</Text>

        <View style={styles.gamesGrid}>
          {filteredGames.map((game) => {
            const isInCart = cart.some((item) => item.id === game.id);
            return (
              <View key={game.id} style={styles.gameCard}>
                <Image
                  source={{ uri: game.image }}
                  style={styles.gameImage}
                  resizeMode="cover"
                />
                <View style={styles.gameInfo}>
                  <Text style={styles.gameTitle} numberOfLines={1}>
                    {game.title}
                  </Text>

                  <View style={styles.priceRow}>
                    <Text style={styles.gamePrice}>{game.price}</Text>

                    <View style={styles.actionButtonsRow}>
                      {/* Botão para abrir o QR Code */}
                      <TouchableOpacity
                        style={styles.qrButton}
                        onPress={() => setSelectedQrGame(game)}
                      >
                        <Text style={styles.qrButtonText}>📱 QR</Text>
                      </TouchableOpacity>

                      {/* Botão de Adicionar ao Carrinho */}
                      <TouchableOpacity
                        style={[
                          styles.buyButton,
                          isInCart && styles.buyButtonActive,
                        ]}
                        onPress={() => handleCartClick(game)}
                      >
                        <Text style={styles.buyButtonText}>
                          {isInCart ? "VER" : "+ CARRINHO"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomTab}>
          <Text style={styles.bottomIconActive}>🎮</Text>
          <Text style={styles.bottomTextActive}>Loja</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => router.push("/friends")}
        >
          <Text style={styles.bottomIcon}>👥</Text>
          <Text style={styles.bottomText}>Amigos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.bottomIcon}>👤</Text>
          <Text style={styles.bottomText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => setIsCartVisible(true)}
        >
          <View>
            <Text style={styles.bottomIcon}>🛒</Text>
            {cart.length > 0 && (
              <View style={styles.cartBadgeDot}>
                <Text style={styles.cartBadgeDotText}>{cart.length}</Text>
              </View>
            )}
          </View>
          <Text style={styles.bottomText}>Carrinho</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL DO QR CODE DE COMPRA */}
      <Modal
        visible={!!selectedQrGame}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSelectedQrGame(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.qrModalContent}>
            <Text style={styles.modalTitle}>📱 SCAN PARA COMPRAR</Text>
            <Text style={styles.qrGameTitle}>{selectedQrGame?.title}</Text>

            {selectedQrGame && (
              <View style={styles.qrCodeContainer}>
                <Image
                  source={{
                    uri: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                      selectedQrGame.buyUrl,
                    )}`,
                  }}
                  style={styles.qrImage}
                />
              </View>
            )}

            <Text style={styles.qrInstruction}>
              Aponte a câmara do seu telemóvel para ir à página oficial da loja.
            </Text>

            <TouchableOpacity
              style={styles.closeQrButton}
              onPress={() => setSelectedQrGame(null)}
            >
              <Text style={styles.closeQrText}>FECHAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL DO CARRINHO */}
      <Modal
        visible={isCartVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCartVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🛒 TEU CARRINHO</Text>
            {cart.length === 0 ? (
              <Text
                style={{
                  color: "#A69C9E",
                  textAlign: "center",
                  marginVertical: 20,
                }}
              >
                O teu carrinho está vazio.
              </Text>
            ) : (
              <ScrollView style={{ maxHeight: 180 }}>
                {cart.map((item) => (
                  <View key={item.id} style={styles.cartItem}>
                    <Text style={{ color: "#FFF", flex: 1 }}>{item.title}</Text>
                    <Text style={{ color: "#FF2A55", marginRight: 10 }}>
                      {item.price}
                    </Text>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                      <Text>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}
            <View style={styles.totalRow}>
              <Text style={{ color: "#A69C9E" }}>TOTAL:</Text>
              <Text
                style={{ color: "#FF003C", fontSize: 18, fontWeight: "900" }}
              >
                R$ {cartTotal.toFixed(2).replace(".", ",")}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.checkoutButton,
                cart.length === 0 && { opacity: 0.5 },
              ]}
              onPress={handleCheckout}
              disabled={cart.length === 0}
            >
              <Text style={{ color: "#FFF", fontWeight: "900" }}>
                FINALIZAR COMPRA 💳
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsCartVisible(false)}
              style={{ marginTop: 10, alignItems: "center" }}
            >
              <Text style={{ color: "#A69C9E" }}>VOLTAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D090A" },
  scrollContent: { padding: 20, paddingBottom: 90 },
  header: { marginTop: 10, marginBottom: 20 },
  greeting: { color: "#FF4D6D", fontSize: 11, fontWeight: "bold" },
  username: { color: "#FFFFFF", fontSize: 22, fontWeight: "900" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161113",
    borderRadius: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#3D2228",
    marginBottom: 20,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, color: "#FFFFFF", paddingVertical: 12 },
  categoriesContainer: { marginBottom: 24 },
  categoryChip: {
    backgroundColor: "#161113",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#3D2228",
  },
  categoryChipActive: { backgroundColor: "#FF003C", borderColor: "#FF003C" },
  categoryText: { color: "#A69C9E", fontSize: 13, fontWeight: "bold" },
  categoryTextActive: { color: "#FFFFFF" },
  banner: {
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: "#FF003C",
    backgroundColor: "#1A0008",
  },
  bannerImage: { width: "100%", height: "100%", position: "absolute" },
  bannerFallback: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#26181A",
  },
  bannerOverlay: {
    flex: 1,
    backgroundColor: "rgba(13, 9, 10, 0.55)",
    padding: 16,
    justifyContent: "flex-end",
  },
  bannerTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "900" },
  bannerSubtitle: { color: "#A69C9E", fontSize: 12 },
  sectionTitle: {
    color: "#FF4D6D",
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 16,
  },
  gamesGrid: { gap: 16 },
  gameCard: {
    backgroundColor: "#161113",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#3D2228",
    flexDirection: "row",
  },
  gameImage: { width: 110, height: 100 },
  gameInfo: { flex: 1, padding: 12, justifyContent: "space-between" },
  gameTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gamePrice: { color: "#FF2A55", fontSize: 13, fontWeight: "900" },
  actionButtonsRow: { flexDirection: "row", gap: 6 },
  qrButton: {
    backgroundColor: "#1A0008",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#FF4D6D",
  },
  qrButtonText: { color: "#FF4D6D", fontSize: 10, fontWeight: "900" },
  buyButton: {
    backgroundColor: "#26181A",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#FF003C",
  },
  buyButtonActive: { backgroundColor: "#FF003C" },
  buyButtonText: { color: "#FFFFFF", fontSize: 10, fontWeight: "900" },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: "#161113",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#3D2228",
  },
  bottomTab: { alignItems: "center" },
  bottomIcon: { fontSize: 18, color: "#A69C9E" },
  bottomIconActive: { fontSize: 18 },
  bottomText: { color: "#A69C9E", fontSize: 10, fontWeight: "bold" },
  bottomTextActive: { color: "#FF003C", fontSize: 10, fontWeight: "bold" },
  cartBadgeDot: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "#FF003C",
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  cartBadgeDotText: { color: "#FFFFFF", fontSize: 9, fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#161113",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FF003C",
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 12,
    textAlign: "center",
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#26181A",
    alignItems: "center",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  checkoutButton: {
    backgroundColor: "#FF003C",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  /* Estilos do Modal QR Code */
  qrModalContent: {
    backgroundColor: "#161113",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#FF003C",
    alignItems: "center",
  },
  qrGameTitle: {
    color: "#FF2A55",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  qrCodeContainer: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  qrImage: { width: 180, height: 180 },
  qrInstruction: {
    color: "#A69C9E",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
  },
  closeQrButton: {
    backgroundColor: "#26181A",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF003C",
  },
  closeQrText: { color: "#FFFFFF", fontWeight: "900", fontSize: 12 },
});
