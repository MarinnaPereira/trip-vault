import { View, Text, TextInput } from "react-native";
import React from "react";
import TabNavigation from "../navigations/TabNavigation";

export default function TripScreen() {
  return (
    <View className="flex-1">
      <Text className="mt-12 text-xl">Trip</Text>
      <Text>Login to your account</Text>
      <TextInput
        className="w-[300px] mt-8 bg-lightGray rounded-md p-3"
        placeholder="username / email"
        placeholderTextColor="#999"
      ></TextInput>
      <TextInput
        className="w-[300px] mt-4 bg-lightGray rounded-md p-3"
        placeholder="password"
        placeholderTextColor="#999"
      ></TextInput>

      {/* <TabNavigation /> */}
    </View>
  );
}