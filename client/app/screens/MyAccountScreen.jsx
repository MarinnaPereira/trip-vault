import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export default function MyAccountScreen({ route }) {
  // const { username, email } = route.params;

  return (
    <>
      <View className="mt-28">
        <View className="items-center">
          <Image
            source={require('./../../assets/images/beach.png')}
            className="w-[100px] h-[100px] rounded-xl"
          />
          <TouchableOpacity className="bg-lightGray p-2 rounded-full mt-[-25px] ml-[100px]">
            <MaterialIcons name="edit" size={24} color="black" />
          </TouchableOpacity>
          {/* Display the email dynamically. Replace 'example@gmail.com' with the fetched email. */}
          <Text className="mt-2 text-[19px]">example@gmail.com</Text>
        </View>
        <View />

        <View className="mt-5 ml-8">
          <Text className="text-3xl font-semibold">My Account</Text>
        </View>

        <View className="items-center">
          <View className="mt-4 w-[380px]">
            <Text className="text-left text-[19px]">username</Text>
            <TouchableOpacity className="bg-lightGray rounded-md">
              {/* Display the username dynamically. Replace 'dci' with the fetched username. */}
              <Text className="p-3 text-[#999] text-[19px]">dci</Text>
            </TouchableOpacity>

            <View className="mt-2">
              <Text className="text-left text-[19px]">password</Text>
              <TouchableOpacity className=" bg-lightGray rounded-md">
                {/* Display the password dynamically. Replace '1234!' with the fetched password. */}
                <Text className="w-[300px] p-3 text-[#999] text-[19px]">
                  1234!
                </Text>
              </TouchableOpacity>
            </View>
            <View className="mt-16">
              <TouchableOpacity
                // Function handleLogoutPress needs to be implemented
                // onPress={handleLogoutPress}
                className="bg-lightGray rounded-lg"
              >
                <Text className="text-left text-[19px] p-4">Logout</Text>
              </TouchableOpacity>

              <TouchableOpacity
                // Function handleDeleteAccountPress needs to be implemented
                // onPress={handleDeleteAccountPress}
                className="bg-lightGray rounded-lg mt-4"
              >
                <Text className="text-red-500 text-left text-[19px] p-4">
                  Delete account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
