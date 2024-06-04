import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { useUserContext } from '../contexts/userContext';
import { useTripsContext } from '../contexts/tripsContext';
import { useCurrencyContext } from '../contexts/currencyContext';
import { addExpense } from '../api/api';
import PaymentMethodModal from '../modals/PaymentMethodModal';
import UploadPictureModal from '../modals/UploadPictureModal';
import DropdownCurrency from './DropdownCurrency';

export default function NewExpenseScreen({ navigation, route }) {
  const categoryName = route.params.categoryName;
  const categoryImage = route.params.categoryImage;

  const { user, setUser } = useUserContext();
  const { dispatch, pinnedTrip } = useTripsContext();
  const { convertCurrency } = useCurrencyContext();

  const [value, setValue] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(
    pinnedTrip?.currency || 'EUR',
  );
  const [description, setDescription] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [image, setImage] = useState(null);
  const [singleDate, setSingleDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSingleDatePickerVisible, setSingleDatePickerVisibility] =
    useState(false);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [isSpreadByDays, setIsSpreadByDays] = useState(false);
  const [isPaymentMethodModalVisible, setIsPaymentMethodModalVisible] =
    useState(false);
  const [isUploadPictureModalVisible, setIsUploadPictureModalVisible] =
    useState(false);
  const [currencyDropdownVisible, setCurrencyDropdownVisible] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const tripCurrency = pinnedTrip ? pinnedTrip.currency : 'USD';

  const getConvertedAmount = () =>
    convertCurrency(value, selectedCurrency, tripCurrency);

  let convertedAmount;
  if (tripCurrency !== selectedCurrency) {
    convertedAmount = getConvertedAmount();
  }

  const saveExpense = async () => {
    const formData = new FormData();

    formData.append('categoryName', categoryName);
    formData.append('value', value);
    formData.append('currency', selectedCurrency);
    convertedAmount && formData.append('convertedAmount', convertedAmount);
    formData.append('description', description);
    singleDate && formData.append('dates[]', singleDate.toISOString());
    startDate && formData.append('dates[]', startDate.toISOString());
    endDate && formData.append('dates[]', endDate.toISOString());
    formData.append('paymentMethod', paymentMethod);
    image &&
      formData.append('file', {
        uri: image.uri,
        type: image.mimeType,
        name: new Date() + '_receipt' + '.jpeg',
      });
    setLoading(true);
    const data = await addExpense(formData);
    setLoading(false);
    if (data._id) {
      dispatch({
        type: 'ADD_EXPENSE',
        trip: user.selectedTrip,
        payload: data,
      });

      setUser(user => {
        const newUser = { ...user };
        newUser.selectedTrip.expenses.push(data);
        return newUser;
      });

      navigation.navigate('Main', {
        screen: 'PinnedTripStack',
        params: {
          screen: 'PinnedTrip',
        },
      });
    } else {
      setError(data);
    }
  };

  const handleSavePress = async () => {
    setError('');
    if (startDate && endDate && endDate < startDate) {
      setError('End date cannot be before start date');
      return;
    }
    await saveExpense();
  };

  const handleCurrencyChange = currency => {
    setSelectedCurrency(currency);
    setCurrencyDropdownVisible(false);
  };

  const togglePaymentModal = () => {
    setIsPaymentMethodModalVisible(!isPaymentMethodModalVisible);
  };

  const toggleUploadPictureModal = () => {
    setIsUploadPictureModalVisible(!isUploadPictureModalVisible);
  };

  const toggleCurrencyDropdown = () => {
    setCurrencyDropdownVisible(!currencyDropdownVisible);
  };

  const showSingleDatePicker = () => {
    setSingleDatePickerVisibility(true);
  };

  const hideSingleDatePicker = () => {
    setSingleDatePickerVisibility(false);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const hideEndDatePicker = () => {
    setSingleDatePickerVisibility(false);
  };

  const handleSingleDateConfirm = date => {
    setSingleDate(date);
    setStartDate(null);
    setEndDate(null);
    setSingleDatePickerVisibility(false);
  };

  const handleStartDateConfirm = date => {
    setStartDate(date);
    setSingleDate(null);
    setStartDatePickerVisibility(false);
  };

  const handleEndDateConfirm = date => {
    setEndDate(date);
    setSingleDate(null);
    setEndDatePickerVisibility(false);
  };

  const handleToggleSpreadByDays = () => {
    setIsSpreadByDays(!isSpreadByDays);
  };

  const handlePaymentMethod = selectedMethod => {
    setPaymentMethod(selectedMethod);
  };

  const handleImagePickerPress = async () => {
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    setLoading(false);
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };
  const handleCamera = async () => {
    setLoading(true);
    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.back,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    setLoading(false);
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <ScrollView>
      <TouchableOpacity
        className="mt-20 rounded-full w-[50px] h-[50px] bg-orange justify-center items-center ml-4"
        onPress={handleGoBack}
      >
        <MaterialIcons name="keyboard-backspace" size={34} color="white" />
      </TouchableOpacity>

      <View className="flex-1">
        <View className="flex flex-row justify-between mx-4 mt-5">
          <Text className="text-3xl font-semibold text-[#00B0A3]">
            {categoryName}
          </Text>
        </View>

        <View className="items-center">
          <View className="mt-[16px] mb-3 bg-lightGray rounded-md">
            <View className="w-[380px] flex flex-row justify-between items-center">
              <Image
                source={categoryImage}
                className="w-[60px] h-[60px] m-2 rounded-xl"
              />
              <TextInput
                className="text-3xl text-[#333]"
                placeholder="0.00"
                placeholderTextColor="#878787"
                value={value}
                keyboardType="numeric"
                onChangeText={text => setValue(text)}
              />
              <View className="flex pr-2">
                <TouchableOpacity onPress={toggleCurrencyDropdown}>
                  <Text className="bg-lightGreen text-white text-xl p-2 rounded-md">
                    {selectedCurrency}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View />

          <View style="relative" className="mt-1">
            {currencyDropdownVisible && (
              <DropdownCurrency
                selectedCurrency={selectedCurrency}
                onChange={handleCurrencyChange}
              />
            )}
          </View>

          <View
            className={`${!currencyDropdownVisible ? '' : 'mt-2'} items-center`}
          >
            <View className="w-[380px] mt-2 bg-lightGray rounded-md flex flex-row justify-start items-center pl-[10px]">
              <MaterialIcons name="edit" size={27} color="#333" />
              <TextInput
                className={`py-3 pl-2 text-[18px]`}
                placeholder="Description"
                placeholderTextColor="#333"
                onChangeText={text => setDescription(text)}
              />
            </View>

            {/* Calendar Single Date */}
            <View
              className={`mt-[14px] w-[380px] ${isSpreadByDays ? 'hidden' : 'flex'}`}
            >
              <TouchableOpacity
                onPress={showSingleDatePicker}
                className="bg-lightGray rounded-md flex flex-row justify-between items-center pl-2 pr-3"
              >
                <DateTimePickerModal
                  isVisible={isSingleDatePickerVisible}
                  mode="date"
                  onConfirm={handleSingleDateConfirm}
                  onCancel={hideSingleDatePicker}
                />
                <View className="flex flex-row items-center">
                  <MaterialIcons name="calendar-month" size={29} color="#333" />
                  {singleDate ? (
                    <Text className="py-3 pl-2 text-[18px]">
                      {singleDate.toDateString()}
                    </Text>
                  ) : (
                    <Text className="py-3 pl-2 text-[18px]">Date</Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={handleToggleSpreadByDays}
                  className="bg-[#FDA541] w-[105px] rounded-md"
                >
                  <Text className="text-white text-center p-1">
                    Spread by days
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>

            <View
              className={`mt-[14px] w-[380px]  ${isSpreadByDays ? 'flex' : 'hidden'}`}
            >
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
                  onCancel={hideStartDatePicker}
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
                    <Text className="py-3 pl-2 text-[18px]">Start date</Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={handleToggleSpreadByDays}
                  className="bg-[#FDA541] w-[105px] rounded-md"
                >
                  <Text className="text-white text-center p-1">
                    Cancel spread
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setEndDatePickerVisibility(true);
                }}
                className="bg-lightGray rounded-md flex flex-row justify-between items-center pl-2 pr-3 mt-[14px] w-[380px]"
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
                    <Text className="py-3 pl-2 text-[18px]">End date</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View className="mt-[14px] w-[380px] ">
              <TouchableOpacity
                onPress={togglePaymentModal}
                className="bg-lightGray rounded-md"
              >
                <View className="flex flex-row justify-start items-center pl-3">
                  <MaterialCommunityIcons
                    name="credit-card-plus-outline"
                    size={26}
                    color="#333"
                  />
                  <Text className="py-3 pl-2 text-[18px]">
                    {paymentMethod
                      ? capitalizeFirstLetter(paymentMethod)
                      : 'Payment Method'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <PaymentMethodModal
              modalVisible={isPaymentMethodModalVisible}
              closeModal={togglePaymentModal}
              handlePaymentMethod={handlePaymentMethod}
            />

            <View className="mt-[14px] w-[380px]">
              <TouchableOpacity
                onPress={toggleUploadPictureModal}
                className=" bg-lightGray rounded-md"
              >
                <View className="flex flex-row justify-start items-center pl-3">
                  <FontAwesome name="cloud-upload" size={24} color="#333" />
                  <Text className="py-3 pl-2 text-[18px]">Upload Picture</Text>
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
              <Image
                source={{ uri: image.uri }}
                className="h-[135px] w-[135px] self-center mt-5"
              />
            )}

            {error && (
              <View className="mt-3 mx-6">
                <Text className="text-red-600 text-center">{error}</Text>
              </View>
            )}

            <View className={`items-center ${image ? 'mt-5' : 'mt-8'}`}>
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="#04D9B2"
                  className=" p-4 "
                />
              ) : (
                <TouchableOpacity
                  onPress={handleSavePress}
                  className="bg-green w-[180px] rounded-lg"
                >
                  <Text className="text-white text-center p-4 text-[19px]">
                    Save
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
