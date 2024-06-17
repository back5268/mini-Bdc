import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FormList = ({ header, children }) => {

  return (
    <SafeAreaView>
      <View className="flex py-6 px-4 bg-sidebar">
        <View className="w-full flex justify-between flex-row items-center">
          {header}
        </View>
      </View>
      {children}
    </SafeAreaView>
  );
};

export default FormList;
