import { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { DateTime } from 'luxon';

import { useUserContext } from '../contexts/userContext';
import { useTripsContext } from '../contexts/tripsContext';
import { useCurrencyContext } from '../contexts/currencyContext';
import { updateTrip } from '../api/api';
import DropdownCurrency from './DropdownCurrency';

export default function EditTripScreen({ navigation }) {
  const { setUser } = useUserContext();
  const { dispatch, pinnedTrip, setPinnedTrip } = useTripsContext();
  const { baseCurrency, setBaseCurrency, convertCurrency } =
    useCurrencyContext();

  const [tripName, setTripName] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setTripName(pinnedTrip?.name || '');
      setBaseCurrency(pinnedTrip?.currency || baseCurrency);
      setBudget(pinnedTrip?.budget?.toString() || '');
      setStartDate(pinnedTrip ? new Date(pinnedTrip.start) : null);
      setEndDate(pinnedTrip ? new Date(pinnedTrip.end) : null);
      setError('');
      setLoading('');
      setStartDatePickerVisibility(false);
      setEndDatePickerVisibility(false);
    }, [pinnedTrip]),
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  const tripData = {
    name: tripName,
    currency: baseCurrency,
    budget: parseFloat(budget) || 0,
    start: startDate,
    end: endDate,
  };

  let editedTrip = { ...pinnedTrip, ...tripData };
  const editTrip = async () => {
    if (pinnedTrip && editedTrip.currency !== pinnedTrip.currency) {
      editedTrip.expenses = editedTrip.expenses.map(expense =>
        expense.currency === editedTrip.currency
          ? { ...expense, convertedAmount: null }
          : {
              ...expense,
              convertedAmount: convertCurrency(
                expense.value,
                expense.currency,
                editedTrip.currency,
              ),
            },
      );
    }
    setLoading(true);
    const res = await updateTrip(editedTrip);
    setLoading(false);
    if (res.data) {
      editedTrip = res.data;
      dispatch({
        type: 'UPDATE_TRIP',
        payload: editedTrip,
      });
      setUser(user => {
        const newUser = { ...user };
        newUser.selectedTrip = editedTrip;
        setPinnedTrip(newUser);
        return newUser;
      });
      setPinnedTrip(editedTrip);
      setSuccess('Trip successfully updated!');
    } else {
      setError(res);
    }
  };

  const handleUpdatePress = async () => {
    setError('');
    setSuccess('');
    if (isNaN(budget) || budget === null) {
      setError(
        'Budget must be a valid number (use "." as the decimal separator)',
      );
      return;
    }
    if (startDate && endDate && endDate < startDate) {
      setError('End date cannot be before start date');
      return;
    }
    await editTrip();
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleStartDateConfirm = date => {
    setStartDate(date);
    setStartDatePickerVisibility(false);
  };

  const handleEndDateConfirm = date => {
    setEndDate(date);
    setEndDatePickerVisibility(false);
  };

  const handleCurrencyChange = value => {
    setBaseCurrency(value);
  };

  const tripLength =
    endDate && startDate
      ? Math.floor(
          parseInt(
            DateTime.fromJSDate(endDate)
              .diff(DateTime.fromJSDate(startDate), 'days')
              .toObject().days + 1,
          ),
        )
      : '__';

  return (
    <ScrollView>
      <TouchableOpacity
        className="mt-20 mb-5 rounded-full w-[50px] h-[50px] bg-orange justify-center items-center ml-4"
        onPress={handleGoBack}
      >
        <MaterialIcons name="keyboard-backspace" size={34} color="white" />
      </TouchableOpacity>
      <View className="mt-5 justify-start items-left">
        <Text className="text-3xl ml-4 mb-3 text-[#00B0A3] font-bold items-start">
          Edit trip
        </Text>
      </View>
      <View className="flex-1 items-center">
        <View className="w-[380px] mt-4 bg-lightGray rounded-md flex flex-row justify-start items-center pl-[10px]">
          <MaterialIcons name="edit" size={27} color="#333" />
          <TextInput
            onChangeText={text => setTripName(text)}
            placeholder="Name"
            placeholderTextColor="#333"
            className={`py-3 pl-2 text-[18px]`}
            value={tripName}
          />
        </View>
        <View className="mt-3">
          <DropdownCurrency
            selectedCurrency={baseCurrency}
            onChange={handleCurrencyChange}
            value={baseCurrency}
          />
        </View>
        <View className="w-[380px] mt-3 bg-lightGray rounded-md flex flex-row justify-start items-center pl-2">
          <MaterialCommunityIcons
            name="piggy-bank-outline"
            size={27}
            color="#333"
          />
          <TextInput
            onChangeText={text => setBudget(text)}
            placeholder="Budget (optional)"
            placeholderTextColor="#333"
            keyboardType="numeric"
            value={budget != '0' ? budget.toString() : ''}
            className={`py-3 pl-2 text-[18px]`}
          />
        </View>

        <View className="mt-10">
          <TouchableOpacity
            onPress={() => {
              setStartDatePickerVisibility(true);
            }}
            className="bg-lightGray rounded-md flex flex-row justify-between items-center pl-2 pr-3 w-[380px]"
          >
            <DateTimePickerModal
              isVisible={isStartDatePickerVisible}
              mode="date"
              onConfirm={handleStartDateConfirm}
              onCancel={() => setStartDatePickerVisibility(false)}
            />
            <View className="flex flex-row items-center">
              <MaterialCommunityIcons
                name="calendar-range"
                size={29}
                color="#333"
              />
              {startDate ? (
                <>
                  <Text className="pl-2">Start</Text>
                  <Text className="py-3 pl-2 text-[18px]">
                    {startDate.toDateString()}
                  </Text>
                </>
              ) : (
                <Text className="py-3 pl-2 text-[18px] text-[#333]">
                  Start date
                </Text>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setEndDatePickerVisibility(true);
            }}
            className="bg-lightGray rounded-md flex flex-row justify-between items-center pl-2 pr-3 mt-3 w-[380px]"
          >
            <DateTimePickerModal
              isVisible={isEndDatePickerVisible}
              mode="date"
              onConfirm={handleEndDateConfirm}
              onCancel={hideEndDatePicker}
            />
            <View className="flex flex-row items-center">
              <MaterialCommunityIcons
                name="calendar-range"
                size={29}
                color="#333"
              />
              {endDate ? (
                <>
                  <Text className="pl-[14px]">End</Text>
                  <Text className="py-3 pl-2 text-[18px]">
                    {endDate.toDateString()}
                  </Text>
                </>
              ) : (
                <Text className="py-3 pl-2 text-[18px] text-[#333]">
                  End date
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center mt-3 w-[380px] p-3 bg-lightGray rounded-md">
          <MaterialCommunityIcons
            name="information-outline"
            size={26}
            color="#00B0A3"
          />
          <Text className="ml-2 text-lg text-green font-medium">
            The trip length is {tripLength} {tripLength > 1 ? 'days' : 'day'}
          </Text>
        </View>

        {error && (
          <View className="mt-3 mx-6">
            <Text className="text-red-600 text-center">{error}</Text>
          </View>
        )}

        {success && (
          <View className="mt-3 mx-6">
            <Text className="text-green font-medium text-center">
              {success}
            </Text>
          </View>
        )}

        <View className="mt-7">
          {loading ? (
            <ActivityIndicator size="large" color="#04D9B2" className=" p-4 " />
          ) : (
            <TouchableOpacity
              onPress={handleUpdatePress}
              className={`${!error && !success ? 'bg-green text-lg w-[180px] rounded-lg mt-3' : 'bg-green text-lg w-[180px] rounded-lg'}`}
            >
              <Text className="text-white text-lg text-center p-4">Update</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
