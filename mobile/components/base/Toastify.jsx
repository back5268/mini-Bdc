import React from "react";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const toastConfig = {
  success: (internalState) => (
    <BaseToast
      {...internalState}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "bold",
      }}
      text2Style={{
        fontSize: 13,
        color: "green",
      }}
    />
  ),
  error: (internalState) => (
    <ErrorToast
      {...internalState}
      style={{ borderLeftColor: "red" }}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};

const Toastify = () => {
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Hello",
      text2: "This is a customized toast message 👋",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
      onShow: () => {
        // Do something when toast is shown
      },
      onHide: () => {
        // Do something when toast is hidden
      },
    });
  };

  return <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />;
};

export default Toastify;
