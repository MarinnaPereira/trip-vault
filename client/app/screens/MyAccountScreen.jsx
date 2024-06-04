import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from '@expo/vector-icons';

import { useUserContext } from '../contexts/userContext';
import { useTripsContext } from '../contexts/tripsContext';
import { deleteUser, updateUser } from '../api/api';
import EditUsernameModal from '../modals/EditUsernameModal';
import avatars from '../../assets/avatars';

export default function MyAccountScreen({ navigation, route }) {
  const { user, setIsLogged, isLogged, setUser } = useUserContext();
  const { trips, dispatch, setPinnedTrip } = useTripsContext();

  const [isEditUserModalVisible, setIsEditUserModalVisible] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  useEffect(() => {
    if (!user) {
      navigation.replace('Auth', { screen: 'Welcome' });
    }
  }, [user, navigation]);

  useEffect(() => {
    if (newAvatar && newAvatar.name !== user.avatar) {
      const editedUser = { ...user, avatar: newAvatar.name };
      editUser(editedUser);
    }
  }, [newAvatar]);

  const findAvatarImage = userAvatar => {
    const avatar = avatars.find(avatar => avatar.name === userAvatar);
    return avatar
      ? avatar.image
      : avatars.find(avatar => avatar.name === 'Mountain').image;
  };

  let newAvatar;
  newAvatar = route.params ? route.params.newAvatar : null;

  const userAvatar = newAvatar
    ? newAvatar.image
    : user && findAvatarImage(user.avatar);

  const editUser = async editedUser => {
    setError('');
    setLoading(true);
    const res = await updateUser(editedUser);
    setLoading(false);
    if (res.data) {
      setUser(res.data);
    } else {
      setError(res);
    }
  };

  const handleLogoutPress = async () => {
    setLoading(true);
    await AsyncStorage.clear();
    setLoading(false);
    setUser(null);
    setError('');
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
  };

  const handleDeleteAccountPress = async () => {
    toggleDeleteConfirmation();
  };

  const toggleDeleteConfirmation = () => {
    setDeleteConfirmationVisible(!isDeleteConfirmationVisible);
  };

  const handleDeleteConfirmation = async () => {
    toggleDeleteConfirmation();
    setError('');
    setLoading(true);
    const res = await deleteUser(user);
    if (res.data) {
      setLoading(false);
      handleLogoutPress();
    } else {
      setError(res);
    }
  };

  const toggleModal = () => {
    setIsEditUserModalVisible(!isEditUserModalVisible);
  };

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  if (!user) {
    return null;
  }

  return (
    <>
      <View className="mt-[104px]">
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
          <Text className="mt-2 text-[19px] font-medium">{user.email}</Text>
        </View>
        <View />

        <View className="mt-8">
          <Text className="text-3xl ml-4 mt-3 mb-2 text-[#00b0a3] font-bold items-start">
            My Account
          </Text>
        </View>

        <View className="items-center">
          <View className="mt-2 w-[380px]">
            <Text className="text-left text-[19px] font-medium mb-1">
              Username
            </Text>
            <TouchableOpacity
              onPress={toggleModal}
              className="bg-lightGray rounded-md mb-1 flex flex-row justify-between items-center pr-2"
            >
              <Text className="py-3 px-4 text-[19px] text[#333]">
                {user.username}
              </Text>
              <MaterialIcons name="edit" size={22} color="black" />
            </TouchableOpacity>

            <View className="mt-2">
              <Text className="text-left text-[19px] font-medium mb-1">
                Password
              </Text>
              <View className="flex flex-row justify-between items-center bg-lightGray rounded-md py-3 pl-4 pr-3">
                <Text className="text-lg font-bold text[#333]">
                  ********
                  {/* {showPassword ? user.password : ''} */}
                </Text>
                <MaterialIcons name="edit" size={22} color="black" />
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

            {loading ? (
              <ActivityIndicator
                size="large"
                color="#04D9B2"
                className=" p-4 mt-14"
              />
            ) : (
              <View className="mt-14">
                <TouchableOpacity
                  onPress={handleLogoutPress}
                  className="bg-lightGray rounded-lg flex flex-row justify-between items-center pr-2"
                >
                  <Text className="text-left text-[19px] p-4">Logout</Text>
                  <MaterialCommunityIcons
                    name="logout"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleDeleteAccountPress}
                  className="bg-lightGray rounded-lg mt-4 flex flex-row justify-between items-center pr-2"
                >
                  <Text className="text-red-500 text-left text-[19px] p-4">
                    Delete account
                  </Text>
                  <AntDesign
                    name="deleteuser"
                    size={24}
                    color={'rgb(239,68,68)'}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <EditUsernameModal
            modalVisible={isEditUserModalVisible}
            closeModal={toggleModal}
          />
        </View>
      </View>
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
            <Text className="font-bold mb-4 text-center ">Delete Account</Text>
            <Text>Are you sure you want to delete this account?</Text>
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
    </>
  );
}
