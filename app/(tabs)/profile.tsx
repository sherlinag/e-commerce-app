import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [menuVisible, setMenuVisible] = useState(false);

  // Toggle menu modal visibility
  const toggleMenu = () => setMenuVisible(!menuVisible);
  const closeMenu = () => setMenuVisible(false);

  // Handle profile update
  const handleEditProfile = () => {
    if (isEditing) {
      Alert.alert("Profile Updated", `Name: ${name}\nEmail: ${email}`);
    }
    setIsEditing(!isEditing);
  };

  // Handle logout
  const handleLogout = () => {
    Alert.alert("Logged Out", "You have successfully logged out.");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Fixed Header with Menu Button */}
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

                {/* Menu Items */}
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

      {/* Profile Page Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://i.postimg.cc/fbcDkrFb/1000-F-244427911-ao-HHulebt-Yy4w-Lpnc-BBu-Wq-CTNFKolc-CB.jpg",
            }}
            style={styles.avatar}
          />
          <TouchableOpacity
            onPress={handleEditProfile}
            style={styles.editButton}
            aria-label="Edit Profile"
          >
            <Ionicons name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <ProfileField
            label="Name"
            value={name}
            onChange={setName}
            editable={isEditing}
          />
          <ProfileField
            label="Email"
            value={email}
            onChange={setEmail}
            editable={isEditing}
          />
        </View>

        <TouchableOpacity
          onPress={handleEditProfile}
          style={[styles.button, styles.saveButton]}
        >
          <Text style={styles.buttonText}>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          style={[styles.button, styles.logoutButton]}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Profile Field Component
interface ProfileFieldProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
  editable: boolean;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value, onChange, editable }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      editable={editable}
      placeholder={`Enter your ${label.toLowerCase()}`}
      placeholderTextColor="#aaa"
    />
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
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
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#00008b", marginLeft: 10 },
  content: { marginTop: 80, paddingBottom: 40, paddingHorizontal: 20 },
  header: { alignItems: "center", marginVertical: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: "#007bff" },
  editButton: { position: "absolute", bottom: 0, right: 0, backgroundColor: "#007bff", borderRadius: 50, padding: 8 },
  infoContainer: { marginBottom: 30 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", color: "#333", marginBottom: 8 },
  input: { height: 45, borderColor: "#ddd", borderWidth: 1, borderRadius: 8, paddingLeft: 10, backgroundColor: "#fff", fontSize: 16 },
  button: { padding: 15, borderRadius: 8, alignItems: "center", marginBottom: 15 },
  saveButton: { backgroundColor: "#28a745" },
  logoutButton: { backgroundColor: "#dc3545" },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  overlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "center", alignItems: "flex-end" },
  menuContainer: { backgroundColor: "#fff", width: 250, padding: 20, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, height: "100%" },
  closeButton: { position: "absolute", top: 20, right: 20 },
  menuItem: { paddingVertical: 15 },
  menuText: { fontSize: 18, color: "#333", fontWeight: "bold" },
});

export default ProfilePage;
