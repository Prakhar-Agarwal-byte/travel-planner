//api.js

import { applyAuthTokenInterceptor } from "react-native-axios-jwt";
import axios from "axios";

const BASE_URL = "http://172.17.55.247:3000";

// 1. Create an axios instance that you wish to apply the interceptor to
export const axiosInstance = axios.create({ baseURL: BASE_URL });

// 2. Define token refresh function.
const requestRefresh = async (refresh) => {
  // Notice that this is the global axios instance, not the axiosInstance!
  const response = await axios.post(`${BASE_URL}/auth/refresh_token`, {
    refresh,
  });

  return response.data.accessToken;
};

// 3. Apply interceptor
// Notice that this uses the axiosInstance instance.
applyAuthTokenInterceptor(axiosInstance, { requestRefresh });
