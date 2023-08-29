import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import styles from "../../styles/createcommunity";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images } from "../../constants";
import { ScreenHeaderBtn } from "../../components";
import { axiosInstance } from "../../config/api";
import { useAuth } from "../../context/auth";

const CreateCommunity = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleCreateCommunity = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/communities", {
        name,
        description,
        location,
      });
      console.log("New community created:", response.data);
    } catch (error) {
      console.error("Error creating community:", error);
    } finally {
      setLoading(false);
      setName("");
      setDescription("");
      setLocation("");
      router.push("/community");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.logo} dimension="100%" handlePress={() => router.push("/")} />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={{
                uri: user.profileImage
              }}
              dimension="100%"
              handlePress={() => router.push("/profile")}
            />
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
            <Text style={styles.title}>Create Community</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Community Description"
                value={description}
                onChangeText={setDescription}
              />
              <TextInput
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
              />
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleCreateCommunity}
            >
              <Text style={styles.buttonText}>Create Community</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CreateCommunity;
