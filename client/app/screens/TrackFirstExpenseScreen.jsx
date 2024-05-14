import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function TrackFirstExpenseScreen({ navigation }) {
  const handleTackPress = () => {
    navigation.navigate('Category', { screen: 'CategoryScreen' });
  };

  return (
    <View className="flex-1 mt-[180px] items-center">
      <Text className="text-3xl text-[#00b0a3] font-bold">
        {' '}
        Track Your First Expense
      </Text>
      <TouchableOpacity onPress={handleTackPress}>
        <Image
          source={require('../../assets/images/plus.png')}
          className="w-28 h-28 mt-8"
        />
      </TouchableOpacity>

      <Image
        source={require('./../../assets/images/LogoCroped.png')}
        className="w-[530px] h-[365px] absolute bottom-0"
      />
    </View>
  );
}
