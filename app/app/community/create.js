import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import styles from "../../styles/createcommunity";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images } from "../../constants";
import { ScreenHeaderBtn } from "../../components";
const CreateCommunity = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleCreateCommunity = () => {
    // Logic to create the community using the collected data
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.chevronLeft} dimension="80%" handlePress={() => router.back()} />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" handlePress={() => router.push("/profile/guv")} />
          ),
          headerTitle: "",
        }}
      />
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
          <TouchableOpacity style={styles.buttonContainer} onPress={handleCreateCommunity}>
            <Text style={styles.buttonText}>Create Community</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateCommunity;
