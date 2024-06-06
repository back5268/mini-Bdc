import { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Buttonz, Inputz } from "@components/core";
import { signinApi } from "@api";
import { useAuthState } from "@store";
import { asyncStorage } from "@lib/async-storage";
import { Logo } from "@components/base";

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
    <SafeAreaView className="bg-background h-full">
      <ScrollView>
        <View
          className="justify-center h-full px-4"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Logo />
          <Text className="text-2xl text-center font-semibold text-color my-8 font-psemibold">
            Log in to Mini BDC
          </Text>

          <Inputz
            icon="user"
            placeholder="Tài khoản (*)"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
          />

          <Inputz
            icon="password"
            type="password"
            placeholder="Mật khẩu (*)"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
          />

          <Link href="/forgot-password" className="text-base text-primary my-4">
            Quên mật khẩu
          </Link>
          <Buttonz label="Sign In" handlePress={submit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
