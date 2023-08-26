import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { useRouter, Stack } from "expo-router";

import styles from "../../styles/signup";
import { COLORS, icons, images } from "../../constants";
import { ScreenHeaderBtn } from "../../components";

import {
  isLoggedIn,
  setAuthTokens,
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
} from "react-native-axios-jwt";
import { axiosInstance } from "../../config/api";

const Signup = ({ navigation }) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const response = await axiosInstance.post("/auth/register", {
      name,
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
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
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
          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => router.push("/login")}
            >
              Log In
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
