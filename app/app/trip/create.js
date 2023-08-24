import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons, images } from "../../constants";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../../styles/createTrip";
import { ScreenHeaderBtn } from "../../components";

const CreateTrip = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fromDestination, setFromDestination] = useState("");
  const [toDestination, setToDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState("Select Community");
  const community = [
    { label: "Beach Getaway", value: "Beach Getaway" },
    { label: "City Adventure", value: "City Adventure" },
    { label: "Mountain Expedition", value: "Mountain Expedition" },
    { label: "Cultural Exploration", value: "Cultural Exploration" },
    { label: "Wildlife Safari", value: "Wildlife Safari" },
  ];

  const handleCreateTrip = () => {
    // Logic to create the trip using the collected data
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Create Trip</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="From Destination"
            value={fromDestination}
            onChangeText={setFromDestination}
          />
          <TextInput
            style={styles.input}
            placeholder="To Destination"
            value={toDestination}
            onChangeText={setToDestination}
          />
          <TextInput
            style={styles.input}
            placeholder="Start Date and Time"
            value={startDate}
            onChangeText={setStartDate}
          />
          <DropDownPicker
            items={community}
            open={isOpen}
            setOpen={() => setIsOpen(!isOpen)}
            value={currentValue}
            setValue={(val) => setCurrentValue(val)}
            placeholder="Select Community"
            maxHeight={100}
            containerStyle={styles.dropdownContainer}
            style={styles.dropdownStyle}
          />
          <TouchableOpacity style={styles.buttonContainer} onPress={handleCreateTrip}>
            <Text style={styles.buttonText}>Create Trip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateTrip;
