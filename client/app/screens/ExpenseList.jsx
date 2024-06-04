import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { DateTime } from 'luxon';

import { useTripsContext } from '../contexts/tripsContext';
import { useCurrencyContext } from '../contexts/currencyContext';
import categories from '../../assets/categories';

const findCategoryImage = categoryName => {
  const category = categories.find(cat => cat.name === categoryName);
  return category
    ? category.image
    : categories.find(cat => cat.name === 'Others').image;
};

const ExpenseList = ({ navigation, tripCurrencySymbol }) => {
  const { getCurrencySymbol } = useCurrencyContext();
  const { pinnedTrip } = useTripsContext();
  const [expenses, setExpenses] = useState([]);

  useFocusEffect(
    useCallback(() => {
      if (pinnedTrip) {
        setExpenses(pinnedTrip.expenses || []);
      }
    }, [pinnedTrip]),
  );

  const prepareExpenses = expenses => {
    console.log('exp', expenses);
    const spreadExpenses = expenses.flatMap(expense => {
      if (expense.dates.length > 1) {
        const startDate = DateTime.fromISO(expense.dates[0]);
        const endDate = DateTime.fromISO(expense.dates[1]);
        const numberOfDays = endDate.diff(startDate, 'days').days + 1;

        // Spread the expense value over the number of days
        const spreadExpenseValue = (expense.value / numberOfDays).toFixed(2);

        // Generate array of spread expenses with updated dates
        return Array.from({ length: numberOfDays }, (_, index) => {
          const newDate = startDate.plus({ days: index }).toISO();
          const convertedAmount = expense.convertedAmount
            ? (expense.convertedAmount / numberOfDays).toFixed(2)
            : null;
          return {
            ...expense,
            dates: [newDate],
            value: spreadExpenseValue,
            convertedAmount: convertedAmount,
          };
        });
      } else {
        return { ...expense, value: Number(expense.value).toFixed(2) };
      }
    });
    console.log('spread', spreadExpenses);
    return spreadExpenses;
  };

  const spreadExpenses = prepareExpenses(expenses);

  const prepareSections = spreadExpenses => {
    const grouped = spreadExpenses.reduce((acc, expense) => {
      const date = DateTime.fromISO(expense.dates[0]).toISODate(); // Normalize date to ISO string
      if (!acc[date]) acc[date] = { title: date, data: [] };
      acc[date].data.push(expense);
      return acc;
    }, {});

    return Object.keys(grouped)
      .sort((a, b) => new Date(b) - new Date(a))
      .map(date => grouped[date]);
  };

  const sections = prepareSections(spreadExpenses || []);

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleExpensePress = item => {
    navigation.navigate('ExistentExpense', { item });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleExpensePress(item)}
        className="mt-2 mb-1 bg-lightGray rounded-md"
      >
        <View className="flex-row justify-between w-[380px] p-1 items-center">
          <Image
            source={findCategoryImage(item.categoryName)}
            className="w-[60px] h-[60px] m-2 rounded-xl"
          />
          <View className="flex-1 justify-center gap-1">
            <View className="flex flex-row justify-between">
              <Text className="text-[19px] font-medium">
                {item.categoryName}
              </Text>
              <Text className="text-[19px] font-medium mr-3">
                {item.convertedAmount
                  ? `${item.convertedAmount} ${tripCurrencySymbol}`
                  : `${Number(item.value || 0).toFixed(2)} ${getCurrencySymbol(item.currency)}`}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              {item.description && item.description !== 'null' ? (
                <Text className="text-[15px]">
                  {capitalizeFirstLetter(item.description)}
                </Text>
              ) : (
                <Text></Text>
              )}
              <Text className="text-[15px] mr-3">
                {item.convertedAmount
                  ? `${Number(item.value || 0).toFixed(2)} ${getCurrencySymbol(item.currency)}`
                  : ''}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const isDateToday = dateString => {
    const date = DateTime.fromISO(dateString);
    const today = DateTime.local().startOf('day');
    return date.hasSame(today, 'day');
  };

  const formatDate = title => {
    const date = DateTime.fromISO(title).toLocaleString(DateTime.DATE_SHORT);
    return isDateToday(title) ? 'Today' : date;
  };

  const totalAmountOfSection = data => {
    const total = data.reduce((acc, expense) => {
      const spent =
        parseFloat(expense.convertedAmount) || parseFloat(expense.value);
      return acc + (isNaN(spent) ? 0 : spent);
    }, 0);
    return Number(total).toFixed(2);
  };

  const renderSectionHeader = ({ section: { title, data } }) => (
    <View className="flex-row justify-between px-3 mt-2 mb-1">
      <Text className="text-left text-lg">{formatDate(title)}</Text>
      <Text className="text-right text-lg">
        {totalAmountOfSection(data) + ' ' + tripCurrencySymbol}
      </Text>
    </View>
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => `${item._id}-${item.dates[0]}`}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      automaticallyAdjustContentInsets={false}
    />
  );
};

export default ExpenseList;
