import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { Text, SafeAreaView } from "react-native";

import { ScreenHeaderBtn } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import styles from "../../styles/listtrips";
import TripCard from "../../components/common/cards/trip/TripCard";
import { axiosInstance } from "../../config/api";

const ListTrips = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();

  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);
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

  const handlePagination = (direction) => {
    if (direction === "left" && page > 1) {
      setPage(page - 1);
      handleSearch();
    } else if (direction === "right") {
      setPage(page + 1);
      handleSearch();
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
          // headerLeft: () => (
          //     <ScreenHeaderBtn
          //         iconUrl={icons.chevronLeft}
          //         dimension='60%'
          //         handlePress={() => router.back()}
          //     />
          // ),
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
              setSelectedTrip(item.id);
              router.push(`/trip/${item.id}`);
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
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("left")}
            >
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("right")}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ListTrips;
