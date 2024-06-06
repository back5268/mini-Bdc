import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Iconz } from ".";

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
      <View className="w-full h-12 px-4 border-[1px] border-color rounded-md focus:border-primary focus:border-2 flex flex-row items-center">
        {!!icon && (
          <View className="mr-4">
            <Iconz name={icon} color="primary" />
          </View>
        )}
        <TextInput
          className="flex-1 text-color text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={type === "password" && !showPassword}
          {...props}
        />
        {type === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Iconz name={showPassword ? "eye-off" : "eye"} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Inputz;
