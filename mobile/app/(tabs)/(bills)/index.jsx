import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, View } from "react-native";
import { FormList } from "@components/shared";
import { Iconz } from "@components/core";

const Header = () => {
  return (
    <Text className="text-xl font-semibold text-white text-center w-full">
      Dịch vụ khách hàng
    </Text>
  );
};

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings Screen</Text>
    </View>
  );
}


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
          <TopTab.Screen name="options" component={SettingsScreen} options={{ tabBarLabel: 'Ý kiến' }} />
          <TopTab.Screen name="services" component={SettingsScreen} options={{ tabBarLabel: 'Dịch vụ' }} />
        </TopTab.Navigator>
      </View>
    </FormList>
  );
};

export default SubTabs;
