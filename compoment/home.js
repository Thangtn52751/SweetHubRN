import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import { Alert } from "react-native";
import { fetchProducts, fetchUser } from "../services/api"; // API từ JSON Server

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]); // Tất cả sản phẩm
  const [filteredProducts, setFilteredProducts] = useState([]); // Sản phẩm được lọc
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Từ khóa tìm kiếm
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch dữ liệu từ API
  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setFilteredProducts(data); // Ban đầu hiển thị tất cả sản phẩm
    });
    fetchUser().then(setUser); // Lấy thông tin user
  }, []);

  // Xử lý sự kiện tìm kiếm
  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  };

  // Xử lý sự kiện chọn danh mục
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category) {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Nếu không chọn danh mục, hiển thị tất cả
    }
  };

  // Dữ liệu hình ảnh slideshow cố định
  const slideshowImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3DPecXi6mn4nqScwP9P2mG41A6pG-RWbnw&s",
    "https://static.vecteezy.com/system/resources/previews/003/385/823/non_2x/homemade-cake-banner-vector.jpg",
    "https://t3.ftcdn.net/jpg/10/30/88/56/360_F_1030885648_ohBkKydnJRPzJb1wQH0C6xPTq5G3Cf4Q.jpg",
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}> Welcome to SweetHub!
      </Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#aaa"
        value={searchQuery}
        onChangeText={handleSearch} // Sự kiện tìm kiếm
      />

      {/* Slideshow */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.slideshow}
      >
        {slideshowImages.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.slideshowImage} />
        ))}
      </ScrollView>

      {/* Categories */}
      <Text style={styles.categoryTitle}>Browse By Category</Text>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Cake" && styles.selectedCategory,
          ]}
          onPress={() => handleCategorySelect("Cake")}
        >
          <Text style={styles.categoryText}>Cake</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Donuts" && styles.selectedCategory,
          ]}
          onPress={() => handleCategorySelect("Donuts")}
        >
          <Text style={styles.categoryText}>Donuts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Cookies" && styles.selectedCategory,
          ]}
          onPress={() => handleCategorySelect("Cookies")}
        >
          <Text style={styles.categoryText}>Cookies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === null && styles.selectedCategory,
          ]}
          onPress={() => handleCategorySelect(null)}
        >
          <Text style={styles.categoryText}>All</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <TouchableOpacity
  style={styles.productCard}
  onPress={() => navigation.navigate("ProductDetail", { product: item })}
>
            <Image source={{ uri: item.image }} style={styles.productImage}
             />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price} VNĐ</Text>

        </TouchableOpacity>
        )}
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
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    backgroundColor: "#f5f5f5",
  },
  slideshow: {
    height: 150,
    marginBottom: 16,
  },
  slideshowImage: {
    width: 300,
    height: 150,
    borderRadius: 8,
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: "#ffe7e0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: "#ff6f61",
  },
  categoryText: {
    color: "#ff6f61",
    fontWeight: "bold",
    color: "white",
  },
  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  productPrice: {
    color: "#ff6f61",
    fontWeight: "bold",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "#ff6f61",
    width: 100,
    height: 32,
    marginBottom:10,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
