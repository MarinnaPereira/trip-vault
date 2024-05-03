import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async () => {
    const url = 'http://192.168.0.237:8080/auth/login';
    try {
      const data = {
        credential,
        password,
      };
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, config);
      const result = await response.json();
      await AsyncStorage.setItem('token', result.token);
    } catch (error) {
      console.error(error);
    }
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        console.log(token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // !handleLoginPress function
  const handleLoginPress = () => {
    loginUser();
    getToken();
    navigation.navigate('UnlockFirstTrip', { screen: 'UnlockFirstTripScreen' });
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register', { screen: 'RegisterScreen' });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View className="flex-1 items-center">
      <Image
        source={require('./../../assets/images/trip-vault-logo.png')}
        className="w-[120px] h-[120px] mt-5"
      />
      <Text className="mt-12 text-xl font-semibold">Login</Text>
      <Text>Login to your account</Text>
      <TextInput
        className="w-[300px] mt-8 bg-lightGray rounded-md p-3"
        placeholder="username / email"
        placeholderTextColor="#999"
        onChangeText={text => setCredential(text)}
      ></TextInput>
      <View className="flex flex-row justify-between w-[300px] mt-4 bg-lightGray rounded-md p-3">
        <TextInput
          placeholder="password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Ionicons
          name={showPassword ? 'eye-off' : 'eye'}
          size={24}
          color="black"
          onPress={togglePasswordVisibility}
        />
      </View>

      <Text className="mt-28">Don't have an account?</Text>
      <TouchableOpacity onPress={handleRegisterPress}>
        <Text className="mt-2 text-orange">Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLoginPress}
        className="bg-green w-[300px] rounded-lg mt-4"
      >
        <Text className="text-white text-center p-4">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
