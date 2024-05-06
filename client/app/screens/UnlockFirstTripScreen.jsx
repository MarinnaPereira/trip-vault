import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
// import { useNavigation } from '@react-navigation/native';
import InitiateTripScreen from './InitiateTripScreen';

export default function UnlockFirstTripScreen({ navigation }) {
  // const navigation = useNavigation();

  const handleUnlockFirstTrip = () => {
    navigation.navigate('InitiateTrip', { screen: 'InitiateTripScreen' });
  };

  return (
    <View className="flex-1 mt-[130px] items-center">
      <Text className="text-3xl">Unlock Your First Trip</Text>
      <TouchableOpacity onPress={handleUnlockFirstTrip}>
        <Image
          source={require('../../assets/images/plus.png')}
          className="w-28 h-28"
        />
      </TouchableOpacity>

      <Image
        source={require('./../../assets/images/LogoCroped.png')}
        className="w-[495px] h-[325px] absolute bottom-0"
      />
    </View>
  );
}
