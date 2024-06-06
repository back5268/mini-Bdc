import { icons } from "@constants";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
console.log(icons.play === icons["play"]);

const Inputz = ({
  icon,
  label,
  type,
  value,
  placeholder,
  handleChangeText,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`my-2 ${className}`}>
      <Text className="text-base text-color font-pmedium">{label}</Text>
      <View className="w-full h-12 px-4 border-[1px] border-border rounded-md focus:border-primary flex flex-row items-center">
        {!!icon && (
          <View className="mr-4">
            <Image
              source={icons[icon]}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
        <TextInput
          className="flex-1 text-color font-pmedium text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={type === "password" && !showPassword}
          {...props}
        />
        {type === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Inputz;
