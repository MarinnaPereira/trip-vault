import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function Avatar() {
  return (
    <View className="items-center mt-8">
      <Text className="text-xl font-semibold">Pick your avatar</Text>
      <View className="flex flex-row w-20 h-20 rounded-xl gap-3 justify-center mt-5">
        <TouchableOpacity>
          <Image
            source={require("./../../assets/images/iceberg.png")}
            className="w-[100px] h-[100px] mt-5 rounded-xl"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("./../../assets/images/river.png")}
            className="w-[100px] h-[100px] mt-5 rounded-xl"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("./../../assets/images/city.png")}
            className="w-[100px] h-[100px] mt-5 rounded-xl"
          />
        </TouchableOpacity>
      </View>

      <View className="flex flex-row w-20 h-20 rounded-xl gap-3 justify-center mt-8">
        <TouchableOpacity>
          <Image
            source={require("./../../assets/images/beach.png")}
            className="w-[100px] h-[100px] mt-5 rounded-xl"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("./../../assets/images/riceField.png")}
            className="w-[100px] h-[100px] mt-5 rounded-xl"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("./../../assets/images/mountain.png")}
            className="w-[100px] h-[100px] mt-5 rounded-xl"
          />
        </TouchableOpacity>
      </View>

      <View className="flex flex-row w-20 h-20 rounded-xl gap-3 justify-center mt-8">
        <TouchableOpacity>
          <Image
            source={require("./../../assets/images/wave.png")}
            className="w-[100px] h-[100px] mt-5 rounded-xl"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("./../../assets/images/highway.png")}
            className="w-[100px] h-[100px] mt-5 rounded-xl"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("./../../assets/images/dune.png")}
            className="w-[100px] h-[100px] mt-5 rounded-xl"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
