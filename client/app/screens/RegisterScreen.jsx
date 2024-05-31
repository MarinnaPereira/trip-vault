import { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { registerUser } from '../api/api';

export default function RegisterScreen({ navigation, route }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const avatar = route.params.avatar;

  useFocusEffect(
    useCallback(() => {
      // This will run when the screen is focused
      setUsername('');
      setEmail('');
      setPassword('');
      setShowPassword(false);
      setError('');
    }, []),
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterPress = async () => {
    setError('');
    setLoading(true);
    const newUser = { username, email, password, avatar };
    const res = await registerUser(newUser);
    setLoading(false);
    if (typeof res !== 'string') {
      console.log('addedUser', res);
      navigation.navigate('Login', { screen: 'LoginScreen' });
    } else {
      setError(res);
    }
  };

  const handleLoginPress = () => {
    navigation.navigate('Login', { screen: 'LoginScreen' });
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
          />
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
          {error && (
            <View className="text-red-600 mt-2 mx-6">
              <Text className="text-red-600 text-center">{error}</Text>
            </View>
          )}

          <Text
            className={`${!error ? 'mt-20 text-[19px]' : 'mt-[42px] text-[19px] px-6'}`}
          >
            Already have an account?
          </Text>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text className="mt-2 text-orange text-[19px]">Login</Text>
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#04D9B2"
              className="p-4 mt-4"
            />
          ) : (
            <TouchableOpacity
              onPress={handleRegisterPress}
              className="bg-green w-[300px] rounded-lg mt-4"
            >
              <Text className="text-white text-center p-4 text-[19px]">
                Register
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
