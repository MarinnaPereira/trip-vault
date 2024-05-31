import { useState, useEffect, useCallback } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { useUserContext } from '../contexts/userContext';
import { useTripsContext } from '../contexts/tripsContext';
import { loginUser, getAllTrips } from '../api/api';

export default function LoginScreen({ navigation }) {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser, setIsLogged } = useUserContext();
  const { dispatch, pinnedTrip, setPinnedTrip } = useTripsContext();

  useEffect(() => {
    (async () => {
      if (pinnedTrip) await fetchUserTrips();
    })();
  }, [pinnedTrip]);

  const fetchUser = async () => {
    setError('');
    setLoading(true);
    const userData = {
      credential,
      password,
    };
    const res = await loginUser(userData);
    setLoading(false);
    if (res.user && res.token) {
      await AsyncStorage.setItem('token', res.token);
      setUser(res.user);
      setIsLogged(true);
      res.user.selectedTrip
        ? setPinnedTrip(res.user.selectedTrip)
        : handleNavigation();
    } else {
      setError(res);
    }
  };

  let allTrips;
  const fetchUserTrips = async () => {
    try {
      // setLoading(true);
      allTrips = await getAllTrips();
      // setLoading(false);
      console.log(allTrips);
      if (allTrips) {
        dispatch({
          type: 'ADD_ALL_TRIPS',
          payload: allTrips,
        });
      }
      handleNavigation();
    } catch (error) {
      console.log('Error fetching trips:', error);
    }
  };

  const handleNavigation = async () => {
    if (!allTrips) {
      navigation.navigate('Shared', {
        screen: 'UnlockFirstTrip',
      });
    } else if (pinnedTrip.expenses.length === 0) {
      navigation.navigate('Shared', {
        screen: 'TrackFirstExpense',
      });
    } else {
      navigation.navigate('Main', {
        screen: 'PinnedTripStack',
        params: {
          screen: 'TripNameScreen',
        },
      });
    }
  };

  const handleLoginPress = async () => {
    await fetchUser();
  };

  const handleRegisterPress = () => {
    navigation.navigate('Shared', {
      screen: 'Avatar',
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useFocusEffect(
    useCallback(() => {
      // This will run when the screen is focused
      setCredential('');
      setPassword('');
      setShowPassword(false);
      setError('');
    }, []),
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust this value as needed
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center">
          <Image
            source={require('./../../assets/images/TripVault-LogoBig.png')}
            className="w-[220px] h-[220px] mt-[70px] ml-3"
          />
          <Text className="mt-12 text-3xl font-semibold text-[#00B0A3]">
            Login
          </Text>
          <TextInput
            className="w-[380px] mt-6 bg-lightGray rounded-md p-3 text-[19px]"
            placeholder="username / email"
            placeholderTextColor="#999"
            value={credential}
            onChangeText={text => setCredential(text)}
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
            <View className="mt-2 mx-6">
              <Text className="text-red-500 text-center">{error}</Text>
            </View>
          )}
          <Text
            className={`${!error ? 'mt-36 text-[19px]' : 'mt-[117px] text-[19px] px-6'}`}
          >
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={handleRegisterPress}>
            <Text className="mt-2 text-orange text-[19px]">Register</Text>
          </TouchableOpacity>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#04D9B2"
              className=" p-4 mt-4"
            />
          ) : (
            <TouchableOpacity
              onPress={handleLoginPress}
              className="bg-green w-[300px] rounded-lg mt-4"
            >
              <Text className="text-white text-center p-4 text-[19px]">
                Login
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
