import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';

export default function UploadPictureModal({
  modalVisible,
  closeModal,
  handleGallery,
  handleCamera,
}) {
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
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          paddingBottom: 50,
        }}
      >
        <View className="bg-white rounded-md">
          <TouchableOpacity
            onPress={() => {
              handleCamera();
              closeModal();
            }}
          >
            <View className="w-[380px] flex flex-row justify-start items-center pl-3">
              <Entypo name="camera" size={24} color="black" />
              <Text className="py-3 pl-2 text-[19px]">Take Picture</Text>
            </View>
          </TouchableOpacity>
          <View className="h-px bg-gray" />

          <TouchableOpacity
            onPress={() => {
              handleGallery();
              closeModal();
            }}
          >
            <View className="w-[380px] flex flex-row justify-start items-center pl-3">
              <FontAwesome name="picture-o" size={24} color="black" />
              <Text className="py-3 pl-2 text-[19px]">Choose From Gallery</Text>
            </View>
          </TouchableOpacity>

          <View className="h-px bg-gray" />
          <TouchableOpacity onPress={closeModal}>
            <View className="w-[380px] flex flex-row justify-center items-center pl-3">
              <Text className="py-3 pl-2 text-[19px] text-red-500">Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
