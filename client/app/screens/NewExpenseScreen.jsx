import { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import PaymentMethodModal from '../modals/PaymentMethodModal';
import UploadPictureModal from '../modals/UploadPictureModal';
import { useTripsContext } from '../contexts/tripsContext';
import { useUserContext } from '../contexts/userContext';
import { useCurrencyContext } from '../contexts/currencyContext';
import { addExpense, updateExpense } from '../api/api';

import transport from '../../assets/images/plane.png';

export default function NewExpenseScreen({ navigation, route }) {
  const [isPaymentMethodModalVisible, setIsPaymentMethodModalVisible] =
    useState(false);
  const [isUploadPictureModalVisible, setIsUploadPictureModalVisible] =
    useState(false);
  // const [expense, setExpense] = useState(null); // for checking if it's creating or updating

  const [file, setFile] = useState(null);
  const [value, setValue] = useState(null);
  const [description, setDescription] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [image, setImage] = useState();

  let categoryName;
  let categoryImage;
  if (true) {
    //   categoryName = 'Transportation';
    //   categoryImage = transport;
    // } else {
    categoryName = route.params.categoryName;
    categoryImage = route.params.categoryImage;
  }

  const { trips, dispatch } = useTripsContext();
  const { user } = useUserContext();
  const { convertCurrency } = useCurrencyContext();

  // const tripCurrency = pinnedTrip.currency
  // if(currency !== tripCurrency) {
  // const convertedAMount = convertCurrency(value, currency, tripCurrency);
  // }

  // const handleFileChange = e => {
  //   setFile(e.target.files[0]);
  // };

  //* addExpense
  const saveExpense = async () => {
    const formData = new FormData();

    formData.append('categoryName', categoryName);
    formData.append('value', value);
    formData.append('currency', 'EUR');
    // if(convertedAmount) {form.append('convertedAmount', convertedAmount)}
    formData.append('description', description);
    formData.append('dates[]', '2024-05-01');
    formData.append('dates[]', '2024-05-04');
    formData.append('paymentMethod', paymentMethod);
    // formData.append('file', file');

    const newExpense = await addExpense(formData);
    const { selectedTrip } = user;
    dispatch({
      type: 'ADD_EXPENSE',
      tripId: selectedTrip,
      payload: newExpense,
    });

    // *update expense
    // const expenseId = '663a857170c7112af6015994'; //hardcoded for now
    // const updatedExpense = await updateExpense(formData, expenseId);
    //   const {selectedTrip} = user;
    //   dispatch({
    //     type: 'UPDATE_EXPENSE',
    //     tripId: selectedTrip,
    //     expenseId: expenseId,
    //     payload: updatedExpense,
    //   });
  };

  // *add expense
  const handleSavePress = async () => {
    await saveExpense();

    navigation.navigate('TripNameScreen', {
      screen: 'TripNameScreen',
    });
  };

  //* update expense
  // const handleSavePress2 = async () => {
  //   const updatedExpense = await saveExpense();
  //   // remember to update current trip
  // };

  // useEffect(() => {
  //   console.log('Updated trip expenses', trips); // Logging updated trips
  // }, [trips]);

  const handleGoBack = () => {
    navigation.navigate('Category', { screen: 'CategoryScreen' });
  };

  // const handleSavePress = () => {
  //   navigation.navigate('TripName', { screen: 'TripNameScreen' });
  // };

  const togglePaymentModal = () => {
    setIsPaymentMethodModalVisible(!isPaymentMethodModalVisible);
  };

  const toggleUploadPictureModal = () => {
    setIsUploadPictureModalVisible(!isUploadPictureModalVisible);
  };

  const handlePaymentMethod = selectedMethod => {
    setPaymentMethod(selectedMethod);
  };

  // const handleFile = fileSent => {
  //   console.log(fileSent);
  //   // setFile(fileSent)
  // };

  const handleImagePickerPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.back,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <>
      <View className="mt-10">
        <TouchableOpacity onPress={handleGoBack}>
          <Image
            source={require('../../assets/images/singleArrow.png')}
            className="ml-5 mt-6 w-20 h-20"
          />
        </TouchableOpacity>
      </View>

      <View className="flex-1">
        <View className="flex flex-row justify-between mx-10 mt-5">
          <Text className=" text-3xl font-semibold">{categoryName}</Text>
          <TouchableOpacity>
            <FontAwesome6 name="trash-can" size={32} color="red" />
          </TouchableOpacity>
        </View>

        <View className="items-center">
          <View className="mt-4 mb-6 bg-lightGray rounded-md">
            <View className="w-[380px] flex flex-row justify-between items-center">
              <Image
                source={categoryImage}
                className="w-[60px] h-[60px] m-2 rounded-xl"
              />
              <TextInput
                className="text-3xl"
                placeholder="0.00"
                placeholderTextColor="#999"
                value={value}
                keyboardType="numeric"
                onChangeText={text => setValue(text)}
              />
              <View className="flex pr-2">
                <Text className="bg-lightGreen text-white text-xl p-2 rounded-md">
                  EUR
                </Text>
              </View>
            </View>
          </View>
          <View />

          {/* !icon into placeholder */}
          <View style="relative">
            {/* <MaterialIcons
            name="edit"
            size={24}
            color="#999"
            className="absolute"
          /> */}
            <TextInput
              className="w-[380px] mt-8 bg-lightGray rounded-md p-3 text-[19px]"
              placeholder="Description"
              placeholderTextColor="black"
              onChangeText={text => setDescription(text)}
            ></TextInput>
            <View />

            <View className="mt-4">
              <TouchableOpacity className=" bg-lightGray rounded-md">
                <View className="flex flex-row justify-start items-center pl-3">
                  <MaterialIcons
                    name="calendar-month"
                    size={30}
                    color="black"
                  />
                  <Text className="py-3 pl-2 text-[19px]">Date</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View className="mt-4">
              <TouchableOpacity
                onPress={togglePaymentModal}
                className=" bg-lightGray rounded-md"
              >
                <View className="flex flex-row justify-start items-center pl-3">
                  <MaterialCommunityIcons
                    name="credit-card-plus-outline"
                    size={28}
                    color="black"
                  />
                  <Text className="py-3 pl-2 text-[19px]">
                    {paymentMethod ? paymentMethod : 'Payment Method'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <PaymentMethodModal
              modalVisible={isPaymentMethodModalVisible}
              closeModal={togglePaymentModal}
              handlePaymentMethod={handlePaymentMethod}
              onCameraPress={() => {
                uploadImage();
              }}
            />

            <View className="mt-4">
              <TouchableOpacity
                onPress={toggleUploadPictureModal}
                className=" bg-lightGray rounded-md"
              >
                <View className="flex flex-row justify-start items-center pl-3">
                  <FontAwesome name="cloud-upload" size={24} color="black" />
                  <Text className="py-3 pl-2 text-[19px]">Upload Picture</Text>
                </View>
              </TouchableOpacity>
            </View>

            <UploadPictureModal
              modalVisible={isUploadPictureModalVisible}
              closeModal={toggleUploadPictureModal}
              handleGallery={handleImagePickerPress}
              handleCamera={handleCamera}
            />

            {image && (
              <Image source={{ uri: image }} className="h-[150px] w-[150px]" />
            )}

            <View className="items-center mt-48">
              <TouchableOpacity
                onPress={handleSavePress}
                className="bg-green w-[180px] rounded-lg"
              >
                <Text className="text-white text-center p-4 text-[19px]">
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
