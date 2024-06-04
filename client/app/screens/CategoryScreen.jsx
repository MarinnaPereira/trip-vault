import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useTripsContext } from '../contexts/tripsContext';
import categories from '../../assets/categories';

export default function Category({ navigation, route }) {
  const changeCategory = route.params ? route.params.changeCategory : false;

  const handleCategoryPress = category => {
    if (changeCategory === 'true') {
      navigation.navigate('PinnedTripStack', {
        screen: 'ExistentExpense',
        params: {
          newCategoryName: category.name,
          newCategoryImage: category.image,
        },
      });
    } else {
      navigation.navigate('NewExpense', {
        categoryName: category.name,
        categoryImage: category.image,
      });
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
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
      <TouchableOpacity
        className="mt-24 mb-8 rounded-full w-[50px] h-[50px] bg-orange justify-center items-center ml-7"
        onPress={handleGoBack}
      >
        <MaterialIcons name="keyboard-backspace" size={34} color="white" />
      </TouchableOpacity>

      <View className="items-center">
        <Text className="text-3xl font-semibold text-[#00B0A3]">
          {changeCategory === 'true' ? 'Change category' : 'Pick a category'}
        </Text>
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
