import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome6,
} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

import PaymentMethodModal from '../modals/PaymentMethodModal';
import UploadPictureModal from '../modals/UploadPictureModal';
import { useTripsContext } from '../contexts/tripsContext';
import { useUserContext } from '../contexts/userContext';
import { useCurrencyContext } from '../contexts/currencyContext';
import { updateExpense, deleteExpense } from '../api/api';
import DropdownCurrency from './DropdownCurrency';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import categories from '../../assets/categories';

export default function ExistentExpenseScreen({ navigation, route }) {
  const { user, setUser } = useUserContext();
  const { trips, dispatch, pinnedTrip, setPinnedTrip } = useTripsContext();
  const { convertCurrency } = useCurrencyContext();

  const { item } = route.params || null;

  let selectedExpense = null;
  if (pinnedTrip) {
    selectedExpense = pinnedTrip.expenses.find(
      expense => expense._id === item._id,
    );
  }
  if (!selectedExpense)
    return (
      <View>
        <Text>Expense not found</Text>
      </View>
    );

  console.log(selectedExpense);

  const [categoryName, setCategoryName] = useState(
    selectedExpense.categoryName,
  );
  const [value, setValue] = useState(selectedExpense?.value);
  const [selectedCurrency, setSelectedCurrency] = useState(
    selectedExpense.currency,
  );
  const [description, setDescription] = useState(
    selectedExpense.description != 'null' ? selectedExpense.description : null,
  );
  const [singleDate, setSingleDate] = useState(
    selectedExpense.dates && selectedExpense.dates.length === 1
      ? new Date(selectedExpense.dates[0])
      : null,
  );
  const [startDate, setStartDate] = useState(
    selectedExpense.dates && selectedExpense.dates.length > 1
      ? new Date(selectedExpense.dates[0])
      : null,
  );
  const [endDate, setEndDate] = useState(
    selectedExpense.dates && selectedExpense.dates.length > 1
      ? new Date(selectedExpense.dates[1])
      : null,
  );
  const [paymentMethod, setPaymentMethod] = useState(
    selectedExpense.paymentMethod != 'null'
      ? selectedExpense.paymentMethod
      : null,
  );
  const [image, setImage] = useState(selectedExpense.receipt);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  const [isSingleDatePickerVisible, setSingleDatePickerVisibility] =
    useState(false);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [isSpreadByDays, setIsSpreadByDays] = useState(
    selectedExpense.dates.length > 1,
  );

  const [isPaymentMethodModalVisible, setIsPaymentMethodModalVisible] =
    useState(false);
  const [isUploadPictureModalVisible, setIsUploadPictureModalVisible] =
    useState(false);

  const [currencyDropdownVisible, setCurrencyDropdownVisible] = useState(false);

  // * category image
  const findCategoryImage = categoryName => {
    const category = categories.find(cat => cat.name === categoryName);
    return category
      ? category.image
      : categories.find(cat => cat.name === 'Others').image;
  };

  const categoryImage = findCategoryImage(categoryName);

  const tripCurrency = pinnedTrip ? pinnedTrip.currency : 'USD';
  const getConvertedAmount = () =>
    convertCurrency(value, selectedCurrency, tripCurrency);

  let convertedAmount;
  if (tripCurrency !== selectedCurrency) {
    convertedAmount = getConvertedAmount();
  }

  //* updateExpense
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

    const expenseId = selectedExpense._id;
    setLoading(true);
    const data = await updateExpense(formData, expenseId);
    setLoading(false);
    if (data._id) {
      dispatch({
        type: 'UPDATE_EXPENSE',
        trip: user.selectedTrip,
        expenseId: expenseId,
        payload: data,
      });
      setUser(user => {
        const newUser = { ...user };
        newUser.selectedTrip.expenses = newUser.selectedTrip.expenses.map(
          expense => (expense._id === data._id ? data : expense),
        );
        return newUser;
      });
      setSuccess('Expense successfully updated!');
    } else {
      setError(data);
    }
  };

  useEffect(() => {
    setPinnedTrip(user.selectedTrip);
  }, [user]);

  const handleUpdatePress = async () => {
    setError('');
    setSuccess('');
    if (startDate && endDate && endDate < startDate) {
      console.log(startDate && endDate && endDate < startDate);
      setError('End date cannot be before start date');
      return;
    }
    await saveExpense();
  };

  const handleGoBack = () => {
    navigation.navigate('PinnedTrip');
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

  const toggleDeleteConfirmation = () => {
    setDeleteConfirmationVisible(!isDeleteConfirmationVisible);
  };

  const handleDelete = async () => {
    const previousLength = pinnedTrip.expenses.length;
    setLoading(true);
    const res = await deleteExpense(selectedExpense);
    setLoading(false);
    if (!res.status) {
      setError(res);
      return;
    }
    dispatch({
      type: 'DELETE_EXPENSE',
      trip: user.selectedTrip,
      payload: selectedExpense,
    });
    setUser(user => {
      const newUser = { ...user };
      newUser.selectedTrip.expenses = newUser.selectedTrip.expenses.filter(
        expense => expense._id !== selectedExpense._id,
      );
      setPinnedTrip({ ...newUser.selectedTrip });
      return newUser;
    });
    toggleDeleteConfirmation();
    handleNavigation(previousLength);
  };

  const handleNavigation = previousLength => {
    if (previousLength > 1) {
      navigation.navigate('PinnedTrip');
    } else {
      navigation.navigate('Shared', {
        screen: 'TrackFirstExpense',
      });
    }
  };

  const handleCategoryPress = () => {
    // navigation.navigate('Shared', {
    //   screen: 'Category',
    //   params: {
    //     changeCategory: true,
    //   },
    // });
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
          <Text className=" text-3xl font-semibold text-[#00B0A3]">
            {categoryName}
          </Text>
          <TouchableOpacity onPress={toggleDeleteConfirmation}>
            <FontAwesome6 name="trash-can" size={29} color="red" />
          </TouchableOpacity>
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
                <Text className="font-bold mb-4 text-center ">
                  Delete Expense
                </Text>
                <Text>Are you sure you want to delete this expense?</Text>
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
        </View>

        <View className="items-center">
          <View className="mt-[16px] mb-3 bg-lightGray rounded-md">
            <View className="w-[380px] flex flex-row justify-between items-center">
              <TouchableOpacity onPress={handleCategoryPress}>
                <Image
                  source={
                    typeof categoryImage === 'string'
                      ? { uri: categoryImage }
                      : categoryImage
                  }
                  className="w-[60px] h-[60px] m-2 rounded-xl"
                />
              </TouchableOpacity>
              <TextInput
                className="text-3xl text-[#333]"
                placeholder="0.00"
                placeholderTextColor="#878787"
                value={value.toString()}
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
                value={description}
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

            {/* Calendar Spread by days */}
            <View
              className={`mt-[14px] w-[380px] ${isSpreadByDays ? 'flex' : 'hidden'}`}
            >
              {/* Start Date */}
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
                    <Text className="py-3 pl-2 text-[18px]">
                      Select start date
                    </Text>
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

              {/* End Date */}
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
                    <Text className="py-3 pl-2 text-[18px]">
                      Select end date
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View className="mt-[14px] w-[380px]">
              <TouchableOpacity
                onPress={togglePaymentModal}
                className=" bg-lightGray rounded-md"
              >
                <View className="flex flex-row justify-start items-center pl-3">
                  <MaterialCommunityIcons
                    name="credit-card-plus-outline"
                    size={26}
                    color="#333"
                  />
                  <Text className="py-3 pl-2 text-[18px]">
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
                className="h-[150px] w-[150px] self-center mt-5"
              />
            )}

            {error && (
              <View className="mt-2 mx-6">
                <Text className="text-red-600 text-center">{error}</Text>
              </View>
            )}

            {success && (
              <View className="mt-2 mx-6">
                <Text className="text-green font-medium text-center">
                  {success}
                </Text>
              </View>
            )}

            <View className="items-center mt-6">
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="#04D9B2"
                  className=" p-4 "
                />
              ) : (
                <TouchableOpacity
                  onPress={handleUpdatePress}
                  className="bg-green w-[180px] rounded-lg"
                >
                  <Text className="text-white text-center p-4 text-[19px]">
                    Update
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
