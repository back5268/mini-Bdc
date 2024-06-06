import { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Buttonz, Inputz, Loaderz } from "@components/core";
import { signinApi } from "@api";
import { useAuthState } from "@store";
import { asyncStorage } from "@lib/async-storage";
import { Logo, Toastify } from "@components/base";
import Toast from "react-native-toast-message";

const SignIn = () => {
  const { isAuthenticate, setLoadingz } = useAuthState();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const showToast = (title) => {
    Toast.show({
      type: "error",
      text2: title,
    });
  };

  const submit = async () => {
    const title =
      !form.username && !form.password
        ? "Vui lòng nhập tài khoản, mật khẩu để tiếp tục!"
        : form.username && !form.password
        ? "Vui lòng nhập mật khẩu!"
        : !form.username && form.password
        ? "Vui lòng nhập tài khoản"
        : form.username && form.password && form.password.length < 6
        ? "Mật khẩu dài tối thiểu 6 ký tự!"
        : "";
    if (title) return showToast(title);
    const response = await signinApi({ ...form });
    if (response?.status) {
      asyncStorage("token", response.data);
      setLoadingz();
    } else showToast("Tài khoản hoặc mật khẩu không chính xác!")
  };

  return (
    <SafeAreaView className="bg-background h-full">
      <Toastify />
      <ScrollView>
        <View
          className="justify-center h-full px-6"
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
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            keyboardType="email-address"
          />

          <Inputz
            icon="lock"
            type="password"
            placeholder="Mật khẩu (*)"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
          />

          <Link href="/forgot-password" className="text-base text-primary my-4">
            Quên mật khẩu
          </Link>
          <Buttonz label="Đăng nhập" handlePress={submit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
