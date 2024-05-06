import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Modal, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar2 = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal}>
        <Feather name="search" size={24} color="gray" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View className="flex justify-center items-center h-full bg-opacity-50 bg-black">
          <View className="w-11/12 max-w-[365px] bg-lightGray rounded-lg p-5 ">
            <TouchableOpacity
              onPress={toggleModal}
              className="absolute top-3 right-3"
            >
              <Feather name="search" size={24} color="gray" className="mr-2" />
            </TouchableOpacity>
            <View className="flex-row items-center bg-gray-200 rounded-md px-3 py-2">
              <Feather name="search" size={20} color="gray" className="mr-2" />
              <TextInput
                placeholder="Search trip by name..."
                style={{ flex: 1, height: 40 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SearchBar2;
