import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function Category() {

  return (
    <View className="items-center mt-5">
      <Text className="text-xl font-semibold">Pick a category</Text>
      <View className="flex flex-row w-20 h-20 rounded-xl gap-3 justify-center mt-5">
        <TouchableOpacity>
          <Image
            source={require("./../../assets/images/accommodation.png")}
            className="w-[100px] h-[100px] mt-5 rounded-xl"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("./../../assets/images/activities.png")}
            className="w-[100px] h-[100px] mt-5 rounded-xl"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("./../../assets/images/groceries.png")}
            className="w-[100px] h-[100px] mt-5 rounded-xl"
          />
        </TouchableOpacity>
      </View>

      <View className="flex flex-row w-20 h-20 rounded-xl gap-3 justify-center mt-8">
        <TouchableOpacity>
          <Image
            source={require("./../../assets/images/restaurant.png")}
            className="w-[100px] h-[100px] mt-5 rounded-xl"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("./../../assets/images/services.png")}
            className="w-[100px] h-[100px] mt-5 rounded-xl"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("./../../assets/images/shopping.png")}
            className="w-[100px] h-[100px] mt-5 rounded-xl"
          />
        </TouchableOpacity>
      </View>

      <View className="flex flex-row w-20 h-20 rounded-xl gap-3 justify-center mt-8">
        <TouchableOpacity>
          <Image
            source={require("./../../assets/images/taxes-fees.png")}
            className="w-[100px] h-[100px] mt-5 rounded-xl"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("./../../assets/images/plane.png")}
            className="w-[100px] h-[100px] mt-5 rounded-xl"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("./../../assets/images/others.png")}
            className="w-[100px] h-[100px] mt-5 rounded-xl"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
