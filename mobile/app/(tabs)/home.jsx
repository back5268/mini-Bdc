import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { images } from "@constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Iconz } from "@components/core";
import { useAuthState } from "@store";

const home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { userInfo } = useAuthState()

  return (
    <SafeAreaView className="bg-sidebar">
      <FlatList
        data={[]}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="w-full flex justify-between flex-row items-center">
              <View className="flex flex-row">
                <View className="mt-1.5">
                  <Image
                    source={images.logo}
                    className="w-9 h-10"
                    resizeMode="contain"
                  />
                </View>
                <View className="ml-4">
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome Back
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    {userInfo?.fullName}
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Iconz name="bell" color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} />}
      />
    </SafeAreaView>
  );
};

export default home;
