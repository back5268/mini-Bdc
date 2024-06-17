import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { Fragment } from "react";
import { images } from "@constants";
import { Iconz } from "@components/core";
import { useAuthState } from "@store";
import { FormList } from "@components/shared";

const Header = () => {
  const { userInfo } = useAuthState();
  return (
    <Fragment>
      <View className="flex flex-row">
        <View className="mt-1.5">
          <Image
            source={images.logo}
            className="w-9 h-10"
            resizeMode="contain"
          />
        </View>
        <View className="ml-4">
          <Text className="font-pmedium text-sm text-gray-100">Xin chào</Text>
          <Text className="text-2xl font-psemibold text-white">
            {userInfo?.fullName}
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        <Iconz name="bell" color="white" />
      </TouchableOpacity>
    </Fragment>
  );
};

const home = () => {
  return <FormList header={Header()}></FormList>;
};

export default home;
