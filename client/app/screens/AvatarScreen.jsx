import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useUserContext } from '../contexts/userContext';
import avatars from '../../assets/avatars';

export default function Avatar({ navigation }) {
  const { user } = useUserContext();

  const handleAvatarPress = avatarName => {
    if (user) {
      const selectedAvatar = avatars.find(avatar => avatar.name === avatarName);
      navigation.navigate('MyAccount', { newAvatar: selectedAvatar });
    } else {
      navigation.navigate('Register', { avatar: avatarName });
    }
  };

  const handleGoBack = () => {
    if (user) {
      navigation.navigate('MyAccount', { screen: 'MyAccountScreen' });
    } else {
      navigation.navigate('Welcome', { screen: 'WelcomeScreen' });
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
      <View className="mt-10">
        <TouchableOpacity onPress={handleGoBack}>
          <Image
            source={require('../../assets/images/singleArrow.png')}
            className="ml-5 mt-6 w-20 h-20"
          />
        </TouchableOpacity>
      </View>

      <View className="items-center mt-5">
        <Text className="text-3xl font-semibold">
          {user ? 'Change avatar' : 'Start by picking your avatar'}
        </Text>
        <View className="mt-2">
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
