import { View, Text, Image, TouchableOpacity } from "react-native";
// import TabNavigation from "../navigations/TabNavigation";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DropdownCurrency from "./DropdownCurrency";
// import DatePicker from "react-native-date-picker";

export default function InitiateTripScreen() {
  const navigation = useNavigation();
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);

  const handleEnterName = () => {
    navigation.navigate("MyTrips", { screen: "MyTripsScreen" });
  };

  const handleGoBack = () => {
    navigation.navigate("UnlockFirstTrip", { screen: "UnlockFirstTripScreen" });
  };
  return (
    <>
      <View className="mt-10">
        <TouchableOpacity onPress={handleGoBack}>
          <Image
            source={require("../../assets/images/singleArrow.png")}
            className="ml-9 w-12 h-12"
          />
        </TouchableOpacity>
      </View>
      <View className="mt-5 justify-start items-left">
        <Text className="text-xl ml-11 mb-7 font-semibold items-start">
          Initiate a trip
        </Text>
      </View>

      <View className="flex-1 items-center">
        <View className="mt-4">
          <TouchableOpacity
            onPress={handleEnterName}
            className="bg-lightGray rounded-md"
          >
            <Text className="w-[300px] p-3 text-[#999]">Enter a name </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-4">
          <DropdownCurrency />
          <Text></Text>
        </View>

        <View className="mt-4">
          <TouchableOpacity className=" bg-lightGray rounded-md">
            <Text className="w-[300px] p-3 text-[#999]">Budget (optional)</Text>
          </TouchableOpacity>
        </View>

        {/* THIS CODE BELLOW IS THE CALENDAR */}
        {/* <View style={{ marginTop: 20 }}>
          <DatePicker
            style={{
              width: 300,
              backgroundColor: "lightgray",
              borderRadius: 5,
            }}
            date={startDate}
            mode="date"
            placeholder="Select start date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => setStartDate(date)}
          />

          <DatePicker
            style={{
              width: 300,
              backgroundColor: "lightgray",
              borderRadius: 5,
              marginTop: 10,
            }}
            date={endDate}
            mode="date"
            placeholder="Select end date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => setEndDate(date)}
          />

          //? THIS CODE BELLOW IS THE CALCULATION OF THE TRIP LENGTH
          <View style={{ marginTop: 10 }}>
            <Text style={{ width: 300, padding: 10 }}>
              The trip length is{" "}
              {endDate && startDate
                ? `${
                    Math.abs(new Date(endDate) - new Date(startDate)) /
                    (1000 * 60 * 60 * 24)
                  } days`
                : "__"}{" "}
              days
            </Text>
          </View>
           */}
        {/* </View> */}

        {/* HERE HAS TO COME THE NAVBAR -> TabNavigation */}
      </View>
    </>
  );
}
