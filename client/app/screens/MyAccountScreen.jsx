import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useUserContext } from '../contexts/userContext';
import { useTripsContext } from '../contexts/tripsContext';
import { deleteUser, updateUser } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyAccountScreen({ route }) {
  // const { username, email } = route.params;

  const { user, setUser } = useUserContext();
  const { trips, dispatch } = useTripsContext();

  // *updateUser
  const hardcodedUser = {
    _id: '663a38af268b1a36580b8d07',
    username: 'mari',
    email: 'mari@email.com',
  };

  const userData = {
    ...hardcodedUser,
    username: 'mari2',
  };

  useEffect(() => {
    const editUser = async () => {
      try {
        const editedUser = await updateUser(userData);
        setUser(editedUser);
      } catch (error) {
        console.error('Error updating User:', error);
      }
    };

    editUser();
  }, []);

  useEffect(() => {
    console.log('User', user);
  }, [user]);

  // *deleteUser
  // deleteUser api
  // setUser(null)
  // setTrips([])
  // setLogged(false)
  // removeToken

  // useEffect(() => {
  //   const eliminateUser = async () => {
  //     try {
  //       await deleteUser(hardcodedUser);
  //       setUser(null);
  //       dispatch({
  //         type: 'DELETE_ALL_TRIPS',
  //       });
  //       await AsyncStorage.removeItem('token');
  //     } catch (error) {
  //       console.error('Error deleting user:', error);
  //     }
  //   };

  //   eliminateUser();
  // }, []);

  // useEffect(() => {
  //   console.log('Updated trips', trips); // Logging updated trips
  // }, [trips]); // Logging trips when it changes

  // useEffect(() => {
  //   console.log('User', user);
  // }, [user]);

  // *logout
  // setUser(null)
  // setTrips([])
  // setLogged(false)
  // removeToken

  return (
    <>
      <TouchableOpacity
        className="bg-orange p-1 rounded-full mt-10 ml-5 w-[45px] h-[45px]"
        // Function handleGoBack needs to be implemented
        // onPress={handleGoBack}
      >
        <Feather name="arrow-left" size={34} color="white" />
      </TouchableOpacity>

      <View className="flex-1 items-center">
        <Image
          source={require('./../../assets/images/beach.png')}
          className="w-[100px] h-[100px] rounded-xl"
        />
        <TouchableOpacity className="bg-lightGray p-2 rounded-full mt-[-25px] ml-[100px]">
          <MaterialIcons name="edit" size={24} color="black" />
        </TouchableOpacity>
        {/* Display the email dynamically. Replace 'example@gmail.com' with the fetched email. */}
        <Text className="mt-2">example@gmail.com</Text>
        <View />
        <View className="mt-2 mr-[150px]">
          <Text className="text-xl mt-5 font-semibold">My Account</Text>
        </View>
        <View className="mt-4">
          <Text className="text-left">username</Text>
          <TouchableOpacity className="bg-lightGray rounded-md">
            {/* Display the username dynamically. Replace 'dci' with the fetched username. */}
            <Text className="w-[300px] p-3 text-[#999]">dci</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-4">
          <Text className="text-left">password</Text>
          <TouchableOpacity className=" bg-lightGray rounded-md">
            {/* Display the password dynamically. Replace '1234!' with the fetched password. */}
            <Text className="w-[300px] p-3 text-[#999]">1234!</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-16">
          <TouchableOpacity
            // Function handleLogoutPress needs to be implemented
            // onPress={handleLogoutPress}
            className="bg-lightGray w-[300px] rounded-lg"
          >
            <Text className="text-left p-4">Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            // Function handleDeleteAccountPress needs to be implemented
            // onPress={handleDeleteAccountPress}
            className="bg-lightGray w-[300px] rounded-lg mt-4"
          >
            <Text className="text-red-500 text-left p-4">Delete account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
