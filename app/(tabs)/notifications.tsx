import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Sample notifications data
const notifications = [
  {
    id: "1",
    title: "Order Shipped",
    description: "Your order #12345 has been shipped and is on its way!",
    timestamp: "2024-01-01 10:30 AM",
  },
  {
    id: "2",
    title: "Payment Received",
    description: "Your payment for order #12345 has been successfully processed.",
    timestamp: "2023-12-31 09:15 AM",
  },
  {
    id: "3",
    title: "New Product Alert",
    description: "Check out our latest dining tables now available in the store.",
    timestamp: "2023-12-30 08:45 AM",
  },
  {
    id: "4",
    title: "Holiday Sale!",
    description: "Don't miss out on our 50% off holiday sale! Ends soon.",
    timestamp: "2023-12-25 06:00 PM",
  },
];

const NotificationPage = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  // Toggle the menu modal visibility
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // Close the menu modal
  const closeMenu = () => {
    setMenuVisible(false);
  };

  // Handle notification press
  const handleNotificationPress = (id: any) => {
    console.log(`Notification ${id} clicked`);
  };

  const renderNotification = ({ item }: { item: { id: string; title: string; description: string; timestamp: string } }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleNotificationPress(item.id)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="notifications-outline" size={24} color="#007bff" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.fixedHeader}>
        <Text style={styles.headerTitle}>ShopX</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Menu Modal */}
      {menuVisible && (
        <Modal transparent={true} animationType="slide" visible={menuVisible} onRequestClose={closeMenu}>
          <TouchableWithoutFeedback onPress={closeMenu}>
            <View style={styles.overlay}>
              <View style={styles.menuContainer}>
                <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
                  <Ionicons name="close" size={30} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuText}>Explore</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuText}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuText}>Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuText}>Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50, // Space for the fixed header
  },
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00008b",
    marginLeft: 10,
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
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    elevation: 2,
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
});

export default NotificationPage;
