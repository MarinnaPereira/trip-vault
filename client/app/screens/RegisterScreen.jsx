import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
// import axios from "axios";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const createUser = async () => {
    const url = "http://192.168.0.237:8080/auth/register";
    // console.log("avatar", avatar);
    const avatar = "iceberg";
    try {
      const data = {
        username,
        email,
        password,
        avatar,
      };
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, config);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  // !handleRegisterPress function to save data
  const handleRegisterPress = () => {
    createUser();
    console.log("user created");
    navigation.navigate("Login", { screen: "LoginScreen" });

    // navigation.navigate("MyAccount", { username: username, email: email });
  };

  const handleLoginPress = () => {
    navigation.navigate("Login", { screen: "LoginScreen" });
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
      <Text className="mt-12 text-xl font-semibold">Register</Text>
      <Text>Create your account</Text>
      <TextInput
        className="w-[300px] mt-8 bg-lightGray rounded-md p-3"
        placeholder="username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        className="w-[300px] mt-4 bg-lightGray rounded-md p-3"
        placeholder="email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={(text) => setEmail(text)}
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

      <Text className="mt-12">Already have an account?</Text>
      <TouchableOpacity onPress={handleLoginPress}>
        <Text className="mt-2 text-orange">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleRegisterPress}
        className="bg-green w-[300px] rounded-lg mt-4"
      >
        <Text className="text-white text-center p-4">Register</Text>
      </TouchableOpacity>
    </View>
  );
}
