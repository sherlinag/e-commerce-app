import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import mockDatabase from "../../data/db.json"; // Adjust the path as needed if db.json is in a different directory

const ExplorePage = () => {
  const { saleProducts } = mockDatabase; // Extract the products from the mock database

  // Render each product card
  const renderProduct = ({ item }: { item: { id: number; title: string; price: number; images: string[] } }) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.images[0] }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={saleProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2} // Display in grid format
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 5,
    flex: 1,
    alignItems: "center",
    padding: 10,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    color: "#888",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ExplorePage;
