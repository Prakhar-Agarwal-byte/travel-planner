import React, { useState } from "react";
import { View, Text, TextInput, Button, SafeAreaView } from "react-native";
import styles from "../../styles/createTrip";
import { Stack } from "expo-router";
import { COLORS, icons, images, FONT, SIZES, SHADOWS } from "../../constants";
import { ScreenHeaderBtn } from "../../components";
const CreateCommunity = () => {
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
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />
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

        <View style={styles.buttonContainer}>
          <Button
            title="Create Community"
            onPress={handleCreateCommunity}
            color={COLORS.tertiary}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateCommunity;
