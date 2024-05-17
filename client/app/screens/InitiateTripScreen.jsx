import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DateTime } from 'luxon';
import { useTripsContext } from '../contexts/tripsContext';
import { useUserContext } from '../contexts/userContext';
import { useCurrencyContext } from '../contexts/currencyContext';
import { addTrip } from '../api/api';
import DropdownCurrency from './DropdownCurrency';

export default function InitiateTripScreen() {
  const navigation = useNavigation();
  const [tripName, setTripName] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const { user, setUser } = useUserContext();
  const { dispatch, trips, pinnedTrip, setPinnedTrip } = useTripsContext();
  const { baseCurrency, setBaseCurrency, availableCurrencies } =
    useCurrencyContext();

  const tripData = {
    name: tripName,
    start: startDate,
    end: endDate,
    currency: baseCurrency,
    budget: parseFloat(budget) || 0,
  };

  console.log(tripData);
  let newTrip;
  const createTrip = async () => {
    try {
      newTrip = await addTrip(tripData);
      dispatch({
        type: 'ADD_TRIP',
        payload: newTrip,
      });
      setUser({ ...user, selectedTrip: newTrip });
      setPinnedTrip(newTrip);
    } catch (error) {
      console.error('Error creating trip:', error);
    }
  };

  const handleSavePress = async () => {
    await createTrip();
    navigation.navigate('TrackFirstExpenseScreen', {
      screen: 'TrackFirstExpenseScreen',
    });
  };

  const handleGoBack = () => {
    trips.length > 0
      ? navigation.navigate('MyTrips', { screen: 'MyTripsScreen' })
      : navigation.navigate('UnlockFirstTrip', {
          screen: 'UnlockFirstTripScreen',
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

  useEffect(() => {
    console.log('Updated trips', trips);
  }, [trips]);

  useEffect(() => {
    console.log('User', user);
  }, [user]);

  const tripLength =
    endDate && startDate
      ? DateTime.fromJSDate(endDate)
          .diff(DateTime.fromJSDate(startDate), 'days')
          .toObject().days + 1
      : '__';

  return (
    <ScrollView>
      <View className="mt-10">
        <TouchableOpacity onPress={handleGoBack}>
          <Image
            source={require('../../assets/images/singleArrow.png')}
            className="ml-5 mt-6 w-20 h-20"
          />
        </TouchableOpacity>
      </View>
      <View className="mt-5 justify-start items-left">
        <Text className="text-3xl ml-8 mb-7 text-[#00B0A3] font-bold items-start">
          Initiate a trip
        </Text>
      </View>
      <View className="flex-1 items-center">
        <View className="mt-4">
          <TextInput
            onChangeText={text => setTripName(text)}
            placeholder="Enter a name"
            className="w-[380px] text-lg p-3 bg-lightGray rounded-md"
          />
        </View>
        <View className="mt-4">
          <DropdownCurrency
            selectedCurrency={baseCurrency}
            onChange={handleCurrencyChange}
          />
        </View>
        <View className="mt-8 bg-lightGray rounded-md">
          <TextInput
            onChangeText={text => setBudget(text)}
            placeholder="Enter budget (optional)"
            keyboardType="numeric"
            value={budget}
            className="w-[380px] text-lg p-3 bg-lightGray rounded-md"
          />
        </View>
        <View className="mt-16">
          <TouchableOpacity
            onPress={() => setStartDatePickerVisibility(true)}
            className="bg-lightGray rounded-md"
          >
            <Text className="w-[380px] text-lg pt-3 pl-3 pb-2 text-[#999]">
              Select start date
            </Text>
            {startDate && (
              <Text className="pl-3 pb-3 text-lg text-green font-extrabold">
                {startDate.toDateString()}
              </Text>
            )}
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="date"
            onConfirm={handleStartDateConfirm}
            onCancel={() => setStartDatePickerVisibility(false)}
          />
        </View>
        <View className="mt-2">
          <TouchableOpacity
            onPress={() => setEndDatePickerVisibility(true)}
            className="bg-lightGray rounded-md"
          >
            <Text className="w-[380px] text-lg pt-3 pl-3 pb-2 text-[#999]">
              Select end date
            </Text>
            {endDate && (
              <Text className="pl-3 pb-3 text-lg text-green font-extrabold">
                {endDate.toDateString()}
              </Text>
            )}
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="date"
            onConfirm={handleEndDateConfirm}
            onCancel={hideEndDatePicker}
          />
        </View>
        <View className="flex-row items-center mt-2 w-[380px] p-3 bg-lightGray rounded-md">
          <MaterialCommunityIcons
            name="information-outline"
            size={20}
            color="#00B0A3"
          />
          <Text className="ml-2 text-lg text-green font-extrabold">
            The trip length is {tripLength} days
          </Text>
        </View>
        <View className="mt-8">
          <TouchableOpacity
            onPress={handleSavePress}
            className="bg-green text-lg w-[180px] rounded-lg mt-4"
          >
            <Text className="text-white text-lg text-center p-4">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
