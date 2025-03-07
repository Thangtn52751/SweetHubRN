import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native"; // Import useIsFocused

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const isFocused = useIsFocused(); // Kiểm tra trạng thái của màn hình

  // Hàm tải danh sách yêu thích từ API
  const fetchFavorites = async () => {
    try {
      const response = await axios.get("http://10.24.54.166:3000/favorite");
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      // Chỉ gọi API khi màn hình được kích hoạt
      fetchFavorites();
    }
  }, [isFocused]); // Gọi lại khi trạng thái của màn hình thay đổi

  // Hàm xóa sản phẩm yêu thích
  const removeFavorite = async (id) => {
    try {
      await axios.delete(`http://10.24.54.166:3000/favorite/${id}`);
      setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== id));
      Alert.alert("Success", "Removed from favorites!");
    } catch (error) {
      console.error("Error removing favorite:", error);
      Alert.alert("Error", "Failed to remove from favorites.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFavorite(item.id)}>
        <Icon name="heart" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorites</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet!</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 8,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});
