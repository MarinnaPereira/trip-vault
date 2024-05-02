import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function MyAccountScreen({ route }) {
  const { username, email } = route.params;

  return (
    <>
      <View className="flex-1 items-center">
        <Image
          source={require("./../../assets/images/beach.png")}
          className="w-[100px] h-[100px] mt-5 rounded-xl"
        />
        <Text className="mt-2">{email}</Text>
        <View />

        <View className="mt-2 justify-start items-start">
          <Text className="text-xl mt-5 font-semibold">My Account</Text>
        </View>

        <View className="mt-4">
          <Text className="text-left">username</Text>
          <TouchableOpacity className="bg-lightGray rounded-md">
            <Text className="w-[300px] p-3 text-[#999]">{username}</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-4">
          <Text className="text-left">password</Text>
          <TouchableOpacity className=" bg-lightGray rounded-md">
            <Text className="w-[300px] p-3 text-[#999]">
              password is displayed here >
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-20">
          <TouchableOpacity
            // onPress={handleLoginPress}
            className="bg-lightGray w-[300px] rounded-lg mt-4"
          >
            <Text className="text-left p-4">Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            // onPress={handleLoginPress}
            className="bg-lightGray w-[300px] rounded-lg mt-4"
          >
            <Text className="text-red-500 text-left p-4">Delete account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
