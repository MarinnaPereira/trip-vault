import React from 'react';
import { Modal, View, Text, Button, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const PaymentMethodModal = ({ modalVisible, closeModal }) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <View className="flex-1 mt-4 bg-white rounded-md">
          <TouchableOpacity>
            <View className="w-[380px] flex flex-row justify-start items-center pl-3">
              <MaterialCommunityIcons
                name="cash-multiple"
                size={28}
                color="black"
              />
              <Text className="py-3 pl-1 text-[19px]">Cash</Text>
            </View>
          </TouchableOpacity>
          <View className="h-px bg-gray" />
          <TouchableOpacity>
            <View className="w-[380px] flex flex-row justify-start items-center pl-3">
              <FontAwesome6 name="credit-card" size={24} color="black" />
              <Text className="py-3 pl-1 text-[19px]">Credit Card</Text>
            </View>
          </TouchableOpacity>
          <View className="h-px bg-gray" />
          <TouchableOpacity>
            <View className="w-[380px] flex flex-row justify-start items-center pl-3">
              <Octicons name="credit-card" size={28} color="black" />
              <Text className="py-3 pl-1 text-[19px]">Debit Card</Text>
            </View>
          </TouchableOpacity>
          <View className="h-px bg-gray" />
          <TouchableOpacity>
            <View className="w-[380px] flex flex-row justify-start items-center pl-3">
              <MaterialIcons name="edit" size={28} color="black" />
              <Text className="py-3 pl-1 text-[19px]">
                Other Payment method
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentMethodModal;
