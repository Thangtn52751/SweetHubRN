import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";


// Import các màn hình
import Splash from "./splash";
import Login from "./login";
import Register from "./register";
import HomeScreen from "./home";
import ProfileScreen from "./ProfileScreen";
import CartScreen from "./CartScreen";
import FavoriteScreen from "./FavoriteScreen";
import ProductDetail from "./ProductDetail";
import Intro from "./introSlide"
import EditProfile from "./EditProfile";
import AdminScreen from "./AdminScreen";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import CheckOutScreen from "./Checkout";
import OrderHistoryScreen from "./OrderHistory";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigation
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ff6f61",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Favorites" component={FavoriteScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Navigation Container
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Intro"
        component={Intro}
        options={{ headerTitle: "Intro", headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="CheckOut"
        component={CheckOutScreen}
        options={{ headerTitle: "Checkout", headerShown: true }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ headerTitle: "Cake Detail", headerShown: true }}
        />
        <Stack.Screen
        name="AdminScreen"
        component={AdminScreen}
        options={{ headerTitle: "Admin", headerShown: false}}
        />
        <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerTitle: "Edit Profile", headerShown: true }}
        />
        <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{ headerTitle: "Add Product", headerShown: true }}
        />
        <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{ headerTitle: "Order History", headerShown: true }}
        />

        <Stack.Screen
        name="EditProduct"
        component={EditProduct}
        options={{ headerTitle: "Edit Product", headerShown: true }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
