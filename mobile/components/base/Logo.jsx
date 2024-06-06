import { Image, View } from "react-native";
import React from "react";
import { images } from "@constants";

const Logo = () => {
  return (
    <View className="w-full flex justify-center text-center items-center">
      <Image source={images.logo} className="!w-28 !h-28" />
    </View>
  );
};

export default Logo;
