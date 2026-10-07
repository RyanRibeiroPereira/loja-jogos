import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((acc, game) => acc + game.price, 0);

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>O seu carrinho está vazio.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Text style={styles.removeText}>X</Text>
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={styles.list}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutText}>Finalizar Compra</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181825',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#BAC2DE',
    fontSize: 16,
  },
  list: {
    padding: 16,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E2E',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    color: '#A6E3A1',
    fontSize: 14,
    marginTop: 4,
  },
  removeButton: {
    padding: 8,
  },
  removeText: {
    color: '#F38BA8',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: '#1E1E2E',
    borderTopWidth: 1,
    borderTopColor: '#313244',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalLabel: {
    color: '#FFF',
    fontSize: 18,
  },
  totalValue: {
    color: '#A6E3A1',
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#A6E3A1',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#11111B',
    fontSize: 16,
    fontWeight: 'bold',
  },
});