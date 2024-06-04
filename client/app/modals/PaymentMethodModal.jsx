import { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import {
  FontAwesome6,
  MaterialCommunityIcons,
  Octicons,
  MaterialIcons,
} from '@expo/vector-icons';

import OtherPaymentModal from './OtherPaymentModal';

const PaymentMethodModal = ({
  modalVisible,
  closeModal,
  handlePaymentMethod,
}) => {
  const [isOtherPaymentModalVisible, setIsOtherPaymentModalVisible] =
    useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const toggleOtherPaymentModal = () => {
    setIsOtherPaymentModalVisible(!isOtherPaymentModalVisible);
  };

  const handleOtherPaymentSave = otherPaymentValue => {
    handlePress(otherPaymentValue);
  };

  const handlePress = text => {
    setSelectedMethod(text);
    handlePaymentMethod(text);
    closeModal();
  };

  const handleOtherMethod = () => {
    toggleOtherPaymentModal();
  };

  return (
    <>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            paddingBottom: 50,
          }}
        >
          <View className="bg-white rounded-md">
            <TouchableOpacity onPress={() => handlePress('Cash')}>
              <View className="w-[380px] flex flex-row justify-start items-center pl-3">
                <MaterialCommunityIcons
                  name="cash-multiple"
                  size={28}
                  color="black"
                />
                <Text className="py-3 pl-2 text-[19px]">Cash</Text>
              </View>
            </TouchableOpacity>
            <View className="h-px bg-gray" />
            <TouchableOpacity onPress={() => handlePress('Credit Card')}>
              <View className="w-[380px] flex flex-row justify-start items-center pl-3">
                <FontAwesome6 name="credit-card" size={24} color="black" />
                <Text className="py-3 pl-2 text-[19px]">Credit Card</Text>
              </View>
            </TouchableOpacity>
            <View className="h-px bg-gray" />
            <TouchableOpacity onPress={() => handlePress('Debit Card')}>
              <View className="w-[380px] flex flex-row justify-start items-center pl-3">
                <Octicons name="credit-card" size={28} color="black" />
                <Text className="py-3 pl-2 text-[19px]">Debit Card</Text>
              </View>
            </TouchableOpacity>
            <View className="h-px bg-gray" />
            <TouchableOpacity onPress={handleOtherMethod}>
              <View className="w-[380px] flex flex-row justify-start items-center pl-3">
                <MaterialIcons name="edit" size={28} color="black" />
                <Text className="py-3 pl-2 text-[19px]">
                  Other Payment Method
                </Text>
              </View>
            </TouchableOpacity>
            <View className="h-px bg-gray" />
            <TouchableOpacity onPress={closeModal}>
              <View className="w-[380px] flex flex-row justify-center items-center">
                <Text className="py-3 text-[19px] text-red-500">Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <OtherPaymentModal
        modalVisible={isOtherPaymentModalVisible}
        closeModal={toggleOtherPaymentModal}
        onSave={handleOtherPaymentSave}
      />
    </>
  );
};

export default PaymentMethodModal;
