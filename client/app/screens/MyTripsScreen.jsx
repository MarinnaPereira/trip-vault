import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useTripsContext } from '../contexts/tripsContext';
import { useUserContext } from '../contexts/userContext';
import { updateUser } from '../api/api';
import SearchBar from './SearchBar';

export default function MyTripsScreen({ navigation }) {
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [error, setError] = useState('');

  const { trips, setPinnedTrip } = useTripsContext();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    setFilteredTrips(trips);
  }, [trips]);

  // useEffect(() => {
  //   if (user && user.selectedTrip) {
  //     setPinnedTrip(user.selectedTrip);
  //     if (
  //       navigation.getState().routes[navigation.getState().index].name !==
  //       'MyTrips'
  //     ) {
  //       handleNavigation();
  //     }
  //   }
  // }, [user]);

  const handleTripPress = async item => {
    setError('');
    if (user) {
      const res = await updateUser({
        ...user,
        selectedTrip: item._id,
      });

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
        data={trips}
        keyExtractor={item => item._id}
        ListHeaderComponent={
          <>
            <View className="mt-24 justify-start items-left">
              <Text className="text-3xl ml-4 mb-7 text-[#00b0a3] font-bold items-start">
                My Trips
              </Text>
              {error && (
                <View className="text-red-600 mx-6">
                  <Text className="text-red-600 text-center">{error}</Text>
                </View>
              )}
            </View>
            <View className=" flex-1 items-center">
              <View>
                <SearchBar trips={trips} setFilteredTrips={setFilteredTrips} />

                {filteredTrips.map(item => (
                  <TouchableOpacity
                    onPress={() => handleTripPress(item)}
                    key={item._id}
                    style={{ marginTop: 10 }}
                  >
                    <View className="p-3 bg-lightGray rounded-md ">
                      <Text className="w-[360px] px-1 text-lg text-black font-bold relative">
                        {capitalizeFirstLetter(item.name)}
                      </Text>
                      <Text className="w-[360px] pl-1 text-lg text-black">
                        {new Date(item.start).toLocaleDateString()} –{' '}
                        {new Date(item.end).toLocaleDateString()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
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
