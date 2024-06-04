import { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useUserContext } from '../contexts/userContext';
import { updateUser } from '../api/api';

export default function EditUsernameModal({ modalVisible, closeModal }) {
  const { user, setUser } = useUserContext();

  const [newUsername, setNewUsername] = useState('');
  const [modalError, setModalError] = useState('');

  const currentUsername = user.username;

  let editedUser;

  const editUser = async editedUser => {
    setModalError('');
    const res = await updateUser(editedUser);
    if (res.data) {
      setUser(res.data);
      setModalError('');
      closeModal();
    } else {
      setModalError(res);
    }
  };

  const handleSave = () => {
    if (newUsername && newUsername !== currentUsername) {
      editedUser = { ...user, username: newUsername };
      editUser(editedUser);
    } else {
      closeModal();
    }
  };

  const handleCancel = () => {
    setModalError('');
    closeModal();
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="none"
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
              <Text className="p-3 pl-1 text-[19px]">Edit Username</Text>
            </View>
            <View className="flex items-center mb-4 justify-center">
              <TextInput
                className="w-[340px] bg-lightGray rounded-md p-5 text-[19px]"
                value={newUsername}
                onChangeText={text => setNewUsername(text)}
              />
            </View>
            {modalError && (
              <View className="mt-1 mb-6 mx-6">
                <Text className="text-red-600 text-center">{modalError}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
