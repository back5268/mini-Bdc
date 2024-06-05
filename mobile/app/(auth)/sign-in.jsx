import { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Buttonz, Inputz } from "@components/core";
import { signinApi } from "@api";
import { useAuthState } from "@store";
import { asyncStorage } from "@lib/async-storage";

const SignIn = () => {
  const { setLoadingz } = useAuthState();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    const response = await signinApi(form.email, form.password);
    if (response?.status) {
      asyncStorage("token", response.data);
      setLoadingz();
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <Inputz
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <Inputz
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <Buttonz
            label="Sign In"
            handlePress={submit}
            containerClassName="mt-7"
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Quên mật khẩu
            </Text>
            <Link
              href="/forgot-password"
              className="text-lg font-psemibold text-secondary"
            >
              Quên mật khẩu
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
