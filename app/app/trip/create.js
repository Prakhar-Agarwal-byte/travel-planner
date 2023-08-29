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
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images } from "../../constants";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../../styles/createtrip";
import { ScreenHeaderBtn } from "../../components";
import { axiosInstance } from "../../config/api";
import { useAuth } from "../../context/auth";

const CreateTrip = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fromDestination, setFromDestination] = useState("");
  const [toDestination, setToDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [modeOfTransport, setModeOfTransport] = useState("");
  const [capacity, setCapacity] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isTransportOpen, setIsTransportOpen] = useState(false);
  const [currentCommunityId, setCurrentCommunityId] =
    useState("Select Community");
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
        const userId = user.id;

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
    const dateTimeString = `${startDate} ${startTime}`;
    const formattedDate = new Date(dateTimeString);

    try {
      const response = await axiosInstance.post("/trips", {
        title,
        description,
        fromDestination,
        toDestination,
        startDate: formattedDate,
        modeOfTransport,
        capacity,
        communityId: currentCommunityId,
      });
      console.log("New trip created:", response.data);
    } catch (error) {
      console.error("Error creating trip:", error);
    } finally {
      setLoading(false);
      setTitle("");
      setDescription("");
      setFromDestination("");
      setToDestination("");
      setStartDate("");
      setStartTime("");
      setModeOfTransport("");
      setCapacity("");
      setCurrentCommunityId("Select Community");
      router.push("/trip");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.logo}
              dimension="100%"
              handlePress={() => router.push("/")}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={user.profileImage}
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
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              value={startDate}
              onChangeText={setStartDate}
            />
            <TextInput
              style={styles.input}
              placeholder="Time (HH:MM)"
              value={startTime}
              onChangeText={setStartTime}
            />
            <DropDownPicker
              items={transportOptions}
              open={isTransportOpen}
              setOpen={() => setIsTransportOpen(!isTransportOpen)}
              value={modeOfTransport}
              setValue={(val) => setModeOfTransport(val)}
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
