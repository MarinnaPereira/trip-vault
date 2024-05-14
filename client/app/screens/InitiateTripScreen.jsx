import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
// import TabNavigation from "../navigations/TabNavigation";
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import DropdownCurrency from './DropdownCurrency';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTripsContext } from '../contexts/tripsContext';
import { useUserContext } from '../contexts/userContext';
import { addTrip, updateTrip } from '../api/api';
import { ScrollView } from 'react-native-gesture-handler';

export default function InitiateTripScreen() {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const { dispatch, trips } = useTripsContext();
  const { user, setUser } = useUserContext();

  const tripData = {
    name: 'hardcoded trip4',
    start: '2024-11-01',
    end: '2024-12-15',
    currency: 'USD',
    budget: 3000,
    // _id: '663a0e28a24385e123c99223', //for updating only
  };

  // *testing creating trip
  useEffect(() => {
    const createTrip = async () => {
      try {
        const newTrip = await addTrip(tripData);
        dispatch({
          type: 'ADD_TRIP',
          payload: newTrip,
        });
        setUser({ ...user, selectedTrip: newTrip._id });
      } catch (error) {
        console.error('Error creating trip:', error);
      }
    };

    createTrip();
  }, []);

  // *testing updating trip
  // useEffect(() => {
  //   const editTrip = async () => {
  //     try {
  //       const editedTrip = await updateTrip(tripData);
  //       dispatch({
  //         type: 'UPDATE_TRIP',
  //         payload: editedTrip,
  //       });
  //     } catch (error) {
  //       console.error('Error updating trip:', error);
  //     }
  //   };

  //   editTrip();
  // }, []);

  useEffect(() => {
    console.log('Updated trips', trips); // Logging updated trips
  }, [trips]); // Logging trips when it changes

  useEffect(() => {
    console.log('User', user);
  }, [user]);

  const handleEnterName = () => {
    navigation.navigate('MyTrips', { screen: 'MyTripsScreen' });
  };

  const handleGoBack = () => {
    navigation.navigate('UnlockFirstTrip', { screen: 'UnlockFirstTripScreen' });
  };

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleStartDateConfirm = date => {
    setStartDate(date);
    setStartDatePickerVisibility(false);
  };

  const handleEndDateConfirm = date => {
    setEndDate(date);
    setEndDatePickerVisibility(false);
  };

  const handleNameChange = name => {
    // I do not know how to handle that part
    console.log('Entered name:', name);
  };

  const handleBudgetChange = amount => {
    setBudget(amount);
  };

  return (
    <ScrollView>
      <View className="mt-10">
        <TouchableOpacity onPress={handleGoBack}>
          <Image
            source={require('../../assets/images/singleArrow.png')}
            className="ml-5 mt-6 w-20 h-20"
          />
        </TouchableOpacity>
      </View>
      <View className="mt-5 justify-start items-left">
        <Text className="text-3xl ml-8 mb-7 text-[#00b0a3] font-bold items-start">
          Initiate a trip
        </Text>
      </View>

      <View className="flex-1 items-center">
        <View className="mt-4">
          <TextInput
            onChangeText={handleNameChange}
            placeholder="Enter a name"
            className="w-[380px] text-lg p-3 text-[#999] bg-lightGray rounded-md"
          />
        </View>

        <View className="mt-2">
          <DropdownCurrency />
        </View>

        <View className="mt-6 text bg-lightGray rounded-md">
          <TextInput
            onChangeText={handleBudgetChange} // handle changes to the budget
            placeholder="Enter budget amount (optional)"
            keyboardType="numeric" // this is the keyboard
            className="w-[380] p-3 text-lg text-[#999] rounded-md"
          />
        </View>

        <View className="mt-16">
          <TouchableOpacity
            onPress={(onPress = () => setStartDatePickerVisibility(true))}
            className="bg-lightGray rounded-md"
          >
            <Text className="w-[380px] text-lg pt-3 pl-3 pb-2 text-[#999]">
              Select test start date
            </Text>
            {startDate && (
              <Text className="pl-3 pb-3 text-lg text-green font-extrabold">
                {startDate.toDateString()}
              </Text>
            )}
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="date"
            onConfirm={handleStartDateConfirm}
            onCancel={() => setStartDatePickerVisibility(false)}
          />
        </View>

        <View className="mt-2 ">
          <TouchableOpacity
            onPress={() => setEndDatePickerVisibility(true)}
            className="bg-lightGray rounded-md"
          >
            <Text className="w-[380px] text-lg pt-3 pl-3 pb-2 text-[#999]">
              Select end date
            </Text>
            {endDate && (
              <Text className="pl-3 pb-3 text-lg  text-green font-extrabold">
                {endDate.toDateString()}
              </Text>
            )}
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="date"
            onConfirm={handleEndDateConfirm}
            onCancel={hideEndDatePicker}
          />
        </View>

        <View className="flex-row items-center mt-2 w-[380px] p-3 bg-lightGray rounded-md">
          <MaterialCommunityIcons
            name="information-outline"
            size={20}
            color="#00b0a3"
          />
          <Text className="ml-2 text-lg text-green font-extrabold">
            The trip length is{' '}
            {endDate && startDate
              ? `${Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)} days`
              : '__ days'}
          </Text>
        </View>

        <View className="mt-8">
          <TouchableOpacity
            // onPress={ }
            className="bg-green text-lg w-[180px] rounded-lg mt-4"
          >
            <Text className="text-white text-lg text-center p-4">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
