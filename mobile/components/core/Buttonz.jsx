import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const Buttonz = ({
  label,
  handlePress,
  containerClassName = "",
  labelClassName = "",
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-primary rounded-md min-h-[48px] my-2 flex flex-row justify-center items-center ${containerClassName} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-white font-psemibold text-lg uppercase ${labelClassName}`}>
        {label}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default Buttonz;
