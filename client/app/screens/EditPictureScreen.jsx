import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import PaymentMethodModal from '../modals/PaymentMethodModal';

export default function EditPictureScreen({ navigation }) {
  const [isPaymentMethodModalVisible, setIsPaymentMethodModalVisible] =
    useState(false);

  const togglePaymentModal = () => {
    setIsPaymentMethodModalVisible(!isPaymentMethodModalVisible);
  };

  const handleChangePicturePress = () => {
    navigation.navigate('Picture', { screen: 'PictureScreen' });
  };

  return (
    <>
      <View className="mt-16 flex flex-row justify-between">
        <TouchableOpacity
        //   onPress={handleGoBack}
        >
          <Image
            source={require('../../assets/images/singleArrow.png')}
            className="ml-5 w-20 h-20"
          />
        </TouchableOpacity>
      </View>

      <View className="flex-1">
        <View className="flex flex-row justify-between mx-10 mt-5">
          <Text className=" text-3xl font-semibold">Transportation</Text>
          <TouchableOpacity></TouchableOpacity>
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

          <TextInput
            className="w-[380px] mt-8 bg-lightGray rounded-md p-3 text-[19px]"
            placeholder="Description"
            placeholderTextColor="black"
          ></TextInput>
          <View />

          <View className="mt-4">
            <TouchableOpacity className=" bg-lightGray rounded-md">
              <View className="w-[380px] flex flex-row justify-start items-center pl-3">
                <MaterialIcons name="calendar-month" size={30} color="black" />
                <Text className="py-3 pl-2 text-[19px]">17/04/2024</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="mt-4 w-[380px]">
            <TouchableOpacity
              onPress={togglePaymentModal}
              className=" bg-lightGray rounded-md"
            >
              <View className="flex flex-row justify-start items-center pl-3">
                <FontAwesome6 name="credit-card" size={24} color="black" />
                <Text className="py-3 pl-2 text-[19px]">Credit Card</Text>
              </View>
            </TouchableOpacity>
          </View>
          <PaymentMethodModal
            modalVisible={isPaymentMethodModalVisible}
            closeModal={togglePaymentModal}
          />

          <View className="mt-4">
            <TouchableOpacity
              onPress={handleChangePicturePress}
              className=" bg-lightGray rounded-md"
            >
              <View className="w-[380px] flex flex-row justify-start items-center pl-3">
                <Entypo name="camera" size={24} color="black" />
                <Text className="py-3 pl-2 text-[19px]">Change Picture</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="flex-1 items-center mt-4">
            <Image className="w-[250px] h-[250px] bg-lightGray" />
          </View>

          <View className="items-center mt-[270px]">
            <TouchableOpacity
              //   onPress={handleSavePress}
              className="bg-green w-[180px] rounded-lg"
            >
              <Text className="text-white text-center p-4 text-[19px]">
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
