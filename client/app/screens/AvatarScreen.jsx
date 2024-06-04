import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useUserContext } from '../contexts/userContext';
import avatars from '../../assets/avatars';

export default function Avatar({ navigation }) {
  const { user } = useUserContext();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAvatarPress = avatarName => {
    if (user) {
      const selectedAvatar = avatars.find(avatar => avatar.name === avatarName);
      navigation.navigate('MyAccountStack', {
        screen: 'MyAccount',
        params: { newAvatar: selectedAvatar },
      });
    } else {
      navigation.navigate('Auth', {
        screen: 'Register',
        params: { avatar: avatarName },
      });
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleAvatarPress(item.name)}
      className="m-2"
    >
      <Image
        source={item.image}
        className="w-[100px] h-[100px] mt-6 rounded-2xl"
      />
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity
        className="mt-24 mb-8 rounded-full w-[50px] h-[50px] bg-orange justify-center items-center ml-7"
        onPress={handleGoBack}
      >
        <MaterialIcons name="keyboard-backspace" size={34} color="white" />
      </TouchableOpacity>

      <View className="items-center">
        <Text className="text-3xl font-semibold text-[#00B0A3]">
          {user ? 'Change avatar' : 'Pick your avatar'}
        </Text>
        <View className="mt-4">
          <FlatList
            data={avatars}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            contentContainerClassName="flex-wrap justify-center items-center"
          />
        </View>
      </View>
    </>
  );
}
