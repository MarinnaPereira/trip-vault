import { View, Text, Image, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useUserContext } from '../contexts/userContext';
import { deleteUser, updateUser } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditUsernameModal from '../modals/EditUsernameModal';
import { Ionicons } from '@expo/vector-icons';
import avatars from '../../assets/avatars';
import { useTripsContext } from '../contexts/tripsContext';

export default function MyAccountScreen({ navigation, route }) {
  const [isEditUserModalVisible, setIsEditUserModalVisible] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { user, setIsLogged, isLogged, setUser } = useUserContext();
  const { trips, dispatch, setPinnedTrip } = useTripsContext();

  useEffect(() => {
    if (!user) {
      navigation.replace('Auth', { screen: 'Welcome' });
    }
  }, [user, navigation]);

  const findAvatarImage = userAvatar => {
    const avatar = avatars.find(avatar => avatar.name === userAvatar);
    return avatar
      ? avatar.image
      : avatars.find(avatar => avatar.name === 'Mountain').image;
  };

  let newAvatar;
  newAvatar = route.params ? route.params.newAvatar : null;

  const userAvatar = newAvatar ? newAvatar.image : findAvatarImage(user.avatar);

  // *updateUser
  const editUser = async editedUser => {
    setError('');
    const res = await updateUser(editedUser);
    if (res.status === 200) {
      setUser(res.data);
    } else {
      setError(res);
    }
  };

  useEffect(() => {
    if (newAvatar && newAvatar.name !== user.avatar) {
      const editedUser = { ...user, avatar: newAvatar.name };
      editUser(editedUser);
    }
  }, [newAvatar]);

  const toggleModal = () => {
    setIsEditUserModalVisible(!isEditUserModalVisible);
  };

  // *deleteUser
  const handleDeleteAccountPress = async () => {
    try {
      await deleteUser(user);
      handleLogoutPress();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // *logout

  const handleLogoutPress = async () => {
    await AsyncStorage.clear().then(() => console.log('AsyncStorage cleared'));
    setUser(null);
    dispatch({
      type: 'DELETE_ALL_TRIPS',
    });
    setPinnedTrip(null);
    setIsLogged(false);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      }),
    );
    console.log('User: ', user);
    console.log('Trips: ', trips);
    console.log('isLogged: ', isLogged);
    console.log('ALL CLEARED!');
  };

  if (!user) {
    return null;
  }
  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  return (
    <>
      <View className="mt-24">
        <View className="items-center">
          {userAvatar && (
            <Image
              source={userAvatar}
              className="w-[100px] h-[100px] rounded-xl"
            />
          )}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Shared', {
                screen: 'Avatar',
              });
            }}
            className="bg-lightGray p-2 rounded-full mt-[-25px] ml-[100px]"
          >
            <MaterialIcons name="edit" size={24} color="black" />
          </TouchableOpacity>
          <Text className="mt-2 text-[19px]">{user.email}</Text>
        </View>
        <View />

        <View className="mt-5">
          <Text className="text-3xl ml-4 mb-7 text-[#00b0a3] font-bold items-start">
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
                <Text className="text-lg font-bold">
                  ********
                  {/* {showPassword ? user.password : ''} */}
                </Text>
                {/* <TouchableOpacity onPress={togglePasswordVisibility}>
                <Ionicons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={24}
                    color="black"
                    className="mr-2"
                  />
                </TouchableOpacity> */}
              </View>
              {error && (
                <View className="text-red-600 mt-2 mx-6">
                  <Text className="text-red-600 text-center">{error}</Text>
                </View>
              )}
            </View>
            <View className="mt-16">
              <TouchableOpacity
                onPress={handleLogoutPress}
                className="bg-lightGray rounded-lg"
              >
                <Text className="text-left text-[19px] p-4">Logout</Text>
              </TouchableOpacity>

              <TouchableOpacity
                // Function handleDeleteAccountPress needs to be implemented
                onPress={handleDeleteAccountPress}
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
