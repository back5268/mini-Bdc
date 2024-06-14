import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FormList } from "@components/shared";
import { Iconz, Inputz } from "@components/core";
import { router } from "expo-router";
import { ScrollView } from "react-native";

const Header = () => {
  return (
    <View className="w-full flex flex-row justify-center items-center">
      <TouchableOpacity onPress={() => router.back()}>
        <Iconz name="x" color="white" />
      </TouchableOpacity>
      <Text className="text-xl font-semibold text-white text-center w-11/12">
        Dịch vụ khách hàng
      </Text>
    </View>
  );
};

const detail = () => {
  return (
    <FormList header={Header()}>
      <View className="mx-4 shadow bg-white mt-4 rounded-md p-2">
        <ScrollView className="w-full px-4">
          <Inputz
            icon="user"
            placeholder="Tài khoản (*)"
            keyboardType="email-address"
          />
          <Inputz
            icon="user"
            placeholder="Tài khoản (*)"
            keyboardType="email-address"
          />
          <Inputz
            icon="user"
            placeholder="Tài khoản (*)"
            keyboardType="email-address"
          />
          <Inputz
            icon="user"
            placeholder="Tài khoản (*)"
            keyboardType="email-address"
          />
          <Inputz
            icon="user"
            placeholder="Tài khoản (*)"
            keyboardType="email-address"
          />
          <Inputz
            icon="user"
            placeholder="Tài khoản (*)"
            keyboardType="email-address"
          />
          <Inputz
            icon="user"
            placeholder="Tài khoản (*)"
            keyboardType="email-address"
          />
          <Inputz
            icon="user"
            placeholder="Tài khoản (*)"
            keyboardType="email-address"
          />
          <Inputz
            icon="user"
            placeholder="Tài khoản (*)"
            keyboardType="email-address"
          />
        </ScrollView>
      </View>
    </FormList>
  );
};

export default detail;
