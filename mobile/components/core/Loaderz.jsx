import { View, ActivityIndicator, Dimensions, Platform } from "react-native";

const Loaderz = () => {
  const osName = Platform.OS;
  const screenHeight = Dimensions.get("screen").height;

  return (
    <View
      className="absolute flex justify-center items-center w-full h-full bg-border z-10"
      style={{
        height: screenHeight,
      }}
    >
      <ActivityIndicator
        animating={true}
        color="#fff"
        size={osName === "ios" ? "large" : 50}
      />
    </View>
  );
};

export default Loaderz;
