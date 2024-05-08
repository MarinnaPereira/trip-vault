import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { registerUser } from '../api/api';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // !handleRegisterPress function to save data
  const handleRegisterPress = () => {
    const newUser = { username, email, password, avatar: 'iceberg' };
    registerUser(newUser);
    console.log('user created');
    navigation.navigate('Login', { screen: 'LoginScreen' });
  };

  const handleLoginPress = () => {
    navigation.navigate('Login', { screen: 'LoginScreen' });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View className="flex-1 items-center">
      <Image
        source={require('./../../assets/images/trip-vault-logo.png')}
        className="w-[120px] h-[120px] mt-24"
      />
      <Text className="mt-12 text-3xl font-semibold">Register</Text>
      <Text className="text-[19px]">Create your account</Text>
      <TextInput
        className="w-[380px] mt-8 bg-lightGray rounded-md p-3 text-[19px]"
        placeholder="username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        className="w-[380px] mt-4 bg-lightGray rounded-md p-3 text-[19px]"
        placeholder="email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={text => setEmail(text)}
      ></TextInput>
      <View className="flex flex-row justify-between w-[380px] mt-4 bg-lightGray rounded-md p-3">
        <TextInput
          className="text-[19px]"
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

      <Text className="mt-36 text-[19px]">Already have an account?</Text>
      <TouchableOpacity onPress={handleLoginPress}>
        <Text className="mt-2 text-orange text-[19px]">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleRegisterPress}
        className="bg-green w-[300px] rounded-lg mt-4"
      >
        <Text className="text-white text-center p-4 text-[19px]">Register</Text>
      </TouchableOpacity>
    </View>
  );
}
