import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

export default function Category() {
  return (
    <>
      <View className="mt-10">
        <TouchableOpacity
        // Function handleGoBack needs to be implemented
        // onPress={handleGoBack}
        >
          <Image
            source={require('../../assets/images/singleArrow.png')}
            className="ml-5 mt-6 w-20 h-20"
          />
        </TouchableOpacity>
      </View>

      <View className="items-center mt-5">
        <Text className="text-3xl font-semibold">Pick a category</Text>
        <View className="flex flex-row w-20 h-20 rounded-xl gap-4 justify-center mt-5">
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/accommodation.png')}
              className="w-[105px] h-[105px] rounded-xl"
            />
            <Text className="text-[13px] text-center font-semibold">
              Accommodation
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/activities.png')}
              className="w-[105px] h-[105px] rounded-xl"
            />
            <Text className="text-[13px] text-center font-semibold">
              Activities
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/groceries.png')}
              className="w-[105px] h-[105px] rounded-xl"
            />
            <Text className="text-[13px] text-center font-semibold">
              Groceries
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row w-20 h-20 rounded-xl gap-4 justify-center mt-12">
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/restaurant.png')}
              className="w-[105px] h-[105px] rounded-xl"
            />
            <Text className="text-[13px] text-center font-semibold">
              Restaurants
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/services.png')}
              className="w-[105px] h-[105px] rounded-xl"
            />
            <Text className="text-[13px] text-center font-semibold">
              Services
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/shopping.png')}
              className="w-[105px] h-[105px] rounded-xl"
            />
            <Text className="text-[13px] text-center font-semibold">
              Shopping
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row w-20 h-20 rounded-xl gap-4 justify-center mt-12">
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/taxes-fees.png')}
              className="w-[105px] h-[105px] rounded-xl"
            />
            <Text className="text-[13px] text-center font-semibold">
              Taxes & Fees
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/plane.png')}
              className="w-[105px] h-[105px] rounded-xl"
            />
            <Text className="text-[13px] text-center font-semibold">
              Transportation
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../assets/images/others.png')}
              className="w-[105px] h-[105px] rounded-xl"
            />
            <Text className="text-[13px] text-center font-semibold">
              Others
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
