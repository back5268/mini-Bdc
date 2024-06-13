import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import React, { Fragment } from "react";
import { useAuthState } from "@store";
import { removeStorage } from "@lib/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Hrz, Iconz } from "@components/core";

const Item = ({ label, icon, onPress }) => {
  return (
    <Fragment>
      <TouchableOpacity
        onPress={onPress}
        className="flex flex-row w-full justify-between items-center py-4 px-4"
      >
        <View className="flex flex-row items-center">
          <Iconz size={20} name={icon} color="white" />
          <Text className="text-base text-white ml-4">{label}</Text>
        </View>
        <Iconz size={20} name="chevron-right" color="white" />
      </TouchableOpacity>
      <Hrz />
    </Fragment>
  );
};

const index = () => {
  const { userInfo, clearAuth } = useAuthState();
  const logout = async () => {
    clearAuth();
    removeStorage("token");
    router.replace("/sign-in");
  };

  const showAlert = () => {
    Alert.alert(
      "Thông báo",
      "Bạn có chắc chắn muốn đăng xuất",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Xác nhận", onPress: () => logout() },
      ],
      { cancelable: false }
    );
  };

  const items = [
    { label: "Thông tin cá nhân", icon: "user" },
    { label: "Đổi mật khẩu", icon: "refresh-ccw" },
    { label: "Tổng quan tòa nhà", icon: "home" },
    { label: "Thông tin căn hộ", icon: "monitor" },
    { label: "Thông tin nhân khẩu", icon: "users" },
    { label: "ý kiến cư dân", icon: "clipboard" },
    { label: "Đăng xuất", icon: "log-out", onPress: showAlert },
  ];

  return (
    <SafeAreaView className="bg-sidebar h-full">
      <View className="w-full px-4">
        <View className="flex flex-row items-center justify-start my-16 ml-8">
          <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
            <Image
              source={{ uri: userInfo?.avatar }}
              className="w-[90%] h-[90%] rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="flex flex-col ml-4 font-lg text-white">
            <Text className="text-lg font-medium text-white mb-1">
              {userInfo?.fullName}
            </Text>
            <Text className="text-nomal text-white">@{userInfo?.username}</Text>
          </View>
        </View>
        <Hrz />
        {items.map((item, index) => (
          <Item
            label={item.label}
            icon={item.icon}
            key={index}
            onPress={item.onPress}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default index;
