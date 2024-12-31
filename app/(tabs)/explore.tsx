import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import mockDatabase from "../../data/db.json"; // Adjust the path as needed if db.json is in a different directory
import { Ionicons } from "@expo/vector-icons"; // Ensure you have installed this package

const ExplorePage = () => {
  const [menuVisible, setMenuVisible] = useState(false); // State for the menu modal
  const { saleProducts } = mockDatabase; // Extract the products from the mock database

  // Toggle the menu modal visibility
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // Close the menu modal
  const closeMenu = () => {
    setMenuVisible(false);
  };

  // Render each product card
  const renderProduct = ({ item }: { item: { id: number; title: string; price: number; images: string[] } }) => {
    return (
      
      <View style={styles.productCard}>
        <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <TouchableOpacity style={styles.productButton}>
          <Text style={styles.productButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header Section */}
      <View style={styles.fixedHeader}>
        <Text style={styles.headerTitle}>ShopX</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={30} color="#333" />
        </TouchableOpacity>
      </View>

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
                {/* Close Button */}
                <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
                  <Ionicons name="close" size={30} color="#333" />
                </TouchableOpacity>
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
                  <Text style={styles.menuText}>Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                  <Text style={styles.menuText}>Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      {/* Explore Products List */}
      <FlatList
        data={saleProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2} // Display in grid format
        columnWrapperStyle={styles.row} // Align the items properly in a grid
        contentContainerStyle={styles.productsList} // Add padding to the list
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50, // Provide space for fixed header
  },
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00008b",
    marginLeft: 10,
  },
  row: {
    justifyContent: "space-between", // Spread the items evenly
    marginBottom: 15, // Space between rows for better grid separation
  },
  productsList: {
    paddingBottom: 10,
    paddingHorizontal: 10, // Padding around the grid
  },
  productCard: {
    flex: 1,
    margin: 7,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    alignItems: "center",
    justifyContent: "space-between",
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  productTitle: {
    marginTop: 10,
    fontSize: 14,
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
    paddingVertical: 8,
    paddingHorizontal: 16,
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
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
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

export default ExplorePage;
