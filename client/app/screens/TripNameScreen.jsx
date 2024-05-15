import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo, FontAwesome6 } from '@expo/vector-icons';
import { useUserContext } from '../contexts/userContext';
import { useTripsContext } from '../contexts/tripsContext';
import { useCurrencyContext } from '../contexts/currencyContext';
import { deleteTrip } from '../api/api';
import ExpenseList from './ExpenseList';

export default function TripNameScreen({ totalSpent }) {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  const { trips, dispatch, pinnedTrip } = useTripsContext();
  const { user, setUser } = useUserContext();
  const {
    calculateTotalExpenses,
    calculateDailyAverage,
    calculateRemainingBalance,
  } = useCurrencyContext();

  useEffect(() => {
    console.log('pinnedTrip', pinnedTrip);
  }, []);

  //* testing deleting trip
  // call api deleteTrip
  // update trip context
  // update user's selected trip

  // const tripData = {
  //   name: 'hardcoded trip3',
  //   start: '2024-11-01',
  //   end: '2024-12-15',
  //   currency: 'USD',
  //   budget: 3000,
  //   _id: '663a206528c0de859429ca39',
  // };

  // useEffect(() => {
  //   const eliminateTrip = async () => {
  //     try {
  //       await deleteTrip(tripData);
  //       dispatch({
  //         type: 'DELETE_TRIP',
  //         payload: tripData['_id'],
  //       });
  //     } catch (error) {
  //       console.error('Error fetching trips:', error);
  //     }
  //   };

  //   eliminateTrip();
  // }, []);

  // useEffect(() => {
  //   console.log('Updated trips', trips); // Logging updated trips
  //   setUser({
  //     ...user,
  //     selectedTrip: trips.length >= 1 ? trips[trips.length - 1]._id : null,
  //   });
  // }, [trips]); // Logging trips when it changes

  useEffect(() => {
    console.log('User', user);
  }, [user]);

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

  const handleDelete = () => {
    toggleMenu();
    toggleDeleteConfirmation();
  };

  // tripExpenses = pinnedTrip.expenses;
  // const totalSpent = calculateTotalExpenses(tripExpenses, pinnedTrip.currency)

  // const dailyAverage = calculateDailyAverage(totalSpent, TRIP LENGTH)
  // const balance = calculateRemainingBalance(pinnedTrip.budget, totalSpent)

  return (
    <>
      <View className="absolute top-6 right-0 z-50 mt-10 mr-10">
        <TouchableOpacity onPress={toggleMenu}>
          <Entypo name="dots-three-vertical" size={24} color="darkgrey" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={toggleMenu}
      >
        <View className="absolute top-16 right-4 bg-white rounded-md p-4 shadow">
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

          <TouchableOpacity onPress={handleDelete} className="p-2">
            <View className="flex-row items-center">
              <FontAwesome6 name="trash-can" size={16} color="red" />
              <Text className="ml-3 text-[#FF0000]">Delete trip</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
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
            <Text className="font-bold mb-4 text-center ">Delete Trip?</Text>
            <Text>Are you sure you want to delete this trip?</Text>
            <View className="flex-row justify-between mt-5">
              <TouchableOpacity
                onPress={toggleDeleteConfirmation}
                className="bg-lightGray p-4 rounded-md"
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                className="bg-red-500 p-4 rounded-md"
              >
                <Text className="text-white">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View className="mt-20 justify-start items-left">
        <Text className="text-3xl mt-20 ml-8 mb-7 text-[#00b0a3] font-bold items-start">
          {pinnedTrip ? pinnedTrip.name : 'Trip name'}
        </Text>
      </View>
      <View className="flex-1 items-center">
        {/* <View>
          <View className="bg-[#f24f13] rounded-md">
            <Text className="w-[310px] p-3 text-[#fdfdfd] text-center font-bold">
              This trip ended in dd/mm/yyyy{' '}
            </Text>
          </View>
          <Text>{totalSpent}</Text>
        </View> */}
        <View>
          <View className="bg-lightGray rounded-md">
            <Text className="w-[380px] p-3 text-lg text-[#999]">
              Total Spent{' '}
            </Text>
            <Text className="ml-auto mr-4 text-xl">€</Text>
          </View>
          <Text>{totalSpent}</Text>
        </View>

        <View className="flex-row justify-between items-center">
          <View className="bg-lightGray rounded-md">
            <Text className="w-[182px] p-3 text-lg text-[#999]">Balance</Text>
            <Text className="ml-auto mr-4 text-xl">€</Text>
          </View>

          <View className="bg-lightGray rounded-md ml-4">
            <Text className="w-[182px] p-3 text-lg text-[#999]">
              Daily Average
            </Text>
            <Text className="ml-auto mr-4 text-xl">€</Text>
          </View>
        </View>
      </View>

      <View className="mt-12 flex-1 text-lg items-center">
        <View>
          <ExpenseList expenses={pinnedTrip.expenses} />
        </View>
      </View>

      <View className="flex-1 items-center mt-10">
        <View>
          <View className="flex-row justify-between">
            <Text className="text-left text-lg">dd/mm/yyyy</Text>
            <Text className="text-right text-lg">Total amount of the day</Text>
          </View>

          <View className="items-center">
            <View className="mt-3 mb-1 bg-lightGray rounded-md">
              <View className="w-[380px] flex flex-row justify-between">
                <Image
                  source={require('../../assets/images/restaurant.png')}
                  className="w-[60px] h-[60px] m-2 rounded-xl"
                />
                <View className="flex-1 justify-center">
                  <View className="flex flex-row justify-between">
                    <Text className="text-[19px] font-semibold">
                      Transportation
                    </Text>
                    <Text className="text-[19px]  font-semibold mr-3">
                      €100
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between">
                    <Text className="text-[15px]">Tickets</Text>
                    <Text className="text-[15px] mr-3">$110</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View className="items-center">
            <View className="mt-3 mb-1 bg-lightGray rounded-md">
              <View className="w-[380px] flex flex-row justify-between">
                <Image
                  source={require('../../assets/images/restaurant.png')}
                  className="w-[60px] h-[60px] m-2 rounded-xl"
                />
                <View className="flex-1 justify-center">
                  <View className="flex flex-row justify-between">
                    <Text className="text-[19px] font-semibold">Shopping</Text>
                    <Text className="text-[19px]  font-semibold mr-3">
                      €100
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between">
                    <Text className="text-[15px]">Souvenirs</Text>
                    <Text className="text-[15px] mr-3">$110</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View className="items-center">
            <View className="mt-3 mb-1 bg-lightGray rounded-md">
              <View className="w-[380px] flex flex-row justify-between">
                <Image
                  source={require('../../assets/images/activities.png')}
                  className="w-[60px] h-[60px] m-2 rounded-xl"
                />
                <View className="flex-1 justify-center">
                  <View className="flex flex-row justify-between">
                    <Text className="text-[19px] font-semibold">
                      Activities
                    </Text>
                    <Text className="text-[19px]  font-semibold mr-3">
                      €100
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between">
                    <Text className="text-[15px]">Theater</Text>
                    <Text className="text-[15px] mr-3">$110</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View className="items-center">
            <View className="mt-3 mb-1 bg-lightGray rounded-md">
              <View className="w-[380px] flex flex-row justify-between">
                <Image
                  source={require('../../assets/images/groceries.png')}
                  className="w-[60px] h-[60px] m-2 rounded-xl"
                />
                <View className="flex-1 justify-center">
                  <View className="flex flex-row justify-between">
                    <Text className="text-[19px] font-semibold">Services</Text>
                    <Text className="text-[19px]  font-semibold mr-3">
                      €100
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between">
                    <Text className="text-[15px]">Restaurant</Text>
                    <Text className="text-[15px] mr-3">$110</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="flex flex-row justify-end">
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/plus.png')}
            className="mr-6 w-28 h-28"
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
