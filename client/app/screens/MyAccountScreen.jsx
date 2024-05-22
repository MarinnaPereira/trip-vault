import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useUserContext } from '../contexts/userContext';
import { useTripsContext } from '../contexts/tripsContext';
import { deleteUser, updateUser } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditUsernameModal from '../modals/EditUsernameModal';
import { Ionicons } from '@expo/vector-icons';

export default function MyAccountScreen({ navigation, route }) {
  const [isEditUserModalVisible, setIsEditUserModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { user, setIsLogged, setUser } = useUserContext();
  const { trips, dispatch } = useTripsContext();

  const { avatarImage } = route.params || {};

  const toggleModal = () => {
    setIsEditUserModalVisible(!isEditUserModalVisible);
  };

  // *updateUser
  // const hardcodedUser = {
  //   _id: '663a38af268b1a36580b8d07',
  //   username: 'mari',
  //   email: 'mari@email.com',
  // };

  // const userData = {
  //   ...hardcodedUser,
  //   username: 'mari2',
  // };

  // useEffect(() => {
  //   const editUser = async () => {
  //     try {
  //       const editedUser = await updateUser(userData);
  //       setUser(editedUser);
  //     } catch (error) {
  //       console.error('Error updating User:', error);
  //     }
  //   };

  //   editUser();
  // }, []);

  // useEffect(() => {
  //   console.log('User', user);
  // }, [user]);

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

  const handleLogoutPress = async () => {
    setUser(null);
    dispatch({
      type: 'DELETE_ALL_TRIPS',
    });
    setIsLogged(false);
    await AsyncStorage.removeItem('token');

    navigation.navigate('Auth', { screen: 'Welcome' });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <View className="mt-24">
        <View className="items-center">
          {avatarImage && (
            <Image
              source={avatarImage}
              className="w-[100px] h-[100px] rounded-xl"
            />
          )}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Avatar', { screen: 'AvatarScreen' });
            }}
            className="bg-lightGray p-2 rounded-full mt-[-25px] ml-[100px]"
          >
            <MaterialIcons name="edit" size={24} color="black" />
          </TouchableOpacity>
          <Text className="mt-2 text-[19px]">{user.email}</Text>
        </View>
        <View />

        <View className="mt-5">
          <Text className="text-3xl ml-7 mb-7 text-[#00b0a3] font-bold items-start">
            My Account
          </Text>
        </View>

        <View className="items-center">
          <View className="mt-4 w-[380px]">
            <Text className="text-left text-[19px]">Username</Text>
            <TouchableOpacity
              onPress={toggleModal}
              className="bg-lightGray rounded-md"
            >
              <Text className="p-3 text-[19px]">{user.username}</Text>
            </TouchableOpacity>

            <View className="mt-2">
              <Text className="text-left text-[19px]">Password</Text>
              <View className="flex flex-row justify-between items-center bg-lightGray rounded-md p-3">
                <Text className="text-lg">
                  {showPassword ? user.password : '***'}
                </Text>
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={24}
                    color="black"
                    className="mr-2"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View className="mt-16">
              <TouchableOpacity
                // Function handleLogoutPress needs to be implemented
                onPress={handleLogoutPress}
                className="bg-lightGray rounded-lg"
              >
                <Text className="text-left text-[19px] p-4">Logout</Text>
              </TouchableOpacity>

              <TouchableOpacity
                // Function handleDeleteAccountPress needs to be implemented
                // onPress={handleDeleteAccountPress}
                className="bg-lightGray rounded-lg mt-4"
              >
                <Text className="text-red-500 text-left text-[19px] p-4">
                  Delete account
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <EditUsernameModal
            modalVisible={isEditUserModalVisible}
            closeModal={toggleModal}
          />
        </View>
      </View>
    </>
  );
}
