import React, { useState } from "react";
import { COLORS, images, FONT } from "../../constants";

import { Stack } from "expo-router";
import { ScreenHeaderBtn } from "../../components";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView
  } from "react-native";

import styles from "../../styles/signup";

const Signup = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = () => {
        // Implement your signup logic here
        // You can use the 'name', 'email', and 'password' state values
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
          Sign Up
        </Text>
        <TextInput
          style={[styles.input, { borderColor: COLORS.gray2 }]}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
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
        <TouchableOpacity
          style={[styles.signupButton, { backgroundColor: COLORS.secondary }]}
          onPress={handleSignup}
        >
          <Text style={[styles.buttonText, { fontFamily: FONT.medium }]}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[styles.loginText, { fontFamily: FONT.regular }]}>
            Already have an account?{" "}
            <Text
              style={[
                styles.loginLink,
                { color: COLORS.primary, fontFamily: FONT.bold },
              ]}
            >
              Log In
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    );
};

export default Signup;
