import { router, useSegments } from "expo-router";
import React from "react";
import { useState, useEffect } from "react";
import { axiosInstance } from "../config/api";
import {
  clearAuthTokens,
  setAuthTokens,
  getAccessToken,
} from "react-native-axios-jwt";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/auth/login");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user, segments]);
}

const loadUserData = async () => {
  try {
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser !== null) {
      return JSON.parse(storedUser);
    }
  } catch (error) {
    console.log("Error loading user data:", error);
  }
};

const saveUserData = async (user) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    console.log("User data saved successfully!");
  } catch (error) {
    console.log("Error saving user data:", error);
  }
};

export function Provider(props) {
  const [user, setAuth] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const user = await loadUserData();
      console.log("user from Provider", user);
      setAuth(user);
    };
    fetchData();
  }, []);

  const signIn = async ({ email, password }) => {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    // save tokens to storage
    await setAuthTokens({
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    });

    // Get access to tokens
    // const accessToken = await getAccessToken();

    // Get user info
    setAuth(response.data.user);
    await saveUserData(response.data.user);
  };

  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
      console.log("User data cleared successfully!");
    } catch (error) {
      console.log("Error clearing user data:", error);
    }
  };

  const signOut = async () => {
    await clearAuthTokens();
    await clearUserData();
    setAuth(null);
  };

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
