import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import DropdownCurrency from './DropdownCurrency';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function InitiateTripScreen() {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const handleStartDateConfirm = date => {
    setStartDate(date);
    setStartDatePickerVisibility(false);
  };

  const handleEndDateConfirm = date => {
    setEndDate(date);
    setEndDatePickerVisibility(false);
  };

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

  return (
    <>
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
          <TouchableOpacity
            onPress={handleEnterName}
            className="bg-lightGray rounded-md"
          >
            <Text className="w-[380px] text-lg p-3 text-[#999]">
              Enter a name{' '}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-4">
          <DropdownCurrency />
          <Text></Text>
        </View>

        <View className="mt-4">
          <TouchableOpacity className=" bg-lightGray rounded-md">
            <Text className="w-[380px] p-3 text-lg text-[#999]">
              Budget (optional)
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-16">
          <TouchableOpacity
            onPress={(onPress = () => setStartDatePickerVisibility(true))}
            className="bg-lightGray rounded-md"
          >
            <Text className="w-[380px] text-lg pt-3 pl-3 pb-2 text-[#999]">
              Select start date
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

        <View className="mt-2">
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
    </>
  );
}
