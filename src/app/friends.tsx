import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Friend {
  id: string;
  name: string;
  tag: string;
  status: "online" | "offline";
  avatar: string;
}

export default function FriendsScreen() {
  const [friendTag, setFriendTag] = useState("");
  const [friendsList, setFriendsList] = useState<Friend[]>([
    {
      id: "1",
      name: "Alex Gamer",
      tag: "#1234",
      status: "online",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    },
    {
      id: "2",
      name: "Beatriz_Pro",
      tag: "#5678",
      status: "offline",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    },
  ]);

  const handleAddFriend = () => {
    if (!friendTag.trim()) {
      Alert.alert("Atenção", "Digite o nome ou a tag do amigo.");
      return;
    }

    const newFriend: Friend = {
      id: Date.now().toString(),
      name: friendTag.split("#")[0] || friendTag,
      tag: friendTag.includes("#") ? `#${friendTag.split("#")[1]}` : "#9999",
      status: "online",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200",
    };

    setFriendsList([...friendsList, newFriend]);
    setFriendTag("");
    Alert.alert(
      "Sucesso!",
      `Pedido enviado para ${newFriend.name}${newFriend.tag}`,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.addSection}>
        <Text style={styles.sectionTitle}>Adicionar Amigo</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Ex: Nome#1234"
            placeholderTextColor="#A6ADC8"
            value={friendTag}
            onChangeText={setFriendTag}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddFriend}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.listTitle}>Seus Amigos ({friendsList.length})</Text>
      <FlatList
        data={friendsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendCard}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>
                {item.name} <Text style={styles.friendTag}>{item.tag}</Text>
              </Text>
              <Text
                style={
                  item.status === "online"
                    ? styles.statusOnline
                    : styles.statusOffline
                }
              >
                ● {item.status === "online" ? "Online" : "Offline"}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181825",
    padding: 16,
  },
  addSection: {
    backgroundColor: "#1E1E2E",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#313244",
    color: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: "#89B4FA",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#11111B",
    fontWeight: "bold",
  },
  listTitle: {
    color: "#BAC2DE",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  friendCard: {
    flexDirection: "row",
    backgroundColor: "#1E1E2E",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  friendInfo: {
    marginLeft: 12,
  },
  friendName: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  friendTag: {
    color: "#6C7086",
    fontSize: 14,
  },
  statusOnline: {
    color: "#A6E3A1",
    fontSize: 12,
    marginTop: 2,
  },
  statusOffline: {
    color: "#6C7086",
    fontSize: 12,
    marginTop: 2,
  },
});
