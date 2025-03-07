import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const handleRegister = async () => {
    if (!username || !password || !email || !phoneNumber || !fullName || !address) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }
  
    try {
      // Kiểm tra tài khoản đã tồn tại
      const checkResponse = await axios.get(`http://10.24.54.166:3000/users?username=${username}&email=${email}`);
      if (checkResponse.data.length > 0) {
        Alert.alert('Lỗi', 'Tài khoản hoặc email đã tồn tại!');
        return;
      }
  
      // Gửi yêu cầu đăng ký
      const response = await axios.post('http://10.24.54.166:3000/users', {
        username,
        password,
        email,
        phoneNumber,
        fullName,
        address,
      });
  
      if (response.status === 201) {
        Alert.alert('Thành công', 'Đăng ký thành công!');
        navigation.navigate('Login');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đăng ký. Vui lòng thử lại!');
      console.error(error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Image source={require('../img/logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.navigationRegister}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: 'red', fontWeight: 'bold' }}> Login</Text>
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
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginBottom: 20,
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
  naigationLogin: {
    marginTop: 20,
    alignItems: 'left',
    orientation: 'horizontal',
  },
  navigationRegister: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default RegisterScreen;
