import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function MyAccountScreen({ route }) {
  // const { username, email } = route.params;

  return (
    <>
      <TouchableOpacity
        className="bg-orange p-1 rounded-full mt-10 ml-5 w-[45px] h-[45px]"
        // Function handleGoBack needs to be implemented
        // onPress={handleGoBack}
      >
        <Feather name="arrow-left" size={34} color="white" />
      </TouchableOpacity>

      <View className="flex-1 items-center">
        <Image
          source={require('./../../assets/images/beach.png')}
          className="w-[100px] h-[100px] rounded-xl"
        />
        <TouchableOpacity className="bg-lightGray p-2 rounded-full mt-[-25px] ml-[100px]">
          <MaterialIcons name="edit" size={24} color="black" />
        </TouchableOpacity>
        {/* Display the email dynamically. Replace 'example@gmail.com' with the fetched email. */}
        <Text className="mt-2">example@gmail.com</Text>
        <View />
        <View className="mt-2 mr-[150px]">
          <Text className="text-xl mt-5 font-semibold">My Account</Text>
        </View>
        <View className="mt-4">
          <Text className="text-left">username</Text>
          <TouchableOpacity className="bg-lightGray rounded-md">
            {/* Display the username dynamically. Replace 'dci' with the fetched username. */}
            <Text className="w-[300px] p-3 text-[#999]">dci</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-4">
          <Text className="text-left">password</Text>
          <TouchableOpacity className=" bg-lightGray rounded-md">
            {/* Display the password dynamically. Replace '1234!' with the fetched password. */}
            <Text className="w-[300px] p-3 text-[#999]">1234!</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-16">
          <TouchableOpacity
            // Function handleLogoutPress needs to be implemented
            // onPress={handleLogoutPress}
            className="bg-lightGray w-[300px] rounded-lg"
          >
            <Text className="text-left p-4">Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            // Function handleDeleteAccountPress needs to be implemented
            // onPress={handleDeleteAccountPress}
            className="bg-lightGray w-[300px] rounded-lg mt-4"
          >
            <Text className="text-red-500 text-left p-4">Delete account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
