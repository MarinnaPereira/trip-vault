import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import categories from '../../assets/categories';
import { useState } from 'react';
import { useTripsContext } from '../contexts/tripsContext';

export default function Category({ navigation }) {
  const [expense, setExpense] = useState('null');
  const { pinnedTrip } = useTripsContext();

  const handleCategoryPress = category => {
    navigation.navigate('NewExpense', {
      categoryName: category.name,
      categoryImage: category.image,
    });
  };

  const handleGoBack = () => {
    if (pinnedTrip.expenses.length !== 0) {
      navigation.navigate('PinnedTrip', { screen: 'TripNameScreen' });
    } else {
      navigation.navigate('TrackFirstExpenseScreen', {
        screen: 'TrackFirstExpenseScreen',
      });
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategoryPress(item)} className="m-2">
      <Image
        source={item.image}
        className="w-[105px] h-[105px] mt-2 rounded-2xl"
      />
      <Text className="text-[13px] text-center font-semibold">{item.name}</Text>
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
        <Text className="text-3xl font-semibold">Pick a category</Text>
        <View className="mt-3">
          <FlatList
            data={categories}
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
