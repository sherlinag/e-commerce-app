import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const initialCartItems = [
  {
    id: "1",
    title: "Mid-Century Modern Wooden Dining Table",
    price: 24,
    quantity: 1,
    image: "https://i.imgur.com/DMQHGA0.jpeg",
  },
  {
    id: "2",
    title: "Modern Ergonomic Office Chair",
    price: 71,
    quantity: 2,
    image: "https://i.imgur.com/3dU0m72.jpeg",
  },
  {
    id: "3",
    title: "Elegant Golden-Base Stone Top Dining Table",
    price: 66,
    quantity: 1,
    image: "https://i.imgur.com/NWIJKUj.jpeg",
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleIncreaseQuantity = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const handleDecreaseQuantity = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const renderCartItem = ({ item }: { item: { id: string; title: string; price: number; quantity: number; image: string } }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => handleDecreaseQuantity(item.id)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityNumber}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => handleIncreaseQuantity(item.id)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderCartItem}
        contentContainerStyle={styles.cartList}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${calculateTotalPrice()}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 15,
    textAlign: "center",
    color: "#333",
  },
  cartList: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 15,
    marginBottom: 10,
    elevation: 2,
    alignItems: "center",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemPrice: {
    fontSize: 14,
    color: "#888",
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 5,
  },
  quantityText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  quantityNumber: {
    fontSize: 16,
    marginHorizontal: 10,
    color: "#333",
  },
  footer: {
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  checkoutButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CartPage;
