import { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import { useUserContext } from '../contexts/userContext';
import { useTripsContext } from '../contexts/tripsContext';
import { updateUser } from '../api/api';
import SearchBar from './SearchBar';
import avatars from '../../assets/avatars';

export default function MyTripsScreen({ navigation }) {
  const { user, setUser } = useUserContext();
  const { trips, pinnedTrip, setPinnedTrip } = useTripsContext();

  const [filteredTrips, setFilteredTrips] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  let avatarName;
  if (user) {
    avatarName = user.avatar;
  }

  const findAvatarImage = userAvatar => {
    if (!userAvatar) {
      return avatars.find(avatar => avatar.name === 'Mountain').image;
    }
    const avatar = avatars.find(avatar => avatar.name === userAvatar);
    return avatar
      ? avatar.image
      : avatars.find(avatar => avatar.name === 'Mountain').image;
  };

  let avatarImage;
  if (avatarName) {
    avatarImage = findAvatarImage(avatarName);
  }

  let orderedTrips;

  const resetFilteredTrips = trips => {
    const reversedTrips = [...trips].reverse();
    const notPinnedTrips = reversedTrips.filter(
      trip => trip._id !== (pinnedTrip?._id || ''),
    );
    orderedTrips = pinnedTrip
      ? [pinnedTrip, ...notPinnedTrips]
      : notPinnedTrips;
    setFilteredTrips(orderedTrips);
  };

  useEffect(() => {
    resetFilteredTrips(trips);
  }, [trips, trips.length, pinnedTrip]);

  useFocusEffect(
    useCallback(() => {
      flatListRef.current?.scrollToOffset({ animated: false, offset: 0 });
    }, []),
  );

  const handleTripPress = async item => {
    setError('');
    if (user) {
      setLoading(true);
      const res = await updateUser({
        ...user,
        selectedTrip: item._id,
      });
      setLoading(false);
      if (res.data) {
        const updatedUser = { ...user, selectedTrip: item };
        setUser(updatedUser);
        setPinnedTrip(item);
        handleNavigation();
      } else {
        setError('Error selecting trip');
      }
    } else {
      setError('No user logged in');
      return;
    }
  };

  const handleNavigation = () => {
    navigation.navigate('Main', {
      screen: 'PinnedTripStack',
      params: {
        screen: 'TripNameScreen',
      },
    });
  };

  const handleAddTrip = () => {
    navigation.navigate('Shared', { screen: 'InitiateTrip' });
  };

  const capitalizeFirstLetter = str => {
    if (typeof str === 'string' && str.length > 0) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    return '';
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={filteredTrips}
        keyExtractor={item => item._id}
        ListHeaderComponent={
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('MyAccountStack')}
              className="flex-1 items-end mt-[61px] mr-[20px]"
            >
              <Image source={avatarImage} className="w-10 h-10 rounded-xl" />
            </TouchableOpacity>
            <View className="justify-start items-left">
              <Text className="text-3xl ml-4 mb-4 text-[#00b0a3] font-bold items-start">
                My Trips
              </Text>
              {error && (
                <View className="text-red-600 mx-6">
                  <Text className="text-red-600 text-center">{error}</Text>
                </View>
              )}
            </View>
            <View className="flex-1 items-center">
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="#04D9B2"
                  className="p-4 mt-60"
                />
              ) : (
                <View>
                  <SearchBar
                    trips={trips}
                    setFilteredTrips={setFilteredTrips}
                  />

                  {filteredTrips.map(item => (
                    <TouchableOpacity
                      onPress={() => handleTripPress(item)}
                      key={item._id}
                      style={{ marginTop: 10 }}
                      className="w-[380px] mx-auto"
                    >
                      <View className={`p-3 rounded-md bg-lightGray relative`}>
                        {pinnedTrip && pinnedTrip._id === item._id && (
                          <View className="transform scale-x-[-1] absolute -top-2 -right-2 ">
                            <AntDesign
                              name="pushpin"
                              size={27}
                              color={'#00b0a3'}
                            />
                          </View>
                        )}
                        <Text
                          className={`px-1 text-lg relative ${pinnedTrip && pinnedTrip._id === item._id ? 'text-[#00b0a3] font-bold' : 'text-black font-semibold'}`}
                        >
                          {capitalizeFirstLetter(item.name)}
                        </Text>
                        <Text
                          className={`pl-1 text-lg ${pinnedTrip && pinnedTrip._id === item._id ? 'text-black font-semibold' : 'text-black'}`}
                        >
                          {new Date(item.start).toLocaleDateString()} –{' '}
                          {new Date(item.end).toLocaleDateString()}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}

                  {filteredTrips.length === 0 && (
                    <Text className="font-semibold mt-4 text-center">
                      No results found
                    </Text>
                  )}
                </View>
              )}
            </View>
          </>
        }
      />
      <TouchableOpacity
        className="rounded-full w-[50px] h-[50px] bg-orange justify-center items-center"
        onPress={handleAddTrip}
        style={{ position: 'absolute', bottom: 12.5, right: 25 }}
      >
        <MaterialIcons name="add" size={34} color="white" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
