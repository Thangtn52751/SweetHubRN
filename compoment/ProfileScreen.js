import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import Icon from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = (props) => {
  const { navigation } = props;
  const [user, setUser] = useState(null);

  // Hàm tải thông tin người dùng từ server
  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng.');
        return;
      }

      const response = await axios.get(`http://10.24.54.166:3000/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải thông tin người dùng.');
      console.error(error);
    }
  };

  // Gọi fetchUserData khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  // Xử lý đăng xuất
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('Login'); // Chuyển hướng về màn hình đăng nhập
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại!');
      console.error(error);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Đang tải thông tin người dùng...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.fullName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('EditProfile')}>
          <Icon name="edit" size={20} color="black" />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('OrderHistory')}>
          <Icon name="box" size={20} color="black" />
          <Text style={styles.optionText}>Order History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={20} color="black" />
          <Text style={styles.optionText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#6c757d',
  },
  optionsContainer: {
    width: '100%',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#343a40',
  },
});

export default ProfileScreen;
