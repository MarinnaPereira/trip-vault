import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { DateTime } from 'luxon';
import { Entypo, FontAwesome6 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import { useUserContext } from '../contexts/userContext';
import { useTripsContext } from '../contexts/tripsContext';
import { useCurrencyContext } from '../contexts/currencyContext';
import { deleteTrip } from '../api/api';
import ExpenseList from './ExpenseList';

export default function TripNameScreen({ navigation }) {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  const [totalSpent, setTotalSpent] = useState(0);
  const [tripDuration, setTripDuration] = useState(0);
  const [dailyAverage, setDailyAverage] = useState(0);
  const [balance, setBalance] = useState('0.00');
  const [tripCurrencySymbol, setTripCurrencySymbol] = useState('');
  const [isTripOver, setIsTripOver] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tripDeleted, setTripDeleted] = useState(false);

  const {
    trips,
    dispatch,
    pinnedTrip,
    setPinnedTrip,
    calculateTripDuration,
    calculateTotalSpent,
    calculateDailyAverage,
    calculateBalance,
  } = useTripsContext();
  const { user, setUser } = useUserContext();

  const { getCurrencySymbol } = useCurrencyContext();

  useEffect(() => {
    console.log('pinned', pinnedTrip);
    console.log('selected', user.selectedTrip);
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (pinnedTrip) {
        const totalSpent = calculateTotalSpent(pinnedTrip);
        const tripDuration = calculateTripDuration(pinnedTrip);
        const dailyAverage = calculateDailyAverage(totalSpent, tripDuration);
        const balance = pinnedTrip?.budget
          ? calculateBalance(pinnedTrip.budget, totalSpent)
          : '0.00';
        const tripCurrencySymbol = getCurrencySymbol(pinnedTrip?.currency);

        setTotalSpent(totalSpent);
        setTripDuration(tripDuration);
        setDailyAverage(dailyAverage);
        setBalance(balance);
        setTripCurrencySymbol(tripCurrencySymbol);
        setError('');

        // Check if trip is over
        const endDate = DateTime.fromISO(pinnedTrip.end);
        const currentDate = DateTime.now();
        setIsTripOver(currentDate >= endDate);
      }
    }, [pinnedTrip]),
  );

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const removeTrip = async () => {
    // console.log('trips on pinned', trips);
    setLoading(true);
    setError('');
    const res = await deleteTrip(user.selectedTrip);
    setLoading(false);
    if (!res.status) {
      setError(res);
      return;
    }
    dispatch({
      type: 'DELETE_TRIP',
      payload: user.selectedTrip,
    });
    setTripDeleted(true);
  };

  useEffect(() => {
    if (tripDeleted) {
      setUser(prevUser => {
        const newUser = { ...prevUser };
        trips.length > 0
          ? (newUser.selectedTrip = trips[trips.length - 1])
          : (newUser.selectedTrip = null),
          setPinnedTrip({ ...newUser.selectedTrip });
        return newUser;
      });
      if (trips.length > 0) {
        navigation.navigate('PinnedTrip', {
          screen: 'PinnedTrip',
        });
      } else {
        navigation.navigate('Shared', { screen: 'UnlockFirstTrip' });
      }
    }
  }, [tripDeleted]);

  useEffect(() => {
    if (tripDeleted) setTripDeleted(false);
  }, [pinnedTrip]);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const toggleDeleteConfirmation = () => {
    setDeleteConfirmationVisible(!isDeleteConfirmationVisible);
  };

  const handleDownload = () => {
    toggleMenu();
  };

  const handleEdit = () => {
    toggleMenu();
  };

  const handleDelete = async () => {
    toggleMenu();
    toggleDeleteConfirmation();
  };

  const handleDeleteConfirmation = async () => {
    toggleDeleteConfirmation();
    await removeTrip();
  };
  const handleAddPress = () => {
    navigation.navigate('Shared', { screen: 'Category' });
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#04D9B2" className="p-4 mt-60" />
    );
  }

  return (
    <>
      {pinnedTrip && (
        <>
          <View className="absolute top-6 right-0 z-50 mt-10 mr-3">
            <TouchableOpacity onPress={toggleMenu}>
              <Entypo name="dots-three-vertical" size={26} color="black" />
            </TouchableOpacity>
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isMenuVisible}
            onRequestClose={toggleMenu}
          >
            <View className="absolute top-[70px] right-4 bg-white rounded-md p-4 shadow">
              <TouchableOpacity onPress={handleDownload} className="p-2">
                <View className="flex-row items-center">
                  <Entypo name="download" size={16} color="black" />
                  <Text className="ml-2">Download trip</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleEdit} className="p-2">
                <View className="flex-row items-center">
                  <Entypo name="edit" size={16} color="black" />
                  <Text className="ml-2">Edit trip</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className="p-2" onPress={handleDelete}>
                <View className="flex-row items-center">
                  <FontAwesome6 name="trash-can" size={16} color="red" />
                  <Text className="ml-3 text-[#FF0000]">Delete trip</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isDeleteConfirmationVisible}
            onRequestClose={toggleDeleteConfirmation}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              <View className="bg-white p-5 rounded-lg">
                <Text className="font-bold mb-4 text-center ">Delete Trip</Text>
                <Text>Are you sure you want to delete this trip?</Text>
                <View className="flex-row justify-between mt-5">
                  <TouchableOpacity
                    onPress={toggleDeleteConfirmation}
                    className="bg-lightGray p-4 rounded-md"
                  >
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleDeleteConfirmation}
                    className="bg-red-500 p-4 rounded-md"
                  >
                    <Text className="text-white">Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <View className="mt-20 ml-4 justify-start items-left">
            <Text className="text-3xl mt-4 mb-2 text-[#00b0a3] font-bold items-start">
              {capitalizeFirstLetter(pinnedTrip.name)}
            </Text>
            <Text
              className={`text-lg font-semibold ${error ? 'mb-1' : 'mb-4'}`}
            >
              {new Date(pinnedTrip.start).toLocaleDateString()} –{' '}
              {new Date(pinnedTrip.end).toLocaleDateString()}
            </Text>
          </View>

          {isTripOver && (
            <View className="bg-[#f24f13] mx-4 rounded-md mb-4">
              <Text className="p-3 text-[#fdfdfd] text-center font-bold">
                This trip is already over
              </Text>
            </View>
          )}

          {error && (
            <View className="text-red-600 mx-6 mb-2">
              <Text className="text-red-600 text-center">{error}</Text>
            </View>
          )}

          <View className="flex-1 items-center">
            <View>
              <View className="bg-lightGray rounded-md mb-4 pb-2">
                <Text className="w-[380px] p-3 pt-2 text-lg text-[#999]">
                  Total Spent{' '}
                </Text>
                <Text className="ml-auto mr-4 text-xl">
                  {totalSpent} {tripCurrencySymbol}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between items-center">
              <View className="bg-lightGray rounded-md ">
                <Text className="w-[182px] p-3 text-lg text-[#999] ">
                  {' '}
                  {pinnedTrip.budget == 0 ? 'Trip Duration' : 'Balance'}
                </Text>
                <Text className="ml-auto mr-4 text-xl pb-2">
                  {/* className=`ml-auto mr-4 text-xl pb-2 ${pinnedTrip && pinnedTrip.budget < 0 ? 'text-red': 'text-black'}` */}
                  {pinnedTrip.budget == 0
                    ? tripDuration + (tripDuration > 1 ? ' days' : ' day')
                    : balance + tripCurrencySymbol}
                </Text>
              </View>

              <View className="bg-lightGray rounded-md ml-4">
                <Text className="w-[182px] p-3 text-lg text-[#999]">
                  Daily Average
                </Text>
                <Text className="ml-auto mr-4 text-xl pb-2">
                  {dailyAverage} {tripCurrencySymbol}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-1 text-lg items-center">
            <View className="h-[400px]">
              <ExpenseList
                navigation={navigation}
                expenses={pinnedTrip.expenses}
                tripCurrencySymbol={tripCurrencySymbol}
              />
            </View>
          </View>

          <View className="flex-1 flex-row justify-end items-end">
            <TouchableOpacity onPress={handleAddPress}>
              <Image
                source={require('../../assets/images/plus.png')}
                className="mr-2 w-20 h-20"
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
}
