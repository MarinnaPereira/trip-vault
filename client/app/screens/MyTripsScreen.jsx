import { useEffect, useState } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Entypo, FontAwesome6 } from '@expo/vector-icons';
import SearchBar from './SearchBar';

import { getAllTrips } from '../api/api';
import { useTripsContext } from '../contexts/tripsContext';
import { useUserContext } from '../contexts/userContext';

const handleGoBack = () => {
  navigation.navigate('UnlockFirstTrip', { screen: 'UnlockFirstTripScreen' });
};

export default function MyTripsScreen({ totalSpent }) {
  const { dispatch, trips } = useTripsContext();
  const { user, setUser } = useUserContext(); // for updating when the user touches/selects a specific trip

  const { selectedTrip } = user;

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const allTrips = await getAllTrips();
        dispatch({
          type: 'ADD_ALL_TRIPS',
          payload: allTrips,
        });
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, [dispatch]); // Adding dispatch also as a dependency ?

  useEffect(() => {
    console.log('Updated trips', trips); // Logging updated trips
  }, [trips]); // Logging trips when it changes

  // now map trips to display them

  return (
    <ScrollView>
      <View className="mt-24 justify-start items-left">
        <Text className="text-3xl ml-8 mb-7 text-[#00b0a3] font-bold items-start">
          My Trips
        </Text>
      </View>

      <View className=" flex-1 items-center">
        <View>
          <View className="flex-row justify-between">
            <Text className="text-lg text-[#f24f13] font-bold">
              Selected trip
            </Text>
          </View>

          <View className="mt-2 flex-row">
            <View className="p-3 bg-lightGray rounded-md">
              <Text className="w-[360px] p-1 text-lg text-black font-bold relative ">
                Name of the previous trip
              </Text>
              <Text className="w-[360px] pl-1 text-lg text-black ">
                dd/mm/yyyy - dd/mm/yyyy
              </Text>
            </View>
            <Text>{totalSpent}</Text>
          </View>
          <View className="flex-row justify-between mt-8 ml-2">
            <Text className="text-lg text-[#f24f13] font-bold">All trips</Text>
          </View>
          <SearchBar />

          <View className="mt-2 flex-row">
            <View className="p-3 bg-lightGray rounded-md ">
              <Text className="w-[360px] p-1 text-lg text-black font-bold relative ">
                Name of the previous trip
              </Text>
              <Text className="w-[360px] pl-1 text-lg text-black ">
                dd/mm/yyyy - dd/mm/yyyy
              </Text>
            </View>
            <Text>{totalSpent}</Text>
          </View>
          <View className="mt-2 flex-row">
            <View className="p-3 bg-lightGray rounded-md">
              <Text className="w-[360px] p-1 text-lg text-black font-bold relative ">
                Name of the previous trip
              </Text>
              <Text className="w-[360px] pl-1 text-lg text-black ">
                dd/mm/yyyy - dd/mm/yyyy
              </Text>
            </View>
            <Text>{totalSpent}</Text>
          </View>
          <View className="mt-2 flex-row">
            <View className="p-3  bg-lightGray rounded-md">
              <Text className="w-[360px] p-1 text-lg text-black font-bold relative ">
                Name of the previous trip
              </Text>
              <Text className="w-[360px] text-lg pl-1 text-black ">
                dd/mm/yyyy - dd/mm/yyyy
              </Text>
            </View>
            <Text>{totalSpent}</Text>
          </View>
        </View>
      </View>
      <View className="flex flex-row justify-end">
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/plus.png')}
            className="mr-5 w-28 h-28"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
