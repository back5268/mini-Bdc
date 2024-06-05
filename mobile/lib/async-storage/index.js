import AsyncStorage from "@react-native-async-storage/async-storage";

export const asyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Failed to save token to AsyncStorage:", error);
  }
};

export const getStorage = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error("Failed to get token from AsyncStorage:", error);
  }
};

export const removeStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove key "${key}" from AsyncStorage:`, error);
  }
};
