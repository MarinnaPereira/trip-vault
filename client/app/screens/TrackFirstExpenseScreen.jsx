import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import CategoryScreen from "./CategoryScreen";

export default function TrackFirstExpenseScreen() {
  const navigation = useNavigation();

  const handleTrackFirstExpenseScreen = () => {
    navigation.navigate("PickACategory", { screen: "PickACategory" });
  };

  return (
    <View className="flex-1 mt-[130px] items-center">
      <Text className="text-3xl">Track Your First Expense</Text>
      <TouchableOpacity onPress={CategoryScreen}>
        <Image
          source={require("../../assets/images/plus.png")}
          className="w-28 h-28"
        />
      </TouchableOpacity>

      <Image
        source={require("./../../assets/images/LogoCroped.png")}
        className="w-[495px] h-[325px] absolute bottom-0"
      />
    </View>
  );
}
