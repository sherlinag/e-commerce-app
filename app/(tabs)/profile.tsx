import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");

  // Handle profile update and toggle edit mode
  const handleEditProfile = () => {
    if (isEditing) {
      // Save changes (in a real app, save to API or local storage)
      Alert.alert("Profile Updated", `Name: ${name}\nEmail: ${email}`);
    }
    setIsEditing(!isEditing);
  };

  // Handle logout
  const handleLogout = () => {
    // Handle logout (e.g., clear session, navigate to login)
    Alert.alert("Logged Out", "You have successfully logged out.");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://i.postimg.cc/fbcDkrFb/1000-F-244427911-ao-HHulebt-Yy4w-Lpnc-BBu-Wq-CTNFKolc-CB.jpg", // Avatar image
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

        {/* Profile Information Section */}
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

        {/* Edit/Save Button */}
        <TouchableOpacity
          onPress={handleEditProfile}
          style={[styles.button, styles.saveButton]}
        >
          <Text style={styles.buttonText}>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Text>
        </TouchableOpacity>

        {/* Logout Button */}
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

// Reusable ProfileField component
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  content: {
    paddingBottom: 40, // To avoid bottom overflow
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#007bff",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007bff",
    borderRadius: 50,
    padding: 8,
  },
  infoContainer: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#28a745",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default ProfilePage;
