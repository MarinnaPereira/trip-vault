import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function UnlockFirstTripScreen({ navigation }) {
  const handleUnlockFirstTrip = () => {
    navigation.navigate('InitiateTrip');
  };

  return (
    <View className="flex-1 mt-[180px] items-center">
      <Text className="text-3xl text-[#00b0a3] font-bold">
        Unlock Your First Trip
      </Text>
      <TouchableOpacity
        className="mt-5 rounded-full w-[50px] h-[50px] bg-orange justify-center items-center"
        onPress={handleUnlockFirstTrip}
      >
        <MaterialIcons name="add" size={34} color="white" />
      </TouchableOpacity>

      <Image
        source={require('./../../assets/images/Logo-background.png')}
        className="w-[530px] h-[530px] absolute bottom-0 -left-12 opacity-50"
      />
    </View>
  );
}
