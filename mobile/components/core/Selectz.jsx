import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";

export const Selectz = ({
  label = "",
  value,
  setValue,
  options = [],
  optionValue = "key",
  optionLabel = "label",
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        className="w-48 h-12 border border-gray-400 rounded justify-center items-center"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-base">{value ? value : `Chọn ${label}`}</Text>
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <Pressable
          className="absolute inset-x-0 inset-y-0 bg-black opacity-40"
          onPress={() => {
            setModalVisible(false);
          }}
        />
        <View className="absolute bottom-0 w-full h-72 bg-white rounded-t-lg py-4 px-2">
          <ScrollView className="w-full">
            {options?.length > 0 ? (
              options.map((item, index) => {
                let key, label;
                if (typeof item === "object") {
                  key = String(item[optionValue]);
                  label = String(item[optionLabel]);
                } else key = label = String(item);

                return (
                  <TouchableOpacity
                    key={index}
                    className={`py-3 text-center rounded-md ${
                      value === key ? "bg-primary" : ""
                    }`}
                    onPress={() => {
                      setValue(key);
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      className={`text-center ${
                        value === key ? "text-white font-medium" : ""
                      }`}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text className="text-center text-lg">
                Không có dữ liệu {label}
              </Text>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default Selectz;
