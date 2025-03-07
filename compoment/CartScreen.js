import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import axios from "axios";

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://10.24.54.166:3000/cart");
        setCartItems(response.data);
        calculateTotal(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    const unsubscribe = navigation.addListener("focus", fetchCartItems);
    return unsubscribe;
  }, [navigation]);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleUpdateQuantity = async (item, increment) => {
    const updatedQuantity = item.quantity + increment;
  
    if (updatedQuantity <= 0) {
      try {
        await axios.delete(`http://10.24.54.166:3000/cart/${item.id}`);
        const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
        setCartItems(updatedCartItems);
        calculateTotal(updatedCartItems); // Tính lại tổng giá
      } catch (error) {
        console.error("Error removing item:", error);
        Alert.alert("Error", "Failed to remove item from cart.");
      }
    } else {
      try {
        const updatedItem = { ...item, quantity: updatedQuantity };
        await axios.put(`http://10.24.54.166:3000/cart/${item.id}`, updatedItem);
        const updatedCartItems = cartItems.map((cartItem) =>
          cartItem.id === item.id ? updatedItem : cartItem
        );
        setCartItems(updatedCartItems);
        calculateTotal(updatedCartItems); // Tính lại tổng giá
      } catch (error) {
        console.error("Error updating item quantity:", error);
        Alert.alert("Error", "Failed to update item quantity.");
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price} VNĐ</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => handleUpdateQuantity(item, -1)}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleUpdateQuantity(item, 1)}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: {totalPrice} VNĐ</Text>
        <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() =>
        navigation.navigate("CheckOut", { cartItems, totalPrice })}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
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
  cartItem: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "#ff6f61",
    textAlign: "left",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 8,
    color: "#555",
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  totalContainer: {
    marginTop: 16,
    alignItems: "left",
  },
  title:{
    fontSize: 20,
    marginBottom: 16,
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: "#ff6f61",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
