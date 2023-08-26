import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images } from "../../constants";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../../styles/createtrip";
import { ScreenHeaderBtn } from "../../components";

const CreateTrip = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fromDestination, setFromDestination] = useState("");
  const [toDestination, setToDestination] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
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
  const hideDatePicker = () => {
    setShowDatePicker(false);
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
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.input}>
              {startDate ? startDate.toISOString().substring(0, 16) : "Select Start Date and Time"}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePickerModal
              isVisible={showDatePicker}
              mode="datetime"
              onConfirm={(selectedDate) => {
                const currentDate = selectedDate || startDate;
                setStartDate(currentDate);
              }}
              onCancel={hideDatePicker}
            />
          )}
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
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleCreateTrip}
          >
            <Text style={styles.buttonText}>Create Trip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateTrip;
