import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Text, View } from "react-native";
import { useAuthState } from "@store";
import { Iconz } from "@components/core";

const TabIcon = ({ name, color, label, focused }) => {
  return (
    <View className="flex items-center justify-center">
      <Iconz name={name} color={color} size={20} />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs mt-2`}
        style={{ color: color }}
      >
        {label}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const { isAuthenticated } = useAuthState();
  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "rgba(0, 188, 212, 1)",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "rgba(47, 51, 73, 1)",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 80,
            // display: "none"
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Trang chủ",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="home"
                color={color}
                label="Trang chủ"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(services)"
          options={{
            title: "Dịch vụ",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="layers"
                color={color}
                label="Dịch vụ"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(bills)"
          options={{
            title: "Hóa đơn",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="file-text"
                color={color}
                label="Hóa đơn"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            title: "Thông tin",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="user"
                color={color}
                label="Thông tin"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;
