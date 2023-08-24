import React, { useState } from "react";
import { COLORS, images, FONT } from "../../constants";

import { Stack } from "expo-router";
import { ScreenHeaderBtn } from "../../components/";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView
} from "react-native";

import styles from "../../styles/login";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Implement your login logic here
        // You can use the 'email' and 'password' state values
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />
      <View style={styles.container}>
      <Text
          style={[
            styles.title,
            { fontFamily: FONT.bold, color: COLORS.primary },
          ]}
        >
          Log In
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { borderColor: COLORS.gray2 }]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[styles.input, { borderColor: COLORS.gray2 }]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={[styles.loginButton, { backgroundColor: COLORS.primary }]}
          onPress={handleLogin}
        >
          <Text style={[styles.buttonText, { fontFamily: FONT.medium }]}>
            Login
          </Text>
        </TouchableOpacity>
        <Text style={[styles.signupText, { fontFamily: FONT.regular }]}>
          Don't have an account?{" "}
          <Text
            style={[
              styles.signupLink,
              { color: COLORS.primary, fontFamily: FONT.bold },
            ]}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
    );
};

export default Login;
