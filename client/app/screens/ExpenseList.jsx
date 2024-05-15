import React from 'react';
import { SectionList, Text, View, Image } from 'react-native';
import categories from '../../assets/categories';

const findCategoryImage = categoryName => {
  const category = categories.find(cat => cat.name === categoryName);
  return category
    ? category.image
    : categories.find(cat => cat.name === 'Others').image;
};

const ExpenseList = ({ expenses }) => {
  const prepareSections = expenses => {
    const grouped = expenses.reduce((acc, expense) => {
      const date = expense.dates[0]; // Assuming dates[0] is the date to group by
      if (!acc[date]) acc[date] = { title: date, data: [] };
      acc[date].data.push(expense);
      return acc;
    }, {});

    // Convert object to array and sort sections by date
    return Object.keys(grouped)
      .sort()
      .map(date => grouped[date]);
  };

  const sections = prepareSections(expenses || []);

  const renderItem = ({ item }) => (
    <View className="mt-3 mb-6 bg-lightGray rounded-md">
      <View className="flex-row justify-between w-[380px] p-3 items-center">
        <Image
          source={findCategoryImage(item.categoryName)}
          className="w-[60px] h-[60px] m-2 rounded-xl"
        />
        <View className="flex-1 justify-center">
          <View className="flex flex-row justify-between">
            <Text className="text-[19px] font-semibold">
              {item.categoryName}
            </Text>
            <Text className="text-[19px]  font-semibold mr-3">
              {item.currency + ' '}
              {item.value.toFixed(2)}
            </Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="text-[15px]">{item.description}</Text>

            <Text className="text-[15px] mr-3">
              {item.currency + ' '}
              {item.value.toFixed(2)}
            </Text>
            {/* Placeholder for converted amount */}
          </View>
        </View>
      </View>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View className="flex-row justify-between px-3">
      <Text className="text-left text-lg">
        {new Date(title).toLocaleDateString()}
      </Text>
      <Text className="text-right text-lg">Total amount of the day</Text>
    </View>
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item._id + index}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
  );
};

export default ExpenseList;
