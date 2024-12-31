import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Sample categories and products data
const categories = [
  { id: "1", name: "Furniture", image: "https://i.imgur.com/Qphac99.jpeg" },
  { id: "2", name: "Clothes", image: "https://i.imgur.com/QkIa5tT.jpeg" },
  { id: "3", name: "Shoes", image: "https://i.imgur.com/qNOjJje.jpeg" },
  { id: "4", name: "Cycles", image: "https://i.imgur.com/BG8J0Fj.jpg" },
  { id: "5", name: "Laptop", image: "https://i.imgur.com/tcNJxoW.jpeg" },
];

const products = [
  {
    id: "1",
    title: "Mid-Century Modern Wooden Dining Table",
    price: 24,
    image: "https://i.imgur.com/DMQHGA0.jpeg",
  },
  {
    id: "2",
    title: "Elegant Golden-Base Stone Top Dining Table",
    price: 66,
    image: "https://i.imgur.com/NWIJKUj.jpeg",
  },
  {
    id: "3",
    title: "Modern Ergonomic Office Chair",
    price: 71,
    image: "https://i.imgur.com/3dU0m72.jpeg",
  },
  {
    id: "4",
    title: "Apple iPhone 14 Pro Max",
    price: 1099,
    image: "https://i.postimg.cc/HshKm96P/images-5.jpg",
  },
  {
    id: "5",
    title: "Samsung Galaxy S23 Ultra",
    price: 999,
    image: "https://i.postimg.cc/26DMJj0k/51hq-XIAVXAL.jpg",
  },
  {
    id: "6",
    title: "MacBook Pro 16-inch",
    price: 2399,
    image: "https://i.postimg.cc/SRZPJ6kR/apple-macbook-pro-500x500.webp",
  },
  {
    id: "7",
    title: "Dell XPS 13 Laptop",
    price: 1499,
    image: "https://i.postimg.cc/mgK0YyMF/notebook-xps-13-9345-t-gray-gallery-4-2.png",
  },
];

const HomePage = () => {
  const [imageError, setImageError] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const renderCategoryItem = ({ item }: { item: { id: string; name: string; image: string } }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.categoryImage}
        onError={() => setImageError(true)}
      />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }: { item: { id: string; title: string; price: number; image: string } }) => (
    <View style={styles.productCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        onError={() => setImageError(true)}
      />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <TouchableOpacity style={styles.productButton}>
        <Text style={styles.productButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
      <Text style={styles.headerTitle}>ShopX</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={30} color="#333" />
        </TouchableOpacity>
       
        {/* Removed Cart Icon */}
      </View>

      {/* Categories Section */}
      <Text style={styles.sectionTitle}>Browse by Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
      />

      {/* Featured Products Section */}
      <Text style={styles.sectionTitle}>Featured Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        numColumns={2}
        contentContainerStyle={styles.productsList}
      />

      {/* Menu Modal */}
      {menuVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={menuVisible}
          onRequestClose={closeMenu}
        >
          <TouchableWithoutFeedback onPress={closeMenu}>
            <View style={styles.overlay}>
              <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                  <Text style={styles.menuText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                  <Text style={styles.menuText}>Explore</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                  <Text style={styles.menuText}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                  <Text style={styles.menuText}>Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  categoriesList: {
    marginBottom: 20,
  },
  categoryCard: {
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    width: 120,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  categoryName: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  productsList: {
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  productTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
    marginVertical: 5,
  },
  productButton: {
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  productButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  menuContainer: {
    backgroundColor: "#fff",
    width: 250,
    padding: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: "100%",
  },
  menuItem: {
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
});

export default HomePage;
