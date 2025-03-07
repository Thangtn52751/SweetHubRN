import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

export default function ProductDetail({ route, navigation }) {
  const { product } = route.params || {}; // Kiểm tra nếu product được truyền qua
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (product) {
      // Kiểm tra nếu sản phẩm đã được thêm vào danh sách yêu thích
      const fetchFavoriteStatus = async () => {
        try {
          const response = await axios.get("http://10.24.54.166:3000/favorite", {
            params: { id: product.id },
          });
          if (response.data.length > 0) {
            setIsFavorite(true);
          }
        } catch (error) {
          console.error("Error fetching favorite status:", error);
        }
      };
      fetchFavoriteStatus();
    }
  }, [product]);

  const handleToggleFavorite = async () => {
    if (isFavorite) {
      try {
        await axios.delete(`http://10.24.54.166:3000/favorite/${product.id}`);
        setIsFavorite(false);
        Alert.alert("Success", "Removed from favorites!");
      } catch (error) {
        console.error("Error removing from favorites:", error);
        Alert.alert("Error", "Failed to remove from favorites.");
      }
    } else {
      try {
        await axios.post("http://10.24.54.166:3000/favorite", product);
        setIsFavorite(true);
        Alert.alert("Success", "Added to favorites!");
      } catch (error) {
        console.error("Error adding to favorites:", error);
        Alert.alert("Error", "Failed to add to favorites.");
      }
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.get("http://10.24.54.166:3000/cart", {
        params: { id: product.id },
      });

      if (response.data.length > 0) {
        const updatedItem = {
          ...response.data[0],
          quantity: response.data[0].quantity + 1,
        };
        await axios.put(`http://10.24.54.166:3000/cart/${product.id}`, updatedItem);
      } else {
        await axios.post("http://10.24.54.166:3000/cart", { ...product, quantity: 1 });
      }

      Alert.alert("Success", "Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      Alert.alert("Error", "Failed to add to cart.");
    }
  };


  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product data is not available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.header}>
        <Text style={styles.productName}>{product.name}</Text>
        <TouchableOpacity onPress={handleToggleFavorite}>
          <Icon name={isFavorite ? "heart" : "heart-outline"} size={24} color="red" />
        </TouchableOpacity>
      </View>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productPrice}>Price: {product.price} VNĐ</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.button, styles.addToCart]} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6f61",
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#ff6f61",
    alignItems: "center",
    marginHorizontal: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  addToCart: {
    backgroundColor: "#4caf50",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 16,
  },
});
