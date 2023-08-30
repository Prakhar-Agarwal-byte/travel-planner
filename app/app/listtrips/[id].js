import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    View,
} from "react-native";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { Text, SafeAreaView } from "react-native";

import { ScreenHeaderBtn } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import styles from "../../styles/listtrips";
import TripCard from "../../components/common/cards/trip/TripCard";

import { axiosInstance } from "../../config/api";
import { useAuth } from "../../context/auth";

const ListTrips = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();
    const { user } = useAuth();

    const [searchResult, setSearchResult] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [selectedTrip, setSelectedTrip] = useState();

    const handleSearch = async () => {
        setSearchLoader(true);
        setSearchResult([]);

        try {
            const response = await axiosInstance.get("/trips", {
                params: {
                    tripStatus: params.id,
                },
            });
            setSearchResult(response.data);
        } catch (error) {
            setSearchError(error);
            console.log(error);
        } finally {
            setSearchLoader(false);
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.logo}
                            dimension='100%'
                            handlePress={() => router.push("/")}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={{
                                uri: user?.profileImage
                            }}
                            dimension="100%"
                            handlePress={() => router.push("/profile")}
                        />
                    ),
                    headerTitle: "",
                }}
            />

            <FlatList
                data={searchResult}
                renderItem={({ item }) => (
                    <TripCard
                        trip={item}
                        selectedTrip={selectedTrip}
                        handleNavigate={() => {
                            setSelectedTrip(item._id);
                            router.push(`/trip/${item._id}`);
                        }}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>{params.id + " Trips"}</Text>
                            <Text style={styles.noOfTrips}>{params.id}</Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {searchLoader ? (
                                <ActivityIndicator size="large" color={COLORS.primary} />
                            ) : (
                                searchError && <Text>Oops something went wrong</Text>
                            )}
                        </View>
                    </>
                )}
                ListFooterComponent={() => (
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>
                            Total {params.id} Trips: {searchResult.length}
                        </Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default ListTrips;
