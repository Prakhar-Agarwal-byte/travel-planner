import { useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../../constants";
import { ScreenHeaderBtn, Welcome, TripList } from "../../components";
import CreateButton from "../../components/common/button/create/CreateButton";
import { axiosInstance } from "../../config/api";

const Trip = () => {
  const router = useRouter();
  const [trips, setTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const activeTab = "Trip";

  useEffect(async () => {
    // Fetch trip data using Axios
    const response = await axiosInstance.get("/trip");
    setTrips(response.data);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          // headerLeft: () => (
          //     <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          // ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            welcomeMessage={"Trips for you"}
            isHomePage={false}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/trip/${searchTerm}`);
              }
            }}
            activeTab={activeTab}
          />

          <TripList />
        </View>
      </ScrollView>
      <CreateButton activeTab={activeTab} />
    </SafeAreaView>
  );
};

export default Trip;
