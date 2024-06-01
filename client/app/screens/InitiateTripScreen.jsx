import { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { DateTime } from 'luxon';
import { useFocusEffect } from '@react-navigation/native';

import { useTripsContext } from '../contexts/tripsContext';
import { useUserContext } from '../contexts/userContext';
import { useCurrencyContext } from '../contexts/currencyContext';
import DropdownCurrency from './DropdownCurrency';
import { addTrip } from '../api/api';

export default function InitiateTripScreen({ navigation }) {
  const [tripName, setTripName] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState('');
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useUserContext();
  const { trips, dispatch, setPinnedTrip } = useTripsContext();
  const { baseCurrency, setBaseCurrency } = useCurrencyContext();

  const tripData = {
    name: tripName,
    currency: baseCurrency,
    budget: parseFloat(budget) || 0,
    start: startDate,
    end: endDate,
  };

  let newTrip;
  const createTrip = async () => {
    setLoading(true);
    const res = await addTrip(tripData);
    setLoading(false);
    if (res.status === 201) {
      newTrip = res.data;
      dispatch({
        type: 'ADD_TRIP',
        payload: newTrip,
      });
      setUser({ ...user, selectedTrip: newTrip });
      setPinnedTrip(newTrip);
      navigation.navigate('TrackFirstExpense');
    } else {
      setError(res);
    }
  };

  const handleSavePress = async () => {
    setError('');
    if (budget && !Number(budget)) {
      setError('Budget must be a number (use "." as the decimal separator)');
      return;
    }
    await createTrip();
  };

  const handleGoBack = () => {
    trips.length > 0
      ? navigation.navigate('Main', {
          screen: 'MyTripsStack',
          params: {
            screen: 'MyTrips',
          },
        })
      : navigation.navigate('Shared', {
          screen: 'UnlockFirstTrip',
        });
  };

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
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
    console.log(value);
    setBaseCurrency(value);
  };

  const tripLength =
    endDate && startDate
      ? DateTime.fromJSDate(endDate)
          .diff(DateTime.fromJSDate(startDate), 'days')
          .toObject().days + 1
      : '__';

  useFocusEffect(
    useCallback(() => {
      // Reset state when screen is focused
      setTripName('');
      setBudget('');
      setStartDate(null);
      setEndDate(null);
      setError('');
      setStartDatePickerVisibility(false);
      setEndDatePickerVisibility(false);
    }, []),
  );

  return (
    <ScrollView>
      <TouchableOpacity
        className="mt-20 mb-5 rounded-full w-[50px] h-[50px] bg-orange justify-center items-center ml-4"
        onPress={handleGoBack}
      >
        <MaterialIcons name="keyboard-backspace" size={34} color="white" />
      </TouchableOpacity>
      <View className="mt-5 justify-start items-left">
        <Text className="text-3xl ml-4 mb-7 text-[#00B0A3] font-bold items-start">
          Initiate a trip
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
          {/* <MaterialCommunityIcons
            name="account-cash-outline"
            size={27}
            color="#333"
          /> */}
          <TextInput
            onChangeText={text => setBudget(text)}
            placeholder="Budget (optional)"
            placeholderTextColor="#333"
            keyboardType="numeric"
            value={budget}
            className={`py-3 pl-2 text-[18px]`}
          />
        </View>

        {/* Start Date */}
        <View className="mt-14">
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

          {/* End Date */}
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
            size={20}
            color="#00B0A3"
          />
          <Text className="ml-2 text-lg text-green font-medium">
            The trip length is {tripLength} {tripLength > 1 ? 'days' : 'day'}
          </Text>
        </View>
        {error && (
          <View className="text-red-600 mt-2 mx-6">
            <Text className="text-red-600 text-center">{error}</Text>
          </View>
        )}

        <View className="mt-10">
          {loading ? (
            <ActivityIndicator size="large" color="#04D9B2" className=" p-4 " />
          ) : (
            <TouchableOpacity
              onPress={handleSavePress}
              className={`${!error ? 'bg-green text-lg w-[180px] rounded-lg mt-4' : 'bg-green text-lg w-[180px] rounded-lg'}`}
            >
              <Text className="text-white text-lg text-center p-4">Save</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
