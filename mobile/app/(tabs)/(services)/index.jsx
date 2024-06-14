import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { FormList } from "@components/shared";
import { Buttonz, Iconz, Selectz } from "@components/core";
import { router } from "expo-router";

const Header = () => {
  return (
    <Text className="text-xl font-semibold text-white text-center w-full">
      Dịch vụ khách hàng
    </Text>
  );
};

const OptionScreen = () => {
  const [refreshing, setRefreshing] = React.useState();

  return (
    <View className="mx-4 shadow bg-white mt-4 rounded-md p-4 h-full">
      <View className="w-full flex flex-row items-center justify-between">
        <Selectz label="trạng thái" />
        <Buttonz handlePress={() => router.push("/(services)/detail")} containerClassName="!px-3">
          <Iconz name="plus" color="white" />
        </Buttonz>
      </View>
      <FlatList
        data={[]}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6"></View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} />}
      />
    </View>
  );
};

const ServiceScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings Screen</Text>
    </View>
  );
};

const TopTab = createMaterialTopTabNavigator();
const SubTabs = () => {
  return (
    <FormList header={Header()}>
      <View className="h-full w-full">
        <TopTab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: "rgba(0, 188, 212, 1)",
            tabBarInactiveTintColor: "#CDCDE0",
            tabBarIndicatorStyle: {
              backgroundColor: "rgba(0, 188, 212, 1)",
              height: 2,
            },
            tabBarLabelStyle: { fontWeight: 600, fontSize: 14 },
          })}
        >
          <TopTab.Screen
            name="options"
            component={OptionScreen}
            options={{ tabBarLabel: "Ý kiến" }}
          />
          <TopTab.Screen
            name="services"
            component={ServiceScreen}
            options={{ tabBarLabel: "Dịch vụ" }}
          />
        </TopTab.Navigator>
      </View>
    </FormList>
  );
};

export default SubTabs;
