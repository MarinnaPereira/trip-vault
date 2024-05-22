import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function TrackFirstExpenseScreen({ navigation }) {
  const handleTackPress = () => {
    navigation.navigate('Category');
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
