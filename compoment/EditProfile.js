import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function EditProfileScreen({navigation}) {
  const [user, setUser] = useState({
    avatar: "",
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
    fullName: "",
    address: "",
  });
  const [userId, setUserId] = useState(null);

  // Lấy ID người dùng từ AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
          fetchUserData(storedUserId);
        } else {
          Alert.alert("Error", "No user ID found.");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // Fetch dữ liệu người dùng từ API
  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`http://10.24.54.166:3000/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert("Error", "Unable to fetch user data.");
    }
  };
  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://10.24.54.166:3000/users/${userId}`, user);
  
      // Kiểm tra trạng thái phản hồi
      console.log("Response status:", response.status);
  
      if (response.status === 200) {
        Alert.alert("Success", "Profile updated successfully!", [
          { text: "OK", onPress: () => navigation.navigate("Main") },
        ]);
      } else {
        Alert.alert("Error", "Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please check your connection.");
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Avatar (Image URL)"
        value={user.avatar}
        onChangeText={(text) => setUser({ ...user, avatar: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={user.username}
        onChangeText={(text) => setUser({ ...user, username: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={user.password}
        onChangeText={(text) => setUser({ ...user, password: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={user.phoneNumber}
        onChangeText={(text) => setUser({ ...user, phoneNumber: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={user.fullName}
        onChangeText={(text) => setUser({ ...user, fullName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={user.address}
        onChangeText={(text) => setUser({ ...user, address: text })}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  saveButton: {
    backgroundColor: "#ff6f61",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
