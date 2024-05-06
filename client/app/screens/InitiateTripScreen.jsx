
import { View, Text, Image, TouchableOpacity, Button } from "react-native";
// import TabNavigation from "../navigations/TabNavigation";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DropdownCurrency from "./DropdownCurrency";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function InitiateTripScreen() {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

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

  const handleStartDateConfirm = (date) => {
    setStartDate(date);
    hideStartDatePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleEndDateConfirm = (date) => {
    setEndDate(date);
    hideEndDatePicker();
  };
  return (
    <>
      <View className="mt-10">
        <TouchableOpacity onPress={handleGoBack}>
          <Image
            source={require('../../assets/images/singleArrow.png')}
            className="ml-9 w-12 h-12"
          />
        </TouchableOpacity>
      </View>
      <View className="mt-5 justify-start items-left">
        <Text className="text-xl ml-11 mb-7 font-semibold items-start">
          Initiate a trip
        </Text>
      </View>

      <View className="flex-1 items-center">
        <View className="mt-4">
          <TouchableOpacity
            onPress={handleEnterName}
            className="bg-lightGray rounded-md"
          >
            <Text className="w-[300px] p-3 text-[#999]">Enter a name </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-4">
          <DropdownCurrency />
          <Text></Text>
        </View>

        <View className="mt-4">
          <TouchableOpacity className=" bg-lightGray rounded-md">
            <Text className="w-[300px] p-3 text-[#999]">Budget (optional)</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-16">
          <TouchableOpacity
            onPress={showStartDatePicker}
            className="bg-lightGray rounded-md"
          >
            <Text className="w-[300px] p-3 text-[#999]">Select start date</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="date"
            onConfirm={handleStartDateConfirm}
            onCancel={hideStartDatePicker}
          />
        </View>

        <View className="mt-2">
          <TouchableOpacity
            onPress={showEndDatePicker}
            className="bg-lightGray rounded-md"
          >
            <Text className="w-[300px] p-3 text-[#999]">Select end date</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="date"
            onConfirm={handleEndDateConfirm}
            onCancel={hideEndDatePicker}
          />
        </View>

        <View className="flex-row items-center mt-2 w-[300px] p-3 bg-lightGray rounded-md">
          <MaterialCommunityIcons
            name="information-outline"
            size={16}
            color="#878686"
          />
          <Text className="ml-2 text-[#6d6a6a]">
            The trip length is{" "}
            {endDate && startDate
              ? `${
                  Math.abs(new Date(endDate) - new Date(startDate)) /
                  (1000 * 60 * 60 * 24)
                } days`
              : "__"}{" "}
            days
          </Text>
        </View>

        <View className="mt-8">
          <TouchableOpacity
            // onPress={ }
            className="bg-green w-[150px] rounded-lg mt-4"
          >
            <Text className="text-white text-center p-4">Save</Text>
          </TouchableOpacity>
        </View>

        {/* HERE WE ARE ADDING THE NAVBAR -> TabNavigation */}
      </View>
    </>
  );
}
