import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { FAB } from "react-native-paper";
import axios from "axios";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const AdminScreen = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Dùng để phát hiện khi màn hình này được focus

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://10.24.54.166:3000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchProducts();
    }
  }, [isFocused]);

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => {
        navigation.navigate("EditProduct", { productId: item.id }); // Truyền productId sang màn hình EditProduct
      }}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price} VNĐ</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SweetHub admin</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={styles.list}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("AddProduct")}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={() => {navigation.navigate("Login")}}>
        <Text style={{ color: "white", fontStyle: "bold" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    paddingTop: 24,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
    elevation: 5,
    textAlign: "center",
  },
  list: {
    padding: 16,
  },
  productItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    color: "#ff6f61",
    marginVertical: 4,
  },
  productDescription: {
    fontSize: 12,
    color: "#666",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    justifyContent:"left",
    bottom: 0,
    backgroundColor: "#ff6f61",
  },
  logoutButton: {
    padding: 16,
    backgroundColor: "#ff6f61",
    borderRadius: 8,
    elevation: 2,
    marginTop: 16,
    marginBottom: 24,
    alignSelf: "center",
  },
});

export default AdminScreen;
