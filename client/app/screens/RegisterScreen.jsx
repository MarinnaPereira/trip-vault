import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { registerUser } from '../api/api';

export default function RegisterScreen({ navigation, route }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const avatar = route.params.avatar;

  const handleRegisterPress = () => {
    const newUser = { username, email, password, avatar };
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center">
          <Image
            source={require('./../../assets/images/TripVault-LogoBig.png')}
            className="w-[220px] h-[220px] mt-[70px] ml-3"
          />
          <Text className="mt-10 text-3xl font-semibold text-[#00B0A3]">
            Register
          </Text>
          <TextInput
            className="w-[380px] mt-6 bg-lightGray rounded-md p-3 text-[19px]"
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
          <Text className="mt-20 text-[19px]">Already have an account?</Text>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text className="mt-2 text-orange text-[19px]">Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleRegisterPress}
            className="bg-green w-[300px] rounded-lg mt-4"
          >
            <Text className="text-white text-center p-4 text-[19px]">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
