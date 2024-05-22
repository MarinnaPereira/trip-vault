import { useState, useEffect } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from '../contexts/userContext';
import { useTripsContext } from '../contexts/tripsContext';
import { loginUser, getAllTrips } from '../api/api';

export default function LoginScreen({ navigation }) {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { user, setUser, setIsLogged } = useUserContext();
  const { trips, dispatch, pinnedTrip, setPinnedTrip } = useTripsContext();

  useEffect(() => {
    (async () => {
      if (pinnedTrip) await fetchUserTrips();
    })();
  }, [pinnedTrip]);

  const fetchUser = async () => {
    try {
      const userData = {
        credential,
        password,
      };
      const data = await loginUser(userData);
      console.log('data', data);
      await AsyncStorage.setItem('token', data.token);
      setUser(data.user);
      console.log('user', user);
      setIsLogged(true);
      data.user.selectedTrip
        ? setPinnedTrip(data.user.selectedTrip)
        : handleNavigation();
    } catch (err) {
      console.error(err);
    }
  };

  let allTrips;
  const fetchUserTrips = async () => {
    try {
      allTrips = await getAllTrips();
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

  // useEffect(() => {
  //   console.log('Updated trips', trips); // Logging updated trips
  // }, [trips]); // Logging trips when it changes

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
            className="w-[180px] h-[180px] mt-24"
          />
          <Text className="mt-12 text-3xl font-semibold">Login</Text>
          <Text className="text-[19px]">Login to your account</Text>
          <TextInput
            className="w-[380px] mt-8 bg-lightGray rounded-md p-3 text-[19px]"
            placeholder="username / email"
            placeholderTextColor="#999"
            onChangeText={text => setCredential(text)}
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

          <Text className="mt-36 text-[19px]">Don't have an account?</Text>
          <TouchableOpacity onPress={handleRegisterPress}>
            <Text className="mt-2 text-orange text-[19px]">Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLoginPress}
            className="bg-green w-[300px] rounded-lg mt-4"
          >
            <Text className="text-white text-center p-4 text-[19px]">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
