import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    TextInput,
    View,
} from "react-native";
import { createFilter } from 'react-native-search-filter';
import { Stack, useRouter } from "expo-router";
import { Text, SafeAreaView } from "react-native";

import { ScreenHeaderBtn } from "../../../components";
import { COLORS, icons, SIZES } from "../../../constants";
import styles from "../../../styles/searchtrips";
import TripCard from "../../../components/common/cards/trip/TripCard";

import { axiosInstance } from "../../../config/api";
import { useAuth } from "../../../context/auth";

const ListTrips = () => {
    const router = useRouter();
    const { user } = useAuth();

    const [masterData, setMasterData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [selectedTrip, setSelectedTrip] = useState();

    const handleSearch = async () => {
        setSearchLoader(true);
        setSearchResult([]);

        try {
            const response = await axiosInstance.get("/trips");
            setMasterData(response.data);
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

    const searchFilterFunction = (searchQuery) => {
        if (searchQuery) {
            const flattenedData = masterData.flat();
            const newData = flattenedData.filter(createFilter(searchQuery, ["title", "description", "community.name", "modeOfTransport", "fromDestination", "toDestination"], [{ fuzzy: true, sortResults: true }]));
            setSearchResult(newData);
        } else {
            setSearchResult(masterData);
        }
    };

    useEffect(() => {
        searchFilterFunction(searchTerm);
    }, [searchTerm]);

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

            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        value={searchTerm}
                        style={styles.searchInput}
                        onChangeText={(text) => setSearchTerm(text)}
                        placeholder={`Search for trips`}
                    />
                </View>
            </View>

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
                keyExtractor={(item) => item._id}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>{"Search Result :"}</Text>
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
                            Total {searchTerm} Trips : {searchResult.length}
                        </Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default ListTrips;
