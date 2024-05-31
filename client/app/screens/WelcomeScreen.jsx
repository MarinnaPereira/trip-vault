import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleRegisterPress = () => {
    navigation.navigate('Shared', {
      screen: 'Avatar',
    });
  };

  return (
    <View className="flex-1 pt-[130px] items-center text-center">
      <Image
        source={require('./../../assets/images/TripVault-LogoBig.png')}
        className=" w-[340px] h-[340px]"
      />
      <TouchableOpacity
        onPress={handleLoginPress}
        className="bg-orange w-[300px] rounded-lg mt-36"
      >
        <Text className="text-white text-center p-4 text-[19px]">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleRegisterPress}
        className="bg-green w-[300px] rounded-lg m-6"
      >
        <Text className="text-white text-center p-4 text-[19px]">Register</Text>
      </TouchableOpacity>
    </View>
  );
}
