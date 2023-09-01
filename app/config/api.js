//api.js

import { applyAuthTokenInterceptor } from "react-native-axios-jwt";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://travel-planner-production-9c43.up.railway.app";

// 1. Create an axios instance that you wish to apply the interceptor to
export const axiosInstance = axios.create({ baseURL: BASE_URL });

const saveUserData = async (user) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    console.log("User data saved successfully!");
  } catch (error) {
    console.log("Error saving user data:", error);
  }
};

// 2. Define token refresh function.
const requestRefresh = async (refresh) => {
  // Notice that this is the global axios instance, not the axiosInstance!
  const response = await axios.post(`${BASE_URL}/auth/refresh_token`, {
    refresh,
  });
  const user = response.data.user;
  saveUserData(user);
  return response.data.accessToken;
};

// 3. Apply interceptor
// Notice that this uses the axiosInstance instance.
applyAuthTokenInterceptor(axiosInstance, { requestRefresh });
