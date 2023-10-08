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
import { COLORS, icons, SIZES } from "../../constants";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../../styles/createtrip";
import { ScreenHeaderBtn } from "../../components";
import { axiosInstance } from "../../config/api";
import { useAuth } from "../../context/auth";
import axios from "axios";
import MapboxPlacesAutocomplete from "react-native-mapbox-places-autocomplete";

const CreateTrip = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fromDestination, setFromDestination] = useState("");
  const [fromCoordinates, setFromCoordinates] = useState([]);
  const [toDestination, setToDestination] = useState("");
  const [toCoordinates, setToCoordinates] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [modeOfTransport, setModeOfTransport] = useState("");
  const [flightPriceData, setFlightPriceData] = useState({});
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
    { label: "Bicycle", value: "bicycle" },
    { label: "Ferry", value: "ferry" },
  ];
  const fetchData = async () => {
    try {
      const userId = user._id;
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
  useEffect(() => {
    fetchData();
  }, []);

  const fetchFlightPriceData = async (source, destination, date) => {
    const options = {
      method: "GET",
      url: "https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights",
      params: {
        sourceAirportCode: source,
        destinationAirportCode: destination,
        date: date,
        itineraryType: "ONE_WAY",
        sortOrder: "PRICE",
        numAdults: "1",
        numSeniors: "0",
        classOfService: "ECONOMY",
        pageNumber: "1",
        currencyCode: "USD",
      },
      headers: {
        "X-RapidAPI-Key": "7764ebe318mshaff88aa323487aap1d5bf4jsnd5861ae22850",
        "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log("Flight price data:", response.data.data);
      setFlightPriceData(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTrip = async () => {
    setLoading(true);
    const dateTimeString = `${startDate} ${startTime}`;
    const formattedDate = new Date(dateTimeString);
    let resp = {
      "flights": [
        {
          "purchaseLinks": [
            {
              "providerId": "",
              "currency": "",
              "totalPricePerPassenger": 0,
            }
          ]
        }
      ]
    };
    if (modeOfTransport === "flight") {
      resp = await fetchFlightPriceData(fromDestination, toDestination, startDate);
    }
    try {
      console.log("flight price data", resp)
      const response = await axiosInstance.post("/trips", {
        title,
        description,
        fromDestination,
        toDestination,
        fromCoordinates,
        toCoordinates,
        startDate: formattedDate,
        modeOfTransport,
        flightPriceData: resp,
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
      setFromCoordinates([]);
      setToCoordinates([]);
      setStartDate("");
      setStartTime("");
      setModeOfTransport("");
      setCapacity("");
      setCurrentCommunityId("Select Community");
      setFlightPriceData({});
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
              iconUrl={{
                uri: user?.profileImage,
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
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
              listMode="SCROLLVIEW"
            />
            {modeOfTransport === "flight" ? (<><TextInput
              style={styles.input}
              placeholder="Source Airport Code"
              value={fromDestination}
              onChangeText={setFromDestination}
            />
              <TextInput
                style={styles.input}
                placeholder="Destination Airport Code"
                value={toDestination}
                onChangeText={setToDestination}
              /></>) :
              (<><MapboxPlacesAutocomplete
                id="origin"
                placeholder="Source"
                accessToken={process.env.EXPO_PUBLIC_MAPBOX_TOKEN} // MAPBOX_PUBLIC_TOKEN is stored in .env root project folder
                onPlaceSelect={(data) => {
                  setFromDestination(data.place_name);
                  setFromCoordinates(data.center);
                }}
                onClearInput={({ id }) => {
                  id === "origin" &&
                    setFromDestination("") &&
                    setFromCoordinates([]);
                }}
                countryId="in"
                containerStyle={{
                  borderWidth: 2,
                  marginVertical: SIZES.small,
                  borderColor: COLORS.gray2,
                  borderRadius: SIZES.small,
                  height: 60,
                }}
              />
                <MapboxPlacesAutocomplete
                  id="origin"
                  placeholder="Destination"
                  accessToken={process.env.EXPO_PUBLIC_MAPBOX_TOKEN} // MAPBOX_PUBLIC_TOKEN is stored in .env root project folder
                  onPlaceSelect={(data) => {
                    setToDestination(data.place_name);
                    setToCoordinates(data.center);
                  }}
                  onClearInput={({ id }) => {
                    id === "origin" && setToDestination("") && setToCoordinates([]);
                  }}
                  countryId="in"
                  containerStyle={{
                    borderWidth: 2,
                    marginVertical: SIZES.small,
                    borderColor: COLORS.gray2,
                    borderRadius: SIZES.small,
                    height: 60,
                  }}
                /></>)}

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
              listMode="SCROLLVIEW"
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
