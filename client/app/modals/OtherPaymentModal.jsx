import { Modal, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export default function OtherPaymentModal({
  modalVisible,
  closeModal,
  onSave,
}) {
  const [otherPayment, setOtherPayment] = useState('');

  const handleSave = () => {
    onSave(otherPayment);
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
      >
        <View className="bg-white rounded-md w-[380px]">
          <View className="flex flex-row justify-between">
            <TouchableOpacity onPress={handleCancel}>
              <View className="m-4">
                <Text className="px-2 py-1 text-[19px] text-red-500">
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <View className="bg-green rounded-md m-4">
                <Text className="px-3 py-1 text-[19px] text-white">Save</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <View className="w-[380px] flex flex-row justify-start items-center pl-5">
              <MaterialIcons name="edit" size={24} color="black" />
              <Text className="p-3 pl-1 text-[19px]">Enter Payment Method</Text>
            </View>
            <View className="flex items-center mb-4 justify-center">
              <TextInput
                className="w-[340px] bg-lightGray rounded-md p-5 text-[19px]"
                onChangeText={text => setOtherPayment(text)}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
