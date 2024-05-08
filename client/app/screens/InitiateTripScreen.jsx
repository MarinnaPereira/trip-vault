import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import TabNavigation from "../navigations/TabNavigation";
import { useNavigation } from '@react-navigation/native';
import DropdownCurrency from './DropdownCurrency';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTripsContext } from '../contexts/tripsContext';
import { useUserContext } from '../contexts/userContext';
import { addTrip, updateTrip } from '../api/api';

export default function InitiateTripScreen() {
  const navigation = useNavigation();
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [budget, setBudget] = useState(null);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const { dispatch, trips } = useTripsContext();
  const { user, setUser } = useUserContext();

  const tripData = {
    name: tripName,
    start: startDate,
    end: endDate,
    currency: 'ABC',
    budget,
    // _id: '663a0e28a24385e123c99223', //for updating only
  };

  // *testing creating trip
  let newTrip;
  const createTrip = async () => {
    try {
      newTrip = await addTrip(tripData);
      dispatch({
        type: 'ADD_TRIP',
        payload: newTrip,
      });
    } catch (error) {
      console.error('Error creating trip:', error);
    }
    return newTrip;
  };

  const handleSavePress = async () => {
    const newTrip = await createTrip();
    if (newTrip) {
      setUser({ ...user, selectedTrip: newTrip._id });
    }
  };

  // useEffect(() => {
  //   const createTrip = async () => {
  //     try {
  //       const newTrip = await addTrip(tripData);
  //       dispatch({
  //         type: 'ADD_TRIP',
  //         payload: newTrip,
  //       });
  //       setUser({ ...user, selectedTrip: newTrip._id });
  //     } catch (error) {
  //       console.error('Error creating trip:', error);
  //     }
  //   };

  //   createTrip();
  // }, []);

  // *testing updating trip
  // useEffect(() => {
  //   const editTrip = async () => {
  //     try {
  //       const editedTrip = await updateTrip(tripData);
  //       dispatch({
  //         type: 'UPDATE_TRIP',
  //         payload: editedTrip,
  //       });
  //     } catch (error) {
  //       console.error('Error updating trip:', error);
  //     }
  //   };

  //   editTrip();
  // }, []);

  useEffect(() => {
    console.log('Updated trips', trips); // Logging updated trips
  }, [trips]); // Logging trips when it changes

  useEffect(() => {
    console.log('User', user);
  }, [user]);

  const handleGoBack = () => {
    navigation.navigate('UnlockFirstTrip', { screen: 'UnlockFirstTripScreen' });
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
          <DropdownCurrency />
          <Text></Text>
        </View>
        <View className="mt-4 bg-lightGray rounder-md">
          <TextInput
            onChangeText={text => {
              setBudget(text);
            }} // handle changes to the budget
            placeholder="Enter budget amount (optional)"
            keyboardType="numeric" // this is the keyboard
            style={{ width: 380, padding: 12, fontSize: 18, color: '#999' }}
          />
        </View>
        <View className="mt-16">
          <TouchableOpacity
            onPress={(onPress = () => setStartDatePickerVisibility(true))}
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
              <Text className="pl-3 pb-3 text-lg  text-green font-extrabold">
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
            The trip length is{' '}
            {endDate && startDate
              ? `${Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)} days`
              : '__ days'}
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
