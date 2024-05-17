import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Entypo, FontAwesome6 } from '@expo/vector-icons';
import SearchBar from './SearchBar';

import { useTripsContext } from '../contexts/tripsContext';
import { useUserContext } from '../contexts/userContext';

export default function MyTripsScreen({ navigation }) {
  const { trips, pinnedTrip, setPinnedTrip } = useTripsContext();
  const { user, setUser } = useUserContext();

  const [filteredTrips, setFilteredTrips] = useState([]);

  const handleTripPress = item => {
    console.log('Clicked Trip:', item);
    setPinnedTrip(item);
    user.selectedTrip = item; //! update user on backend

    navigation.navigate('Main', {
      screen: 'PinnedTripStack',
      params: {
        screen: 'TripNameScreen',
      },
    });
  };

  const handleAddTrip = () => {
    navigation.navigate('Main', {
      screen: 'PinnedTripStack',
      params: {
        screen: 'InitiateTripScreen',
      },
    });
  };

  return (
    <FlatList
      data={filteredTrips}
      keyExtractor={item => item._id}
      ListHeaderComponent={
        <>
          <View className="mt-24 justify-start items-left">
            <Text className="text-3xl ml-7 mb-7 text-[#00b0a3] font-bold items-start">
              My Trips
            </Text>
          </View>

          <View className=" flex-1 items-center">
            <View>
              <SearchBar trips={trips} setFilteredTrips={setFilteredTrips} />

              {trips.map(item => (
                <TouchableOpacity
                  onPress={() => handleTripPress(item)}
                  key={item._id}
                  style={{ marginTop: 10 }}
                >
                  <View className="p-3 bg-lightGray rounded-md ">
                    <Text className="w-[360px] px-1 text-lg text-black font-bold relative">
                      {item.name}
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
      ListFooterComponent={
        <View className="flex flex-row justify-end">
          <TouchableOpacity onPress={handleAddTrip}>
            <Image
              source={require('../../assets/images/plus.png')}
              className="mr-5 w-28 h-28"
            />
          </TouchableOpacity>
        </View>
      }
    />
  );
}
