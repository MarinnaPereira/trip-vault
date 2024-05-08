import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';

export default function Avatar({ navigation }) {
  const [avatar, setAvatar] = useState(null);

  const handleAvatarPress = () => {
    setAvatar('iceberg');
    navigation.navigate('Register', { avatar: avatar });
  };

  return (
    <>
      <View className="mt-10">
        <TouchableOpacity
        // Function handleGoBack needs to be implemented
        // onPress={handleGoBack}
        >
          <Image
            source={require('../../assets/images/singleArrow.png')}
            className="ml-5 mt-6 w-20 h-20"
          />
        </TouchableOpacity>
      </View>

      <View className="items-center mt-5">
        <Text className="text-3xl font-semibold">
          Start by picking your avatar
        </Text>
        <View className="flex flex-row w-20 h-20 rounded-xl gap-4 justify-center mt-5">
          <TouchableOpacity onPress={handleAvatarPress}>
            <Image
              source={require('./../../assets/images/iceberg.png')}
              className="w-[105px] h-[105px] mt-6 rounded-xl"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/river.png')}
              className="w-[105px] h-[105px] mt-6 rounded-xl"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/city.png')}
              className="w-[105px] h-[105px] mt-6 rounded-xl"
            />
          </TouchableOpacity>
        </View>

        <View className="flex flex-row w-20 h-20 rounded-xl gap-4 justify-center mt-10">
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/beach.png')}
              className="w-[105px] h-[105px] mt-6 rounded-xl"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/riceField.png')}
              className="w-[105px] h-[105px] mt-6 rounded-xl"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/mountain.png')}
              className="w-[105px] h-[105px] mt-6 rounded-xl"
            />
          </TouchableOpacity>
        </View>

        <View className="flex flex-row w-20 h-20 rounded-xl gap-4 justify-center mt-10">
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/wave.png')}
              className="w-[105px] h-[105px] mt-6 rounded-xl"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/highway.png')}
              className="w-[105px] h-[105px] mt-6 rounded-xl"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/dune.png')}
              className="w-[105px] h-[105px] mt-6 rounded-xl"
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
