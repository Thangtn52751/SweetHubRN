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
import { Picker } from "@react-native-picker/picker";

const EditProductScreen = ({ route, navigation }) => {
  const productId = route?.params?.productId; // Nhận productId từ route params
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Cake");

  // Fetch product details when screen loads
  useEffect(() => {
    if (!productId) {
      Alert.alert("Error", "Product ID not provided!");
      navigation.goBack();
      return;
    }

    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://10.24.54.166:3000/products/${productId}`);
        if (response.ok) {
          const product = await response.json();
          setName(product.name);
          setPrice(product.price.toString());
          setQuantity(product.quantity.toString());
          setDescription(product.description);
          setImage(product.image);
          setCategory(product.category);
        } else {
          Alert.alert("Error", "Failed to fetch product details");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred while fetching product details");
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleUpdateProduct = async () => {
    if (!name || !price || !quantity || !description || !image || !category) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const updatedProduct = {
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      description,
      image,
      category,
    };

    try {
      const response = await fetch(`http://10.24.54.166:3000/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        Alert.alert("Success", "Product updated successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to update product");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while updating the product");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Product Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Product Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Image URL"
        value={image}
        onChangeText={setImage}
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Category</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Cake" value="Cake" />
          <Picker.Item label="Donut" value="Donuts" />
          <Picker.Item label="Cookie" value="Cookies" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdateProduct}>
        <Text style={styles.buttonText}>UPDATE PRODUCT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ff6f61",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  picker: {
    height: 60,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#ff6f61",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditProductScreen;
