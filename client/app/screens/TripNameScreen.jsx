import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";

export default function TripNameScreen({ totalSpent }) {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const toggleDeleteConfirmation = () => {
    setDeleteConfirmationVisible(!isDeleteConfirmationVisible);
  };

  const handleDownload = () => {
    toggleMenu();
  };

  const handleEdit = () => {
    toggleMenu();
  };

  const handleDelete = () => {
    toggleMenu();
    toggleDeleteConfirmation();
  };

  return (
    <>
      <View className="absolute top-0 right-0 z-50 mt-10 mr-10">
        <TouchableOpacity onPress={toggleMenu}>
          <Entypo name="dots-three-vertical" size={24} color="darkgrey" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={toggleMenu}
      >
        <View className="absolute top-16 right-4 bg-white rounded-md p-4 shadow">
          <TouchableOpacity onPress={handleDownload} className="p-2">
            <View className="flex-row items-center">
              <Entypo name="download" size={16} color="black" />
              <Text className="ml-2">Download trip</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleEdit} className="p-2">
            <View className="flex-row items-center">
              <Entypo name="edit" size={16} color="black" />
              <Text className="ml-2">Edit trip</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete} className="p-2">
            <View className="flex-row items-center">
              <FontAwesome6 name="trash-can" size={16} color="red" />
              <Text className="ml-3 text-[#FF0000]">Delete trip</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteConfirmationVisible}
        onRequestClose={toggleDeleteConfirmation}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View className="bg-white p-5 rounded-lg">
            <Text className="font-bold mb-4 text-center ">Delete Trip?</Text>
            <Text>Are you sure you want to delete this trip?</Text>
            <View className="flex-row justify-between mt-5">
              <TouchableOpacity
                onPress={toggleDeleteConfirmation}
                className="bg-lightGray p-4 rounded-md"
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                className="bg-red-500 p-4 rounded-md"
              >
                <Text className="text-white">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View className="mt-20 justify-start items-left">
        <Text className="text-xl ml-8 mb-3 font-semibold items-start">
          Trip name
        </Text>
      </View>
      <View className="flex-1 items-center">
        <View>
          <View className="bg-lightGray rounded-md">
            <Text className="w-[350px] p-3 text-[#999]">Total Spent </Text>
            <Text className="ml-auto mr-4 text-xl">€</Text>
          </View>
          <Text>{totalSpent}</Text>
        </View>

        <View className="flex-row justify-between items-center">
          <View className="bg-lightGray rounded-md">
            <Text className="w-[167px] p-3 text-[#999]">Balance</Text>
            <Text className="ml-auto mr-4 text-xl">€</Text>
          </View>

          <View className="bg-lightGray rounded-md ml-4">
            <Text className="w-[167px] p-3 text-[#999]">Daily Average</Text>
            <Text className="ml-auto mr-4 text-xl">€</Text>
          </View>
        </View>
      </View>

      <View className="mt-12 flex-1 items-center">
        <View>
          <View className="flex-row justify-between">
            <Text className="text-left">Today</Text>
            <Text className="text-right">Total amount of the day</Text>
          </View>

          <View className="flex-row">
            <Image
              source={require("../../assets/images/restaurant.png")}
              className="w-12 h-12"
            />

            <View className=" bg-lightGray rounded-md">
              <Text className="w-[300px] p-1 text-black font-bold relative ">
                Description <Text className="absolute right-0">€</Text>
              </Text>

              <Text className="w-[300px] pl-1 text-black ">
                Restaurant <Text className="absolute right-0">$</Text>
              </Text>
            </View>

            <Text>{totalSpent}</Text>
          </View>
        </View>
      </View>

      <View className="flex-1 items-center">
        <View>
          <View className="flex-row justify-between">
            <Text className="text-left">dd/mm/yyyy</Text>
            <Text className="text-right">Total amount of the day</Text>
          </View>

          <View className="flex-row">
            <Image
              source={require("../../assets/images/shopping.png")}
              className="w-12 h-12"
            />

            <View className=" bg-lightGray rounded-md">
              <Text className="w-[300px] p-1 text-black font-bold relative ">
                Description <Text className="absolute right-0">€</Text>
              </Text>

              <Text className="w-[300px] pl-1 text-black ">
                Restaurant <Text className="absolute right-0">$</Text>
              </Text>
            </View>
            <Text>{totalSpent}</Text>
          </View>

          <View className="flex-row mt-2">
            <Image
              source={require("../../assets/images/activities.png")}
              className="w-12 h-12"
            />

            <View className=" bg-lightGray rounded-md">
              <Text className="w-[300px] p-1 text-black font-bold relative ">
                Description <Text className="absolute right-0">€</Text>
              </Text>

              <Text className="w-[300px] pl-1 text-black ">
                Restaurant <Text className="absolute right-0">$</Text>
              </Text>
            </View>

            <Text>{totalSpent}</Text>
          </View>

          <View className="flex-row mt-2">
            <Image
              source={require("../../assets/images/others.png")}
              className="w-12 h-12"
            />

            <View className=" bg-lightGray rounded-md">
              <Text className="w-[300px] p-1 text-black font-bold relative ">
                Description <Text className="absolute right-0">€</Text>
              </Text>

              <Text className="w-[300px] pl-1 text-black ">
                Restaurant <Text className="absolute right-0">$</Text>
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
    </>
  );
}
