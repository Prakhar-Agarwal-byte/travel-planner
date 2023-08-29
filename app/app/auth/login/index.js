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

import { COLORS, icons, images } from "../../../constants";
import { ScreenHeaderBtn } from "../../../components";
import styles from "../../../styles/login";

import { axiosInstance } from "../../../config/api";
import { useAuth } from "../../../context/auth";

const Login = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    signIn({ email, password });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          //   headerShadowVisible: false,
          //   headerLeft: () => (
          //     <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
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
            <TouchableOpacity onPress={() => router.push("/auth/signup")}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
