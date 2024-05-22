import { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useUserContext } from '../contexts/userContext';
import { updateUser } from '../api/api';

export default function EditUsernameModal({ modalVisible, closeModal }) {
  const { user, setUser } = useUserContext();
  const currentUsername = user.username;
  console.log(typeof currentUsername);
  const [newUsername, setNewUsername] = useState('');

  let editedUser;

  const editUser = async editedUser => {
    try {
      console.log(editedUser);
      const updatedUser = await updateUser(editedUser);
      console.log(updatedUser);
      setUser(updatedUser);
      closeModal();
    } catch (error) {
      console.error('Error updating User:', error);
    }
  };

  const handleSave = () => {
    if (newUsername && newUsername !== currentUsername) {
      editedUser = { ...user, username: newUsername };
      editUser(editedUser);
    }
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
            <TouchableOpacity onPress={closeModal}>
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
          </View>
        </View>
      </View>
    </Modal>
  );
}
