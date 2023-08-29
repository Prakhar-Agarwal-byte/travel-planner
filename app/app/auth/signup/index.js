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

import styles from "../../../styles/signup";
import { COLORS, icons } from "../../../constants";
import { ScreenHeaderBtn } from "../../../components";
import { ActivityIndicator } from "react-native";

import {
  isLoggedIn,
  setAuthTokens,
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
} from "react-native-axios-jwt";
import { axiosInstance } from "../../../config/api";

const Signup = ({ navigation }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      setLoading(true);
      await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      });

      // save tokens to storage
      // await setAuthTokens({
      //   accessToken: response.data.accessToken,
      //   refreshToken: response.data.refreshToken,
      // });

      // Get access to tokens
      // const accessToken = await getAccessToken();
      router.push("/auth/login");
    } catch (error) {
      console.log("error singing up ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.logo} dimension="100%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.user} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />
      {loading ? (
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator size="large" color="blue" />
          <Text>Loading...</Text>
        </View>
      ) : (
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
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.loginText}>
              Already have an account?{" "}
              <TouchableOpacity onPress={() => router.push("/auth/login")}>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Signup;
