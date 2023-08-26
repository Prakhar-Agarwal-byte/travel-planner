import React, { useState } from "react";
import { Stack, router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { COLORS, icons, images } from "../../constants";
import { ScreenHeaderBtn } from "../../components";
import styles from "../../styles/login";

import {
  isLoggedIn,
  setAuthTokens,
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
} from "react-native-axios-jwt";
import { axiosInstance } from "../../config/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
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
    const accessToken = getAccessToken().then((accessToken) =>
      router.push("/")
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          //   headerLeft: () => (
          //     <Text style={styles.headerText}>Travel Planner</Text>
          //   ),
          //   headerRight: () => (
          //     <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          //   ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}>
            Don't have an account?{" "}
            <TouchableOpacity
              style={styles.signupLink}
              onPress={() => router.push("/signup")}
            >
              Sign Up
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
