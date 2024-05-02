import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";

export default function EditExpenseScreen() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <View className="flex-1">
      <View className="flex flex-row justify-between mx-10 mt-12">
        <Text className=" text-xl font-semibold">Transportation</Text>
        <TouchableOpacity>
          <FontAwesome6 name="trash-can" size={32} color="red" />
        </TouchableOpacity>
      </View>

      <View className="items-center">
        <View className="mt-4 mb-6 bg-lightGray rounded-md">
          <View className="w-[300px] pl-3 flex flex-row justify-between">
            <Image
              source={(source = { selectedCategory })}
              className="w-[60px] h-[60px] m-2 rounded-xl"
            />
            <Text className="text-xl pt-4 pr-5">0.00</Text>
          </View>
        </View>
        <View />

        <View style="relative">
          {/* <MaterialIcons
            name="edit"
            size={24}
            color="#999"
            className="absolute"
          /> */}
          <TextInput
            className="w-[300px] mt-8 bg-lightGray rounded-md p-3"
            placeholder="Description"
            placeholderTextColor="#999"
          ></TextInput>
          <View />

          <View className="mt-4">
            <TouchableOpacity className=" bg-lightGray rounded-md">
              <View className="w-[300px] flex flex-row justify-start items-center pl-3">
                <MaterialIcons name="calendar-month" size={24} color="#999" />
                <Text className="py-3 pl-1 text-[#999]">Date</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="mt-4">
            <TouchableOpacity className=" bg-lightGray rounded-md">
              <View className="w-[300px] flex flex-row justify-start items-center pl-3">
                <MaterialCommunityIcons
                  name="credit-card-plus-outline"
                  size={24}
                  color="#999"
                />
                <Text className="py-3 pl-1 text-[#999]">Payment Method</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="mt-4">
            <TouchableOpacity className=" bg-lightGray rounded-md">
              <View className="w-[300px] flex flex-row justify-start items-center pl-3">
                <FontAwesome name="cloud-upload" size={24} color="#999" />
                <Text className="py-3 pl-1 text-[#999]">Upload Picture</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="items-center mt-24">
            <TouchableOpacity
              // onPress={handleLoginPress}
              className="bg-green w-[180px] rounded-lg"
            >
              <Text className="text-white text-center p-4">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
