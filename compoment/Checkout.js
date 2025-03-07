import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

  const Checkout = ({ route }) => {
  const navigation = useNavigation();
  const { cartItems, totalPrice } = route.params;
  const [userAddress, setUserAddress] = useState("");
  const [userPhone, setUserPhone] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const userPhone = await AsyncStorage.getItem('userPhone'); // Lấy số điện thoại từ AsyncStorage
        setUserPhone(userPhone || '0961243241');
  
        if (userId) {
          const response = await axios.get(
            `http://10.24.54.166:3000/users/${userId}`
          );
          setUserAddress(response.data.address || 'Address not found');
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        setUserAddress('Failed to load address.');
        setUserPhone('Failed to load phone number.');
      }
    };
    fetchUserDetails();
  }, []);
  
  const handleOrder = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const order = {
        userId,
        items: cartItems,
        total: totalPrice,
        status: "Pending",
      };

      console.log("Order Data:", order);
      await axios.post("http://10.24.54.166:3000/orders", order);

      Alert.alert("Success", "Order placed successfully!");
      navigation.navigate("OrderHistory");
    } catch (error) {
      console.error("Error placing order:", error);
      Alert.alert("Error", "Failed to place order.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      {/* User Details */}
      <View style={styles.addressSection}>
        <Text style={styles.sectionTitle}>Shipping Details</Text>
        <Text style={styles.addressText}>Address: {userAddress}</Text>
        <Text style={styles.addressText}>Phone: {userPhone}</Text>
      </View>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price} VNĐ</Text>
              <Text style={styles.quantityText}>
                Quantity: {item.quantity}
              </Text>
            </View>
          </View>
        )}
      />

      {/* Total Price */}
      <View style={styles.section}>
        <Text style={styles.totalPrice}>Total: {totalPrice} VNĐ</Text>
      </View>

      {/* Order Button */}
      <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
        <Text style={styles.orderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  addressSection: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  addressText: {
    fontSize: 16,
    color: "#333",
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
  },
  quantityText: {
    fontSize: 14,
    color: "#333",
  },
  section: {
    marginTop: 16,
    alignItems: "center",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  orderButton: {
    marginTop: 16,
    backgroundColor: "#ff6f61",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});


export default Checkout;
