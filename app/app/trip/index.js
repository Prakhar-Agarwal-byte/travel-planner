import { useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, SIZES } from "../../constants";
import { ScreenHeaderBtn, Welcome, TripList } from "../../components";
import CreateButton from "../../components/common/button/create/CreateButton";
import { useAuth } from "../../context/auth";
import useFetch from "../../hooks/useFetch";

const Trip = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const activeTab = "Trip";

    const fetchTripsByStatus = (status) => {
        const { data: trips } = useFetch('trips', {
            tripStatus: status,
        })
        return trips;
    }

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
                        <ScreenHeaderBtn iconUrl={{
                            uri: user?.profileImage
                        }} dimension="100%" handlePress={() => router.push("/profile")} />
                    ),
                    headerTitle: ""
                }} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                >

                    <Welcome
                        welcomeMessage={"Trips around you"}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick={() => {
                            if (searchTerm) {
                                router.push(`/trip/${searchTerm}`)
                            }
                        }}
                        activeTab={activeTab}
                    />

                    <TripList trips={fetchTripsByStatus("new")} status="new" />
                    <TripList trips={fetchTripsByStatus("active")} status="active" />
                    <TripList trips={fetchTripsByStatus("joined")} status="joined" />
                    <TripList trips={fetchTripsByStatus("requested")} status="requested" />
                    <TripList trips={fetchTripsByStatus("completed")} status="completed" />
                </View>
            </ScrollView>
            <CreateButton activeTab={activeTab} />
        </SafeAreaView>
    );
};

export default Trip;
