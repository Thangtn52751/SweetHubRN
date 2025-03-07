import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  // Tải thông tin đã lưu (nếu có) khi ứng dụng khởi chạy
  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedUsername = await AsyncStorage.getItem('username');
        const savedPassword = await AsyncStorage.getItem('password');
        const rememberMe = await AsyncStorage.getItem('remember') === 'true';

        if (rememberMe) {
          setUsername(savedUsername || '');
          setPassword(savedPassword || '');
          setRemember(true);
        }
      } catch (error) {
        console.error('Failed to load credentials', error);
      }
    };

    loadCredentials();
  }, []);

  // Xử lý sự kiện đăng nhập
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin đăng nhập!');
      return;
    }

    try {
      const response = await axios.get('http://10.24.54.166:3000/users', {
        params: { username, password },
      });

      if (response.data.length > 0) {
        const user = response.data[0]; // Lấy thông tin người dùng đầu tiên khớp
        Alert.alert('Thành công', 'Đăng nhập thành công!');

        // Lưu thông tin nếu nhớ mật khẩu được bật
        if (remember) {
          await AsyncStorage.setItem('username', username);
          await AsyncStorage.setItem('password', password);
          await AsyncStorage.setItem('remember', 'true');
        } else {
          // Xóa thông tin nếu nhớ mật khẩu bị tắt
          await AsyncStorage.removeItem('username');
          await AsyncStorage.removeItem('password');
          await AsyncStorage.setItem('remember', 'false');
        }

        // Lưu id của người dùng vào AsyncStorage
        await AsyncStorage.setItem('userId', user.id.toString());
        await AsyncStorage.setItem('userPhone', user.phone || ''); // Lưu số điện thoại

       if(user.role == "admin") {
         navigation.replace('AdminScreen');
       } else {
        navigation.replace('Main');
       }
      } else {
        Alert.alert('Lỗi', 'Sai tên đăng nhập hoặc mật khẩu!');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đăng nhập. Vui lòng thử lại!');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../img/logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Checkbox Remember me */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setRemember(!remember)}
        >
          <Icon
            name={remember ? 'toggle-on' : 'toggle-off'}
            size={24}
            color={remember ? 'red' : 'gray'}
          />
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Remember me</Text>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.registerTo}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: 'red', fontWeight: 'bold' }}> Register now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  logo: {
    width: 200,
    height: 120,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#495057',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerTo: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default LoginScreen;
