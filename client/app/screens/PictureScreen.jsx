import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';

export default function PictureScreen() {
  return (
    <>
      <View className="mt-16 flex flex-row justify-between">
        <TouchableOpacity
        //   onPress={handleGoBack}
        >
          <Image
            source={require('../../assets/images/singleArrow.png')}
            className="ml-5 w-20 h-20"
          />
        </TouchableOpacity>
        <TouchableOpacity className="mr-7 mt-4">
          <AntDesign name="download" size={42} color="black" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center">
        <Image className="w-[300px] h-[300px] bg-lightGray" />
      </View>

      <View className="items-center">
        <TouchableOpacity
          // onPress={handleSavePress}
          className="bg-green w-[180px] rounded-lg mb-40"
        >
          <Text className="text-white text-center p-4 text-[19px]">Save</Text>
        </TouchableOpacity>

        <View className="pb-12">
          <TouchableOpacity>
            <View className="w-[380px] flex flex-row justify-start items-center pl-3 bg-lightGray rounded-md">
              <Entypo name="camera" size={24} color="black" />
              <Text className="py-3 pl-2 text-[19px]">Take Picture</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View className="w-[380px] flex flex-row justify-start items-center mt-3 pl-3 bg-lightGray rounded-md">
              <FontAwesome name="picture-o" size={24} color="black" />
              <Text className="py-3 pl-2 text-[19px]">Choose From Gallery</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
