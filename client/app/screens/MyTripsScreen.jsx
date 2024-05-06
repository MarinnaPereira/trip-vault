import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import SearchBar from "./SearchBar";

const handleGoBack = () => {
  navigation.navigate("UnlockFirstTrip", { screen: "UnlockFirstTripScreen" });
};

export default function MyTripsScreen({ totalSpent }) {
  return (
    <ScrollView>
      <View className="mt-10">
        <TouchableOpacity onPress={handleGoBack}>
          <Image
            source={require("../../assets/images/singleArrow.png")}
            className="ml-4 w-12 h-12"
          />
        </TouchableOpacity>
      </View>

      <View className="mt-5 justify-start items-left">
        <Text className="text-xl ml-5 mb-4 font-semibold items-start">
          My Trips
        </Text>
      </View>

      <View className=" flex-1 items-center">
        <View>
          <View className="flex-row justify-between">
            <Text>Selected trip</Text>
          </View>

          <View className="mt-2 flex-row">
            <View className="p-3 bg-lightGray rounded-md">
              <Text className="w-[350px] p-1 text-black font-bold relative ">
                Name of the previous trip
              </Text>
              <Text className="w-[300px] pl-1 text-black ">
                dd/mm/yyyy - dd/mm/yyyy
              </Text>
            </View>
            <Text>{totalSpent}</Text>
          </View>
          <View className="flex-row justify-between mt-8 ml-2">
            <Text>All trips</Text>
          </View>
          <SearchBar />

          <View className="mt-2 flex-row">
            <View className="p-3 bg-lightGray rounded-md ">
              <Text className="w-[350px] p-1 text-black font-bold relative ">
                Name of the previous trip
              </Text>
              <Text className="w-[300px] pl-1 text-black ">
                dd/mm/yyyy - dd/mm/yyyy
              </Text>
            </View>
            <Text>{totalSpent}</Text>
          </View>
          <View className="mt-2 flex-row">
            <View className="p-3 bg-lightGray rounded-md">
              <Text className="w-[350px] p-1 text-black font-bold relative ">
                Name of the previous trip
              </Text>
              <Text className="w-[300px] pl-1 text-black ">
                dd/mm/yyyy - dd/mm/yyyy
              </Text>
            </View>
            <Text>{totalSpent}</Text>
          </View>
          <View className="mt-2 flex-row">
            <View className="p-3 mb-32 bg-lightGray rounded-md">
              <Text className="w-[350px] p-1 text-black font-bold relative ">
                Name of the previous trip
              </Text>
              <Text className="w-[300px] pl-1 text-black ">
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
            source={require("../../assets/images/plus.png")}
            className="mr-5 w-20 h-20"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
