import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function UnlockFirstTripScreen({ navigation }) {
  const handleUnlockFirstTrip = () => {
    navigation.navigate('InitiateTrip');
  };

  return (
    <View className="flex-1 mt-[180px] items-center">
      <Text className="text-3xl text-[#00b0a3] font-bold">
        Unlock Your First Trip
      </Text>
      <TouchableOpacity onPress={handleUnlockFirstTrip}>
        <Image
          source={require('../../assets/images/plus.png')}
          className="w-[88px] h-[88px]"
        />
      </TouchableOpacity>

      <Image
        source={require('./../../assets/images/LogoCroped.png')}
        className="w-[530px] h-[365px] absolute bottom-0"
      />
    </View>
  );
}
