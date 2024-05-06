import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

export default function Category() {
  return (
    <>
      <TouchableOpacity
        className="bg-orange p-1 rounded-full mt-10 ml-5 w-[45px] h-[45px]"
        // Function handleGoBack needs to be implemented
        // onPress={handleGoBack}
      >
        <Feather name="arrow-left" size={34} color="white" />
      </TouchableOpacity>

      <View className="items-center mt-5">
        <Text className="text-xl font-semibold">Pick a category</Text>
        <View className="flex flex-row w-20 h-20 rounded-xl gap-3 justify-center mt-5">
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/accommodation.png')}
              className="w-[100px] h-[100px] rounded-xl"
            />
            <Text className="text-[9px] text-center font-semibold">
              Accommodation
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/activities.png')}
              className="w-[100px] h-[100px] rounded-xl"
            />
            <Text className="text-[9px] text-center font-semibold">
              Activities
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/groceries.png')}
              className="w-[100px] h-[100px] rounded-xl"
            />
            <Text className="text-[9px] text-center font-semibold">
              Groceries
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row w-20 h-20 rounded-xl gap-3 justify-center mt-12">
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/restaurant.png')}
              className="w-[100px] h-[100px] rounded-xl"
            />
            <Text className="text-[9px] text-center font-semibold">
              Restaurants
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/services.png')}
              className="w-[100px] h-[100px] rounded-xl"
            />
            <Text className="text-[9px] text-center font-semibold">
              Services
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/shopping.png')}
              className="w-[100px] h-[100px] rounded-xl"
            />
            <Text className="text-[9px] text-center font-semibold">
              Shopping
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row w-20 h-20 rounded-xl gap-3 justify-center mt-12">
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/taxes-fees.png')}
              className="w-[100px] h-[100px] rounded-xl"
            />
            <Text className="text-[9px] text-center font-semibold">
              Taxes & Fees
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/plane.png')}
              className="w-[100px] h-[100px] rounded-xl"
            />
            <Text className="text-[9px] text-center font-semibold">
              Transportation
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/others.png')}
              className="w-[100px] h-[100px] rounded-xl"
            />
            <Text className="text-[9px] text-center font-semibold">Others</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
