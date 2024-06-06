import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuthState } from "@store";

const AuthLayout = () => {
  const { isAuthenticated } = useAuthState();
  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="detail"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
