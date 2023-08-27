import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images } from "../../constants";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../../styles/createtrip";
import { ScreenHeaderBtn } from "../../components";
import { axiosInstance } from "../../config/api";

const CreateTrip = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fromDestination, setFromDestination] = useState("");
  const [toDestination, setToDestination] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modeOfTransport, setModeOfTransport] = useState("");
  const [capacity, setCapacity] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isTransportOpen, setIsTransportOpen] = useState(false);
  const [currentCommunityId, setCurrentCommunityId] =
    useState("Select Community");
  const [currentTransport, setCurrentTransport] = useState(
    "Select Mode of Transport"
  );
  const [communityOptions, setCommunityOptions] = useState([{}]);

  const transportOptions = [
    { label: "Car", value: "car" },
    { label: "Train", value: "train" },
    { label: "Bus", value: "bus" },
    { label: "Flight", value: "flight" },
    { label: "Bike", value: "bike" },
    { label: "Ferry", value: "ferry" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await axiosInstance.get("/users/profile");
        const userId = userData.data._id;

        const communitiesJoinedByUser = await axiosInstance.get(
          `/communities/user/${userId}/joined`
        );

        console.log(
          "Communities joined by user:",
          communitiesJoinedByUser.data
        );

        const options = communitiesJoinedByUser.data.map((d) => ({
          label: d.name,
          value: d._id,
        }));

        setCommunityOptions(options);
        console.log("Community options:", options);
      } catch (error) {
        console.error("Error fetching communities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateTrip = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/trips", {
        title,
        description,
        fromDestination,
        toDestination,
        startDate,
        modeOfTransport,
        capacity,
        communityId: currentCommunityId,
      });
      console.log("New trip created:", response.data);
    } catch (error) {
      console.error("Error creating trip:", error);
    } finally {
      setLoading(false);
    }
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
          // headerLeft: () => (
          //   <ScreenHeaderBtn
          //     iconUrl={icons.chevronLeft}
          //     dimension="80%"
          //     handlePress={() => router.back()}
          //   />
          // ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={images.profile}
              dimension="100%"
              handlePress={() => router.push("/profile/guv")}
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
            <Text style={styles.title}>Create Trip</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
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
                {startDate
                  ? startDate.toISOString().substring(0, 16)
                  : "Select Start Date and Time"}
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
            <TextInput
              style={styles.input}
              placeholder="Mode of transport"
              value={modeOfTransport}
              onChangeText={setModeOfTransport}
            />
            <DropDownPicker
              items={transportOptions}
              open={isTransportOpen}
              setOpen={() => setIsTransportOpen(!isTransportOpen)}
              value={currentTransport}
              setValue={(val) => setCurrentTransport(val)}
              placeholder="Select Mode of Transport"
              maxHeight={100}
              containerStyle={styles.dropdownContainer}
              style={styles.dropdownStyle}
            />
            <TextInput
              style={styles.input}
              value={capacity}
              placeholder="Capacity"
              onChangeText={setCapacity}
              keyboardType="numeric"
            />
            <DropDownPicker
              items={communityOptions}
              open={isOpen}
              setOpen={() => setIsOpen(!isOpen)}
              value={currentCommunityId}
              setValue={(val) => setCurrentCommunityId(val)}
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
      )}
    </SafeAreaView>
  );
};

export default CreateTrip;
