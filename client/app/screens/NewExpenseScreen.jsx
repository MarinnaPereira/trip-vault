import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
// import { useState } from "react";

export default function NewExpenseScreen({ navigation }) {
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const handleGoBack = () => {
    navigation.navigate('Category', { screen: 'CategoryScreen' });
  };

  const handleSavePress = () => {
    navigation.navigate('TripName', { screen: 'TripNameScreen' });
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

      <View className="flex-1">
        <View className="flex flex-row justify-between mx-10 mt-5">
          <Text className=" text-3xl font-semibold">Transportation</Text>
          <TouchableOpacity>
            <FontAwesome6 name="trash-can" size={32} color="red" />
          </TouchableOpacity>
        </View>

        <View className="items-center">
          <View className="mt-4 mb-6 bg-lightGray rounded-md">
            <View className="w-[380px] flex flex-row justify-between items-center">
              <Image
                // source={(source = { selectedCategory })}
                source={require('./../../assets/images/plane.png')}
                className="w-[60px] h-[60px] m-2 rounded-xl"
              />
              <Text className="text-3xl">100.00</Text>
              <View className="flex pr-2">
                <Text className="bg-lightGreen text-white text-xl p-2 rounded-md">
                  EUR
                </Text>
              </View>
            </View>
          </View>
          <View />

          {/* !icon into placeholder */}
          <View style="relative">
            {/* <MaterialIcons
            name="edit"
            size={24}
            color="#999"
            className="absolute"
          /> */}
            <TextInput
              className="w-[380px] mt-8 bg-lightGray rounded-md p-3 text-[19px]"
              placeholder="Description"
              placeholderTextColor="black"
            ></TextInput>
            <View />

            <View className="mt-4">
              <TouchableOpacity className=" bg-lightGray rounded-md">
                <View className="w-[380px] flex flex-row justify-start items-center pl-3">
                  <MaterialIcons
                    name="calendar-month"
                    size={30}
                    color="black"
                  />
                  <Text className="py-3 pl-1 text-[19px]">Date</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View className="mt-4">
              <TouchableOpacity className=" bg-lightGray rounded-md">
                <View className="w-[380px] flex flex-row justify-start items-center pl-3">
                  <MaterialCommunityIcons
                    name="credit-card-plus-outline"
                    size={30}
                    color="black"
                  />
                  <Text className="py-3 pl-1 text-[19px]">Payment Method</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View className="mt-4">
              <TouchableOpacity className=" bg-lightGray rounded-md">
                <View className="w-[300px] flex flex-row justify-start items-center pl-3">
                  <FontAwesome name="cloud-upload" size={24} color="black" />
                  <Text className="py-3 pl-1 text-[19px]">Upload Picture</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View className="items-center mt-48">
              <TouchableOpacity
                onPress={handleSavePress}
                className="bg-green w-[180px] rounded-lg"
              >
                <Text className="text-white text-center p-4 text-[19px]">
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
