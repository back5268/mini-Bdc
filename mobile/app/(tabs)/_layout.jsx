import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Text, View } from "react-native";
import { useAuthState } from "@store";
import { Iconz } from "@components/core";

const TabIcon = ({ name, color, label, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Iconz name={name} color={color} />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
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
          name="(news)"
          options={{
            title: "Tin tức",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="inbox"
                color={color}
                label="Tin tức"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(requests)"
          options={{
            title: "Yêu cầu",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="layers"
                color={color}
                label="Yêu cầu"
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
