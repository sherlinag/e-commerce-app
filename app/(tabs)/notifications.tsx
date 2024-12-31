import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
  const renderNotification = ({ item }: { item: { id: string; title: string; description: string; timestamp: string } }) => (
    <TouchableOpacity style={styles.card}>
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
      <Text style={styles.header}>Notifications</Text>
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
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 15,
    textAlign: "center",
    color: "#333",
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
