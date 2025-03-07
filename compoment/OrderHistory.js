import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from "react-native";
import axios from "axios";

export default function OrderHistoryScreen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://10.24.54.166:3000/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const renderOrderItem = ({ item }) => {
    const firstItem = item.items[0];
    return (
      <View style={styles.orderCard}>
        <Image source={{ uri: firstItem.image }} style={styles.orderImage} />
        <View style={styles.orderDetails}>
          <Text style={styles.orderTitle}>{firstItem.name}</Text>
          <Text style={styles.orderDate}>Quantity: {firstItem.quantity}</Text>
          <Text style={styles.orderPrice}>{item.total} VNĐ</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  orderCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  orderDetails: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
