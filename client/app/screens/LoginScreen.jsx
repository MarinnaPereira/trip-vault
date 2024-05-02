import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // !handleLoginPress function
  // const handleLoginPress = () => {
  //   navigation.navigate("MyTrips", { screen: "MyTripsScreen" });
  // };

  const handleRegisterPress = () => {
    navigation.navigate("Register", { screen: "RegisterScreen" });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View className="flex-1 items-center">
      <Image
        source={require("./../../assets/images/trip-vault-logo.png")}
        className="w-[120px] h-[120px] mt-5"
      />
      <Text className="mt-12 text-xl font-semibold">Login</Text>
      <Text>Login to your account</Text>
      <TextInput
        className="w-[300px] mt-8 bg-lightGray rounded-md p-3"
        placeholder="username / email"
        placeholderTextColor="#999"
      ></TextInput>
      <View className="flex flex-row justify-between w-[300px] mt-4 bg-lightGray rounded-md p-3">
        <TextInput
          placeholder="password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Ionicons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="black"
          onPress={togglePasswordVisibility}
        />
      </View>

      <Text className="mt-28">Don't have an account?</Text>
      <TouchableOpacity onPress={handleRegisterPress}>
        <Text className="mt-2 text-orange">Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        // onPress={handleLoginPress}
        className="bg-green w-[300px] rounded-lg mt-4"
      >
        <Text className="text-white text-center p-4">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
