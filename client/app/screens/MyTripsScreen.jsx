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
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useTripsContext } from '../contexts/tripsContext';
import { useUserContext } from '../contexts/userContext';
import { updateUser } from '../api/api';
import SearchBar from './SearchBar';
import avatars from '../../assets/avatars';

export default function MyTripsScreen({ navigation }) {
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [error, setError] = useState('');
  const flatListRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const { trips, pinnedTrip, setPinnedTrip } = useTripsContext();
  const { user, setUser } = useUserContext();

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
      flatListRef.current?.scrollToOffset({ animated: false, offset: 0 }); // Scroll to top when screen gains focus
      // return () => resetFilteredTrips(trips);
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
      if (res.status === 200) {
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
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust offset as needed
    >
      <FlatList
        ref={flatListRef}
        data={filteredTrips}
        keyExtractor={item => item._id}
        ListHeaderComponent={
          <>
            <View className="flex-1 items-end mt-[61px] mr-[20px]">
              <Image source={avatarImage} className="w-10 h-10 rounded-xl" />
            </View>
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
                    >
                      <View className={`p-3 rounded-md bg-lightGray relative`}>
                        {pinnedTrip && pinnedTrip._id === item._id && (
                          <View className="transform scale-x-[-1] absolute top-4 -top-2  right-4 -right-2 ">
                            <AntDesign
                              name="pushpin"
                              size={27}
                              color={'#00b0a3'}
                            />
                            {/* <Image
                            source={require('../../assets/images/pinned-map.png')}
                            style={{ width: 40, height: 40 }}
                          /> */}
                          </View>
                        )}
                        <Text
                          className={`w-[360px] px-1 text-lg relative ${pinnedTrip && pinnedTrip._id === item._id ? 'text-[#00b0a3] font-bold' : 'text-black font-semibold'}`}
                        >
                          {capitalizeFirstLetter(item.name)}
                        </Text>
                        <Text
                          className={`w-[360px] pl-1 text-lg ${pinnedTrip && pinnedTrip._id === item._id ? 'text-black font-semibold' : 'text-black'}`}
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
      <View style={{ position: 'absolute', bottom: 0, right: 8 }}>
        <TouchableOpacity onPress={handleAddTrip}>
          <Image
            source={require('../../assets/images/plus.png')}
            style={{ width: 80, height: 80 }}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
