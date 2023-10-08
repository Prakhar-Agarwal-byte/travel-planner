import React, { useEffect, useState } from "react";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { COLORS, icons } from "../../constants";
import { ScreenHeaderBtn } from "../../components";
import styles from "../../styles/tripdetails";
import TripMembersList from "../../components/trip/memberlist/MemberList";
import TripPermissionList from "../../components/trip/permissionlist/PermissionList";
import { useAuth } from "../../context/auth";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { axiosInstance } from "../../config/api";
import BarGraph from "../../components/common/graph/bargraph/Bargraph";

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};

const TripDetails = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [tripData, setTripData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flights, setFlights] = useState([]);
  const params = useGlobalSearchParams();
  const handleJoinNow = async () => {
    try {
      const response = await axiosInstance.patch(
        `/trips/${params.id}/join-request`
      );
      console.log("Join request sent successfully", response);
    } catch (error) {
      console.error("Error sending join request", error);
    }
  };

  const handleComplete = async () => {
    try {
      const response = await axiosInstance.patch(
        `/trips/${params.id}/complete`
      );
      console.log("Trip marked as complete successfully", response);
    } catch (error) {
      console.error("Error marking trip as complete", error);
    }
  };
  const handleSOS = async () => {
    try {
      const response = await axiosInstance.post(
        `/trips/${params.id}/emergency`
      );
      console.log("SoS mail sent to every trip member successfully.", response);
    } catch (error) {
      console.error("Error sending SoS.", error);
    }
  };

  const handleTrack = () => {
    router.push({
      pathname: "/navigation",
      params: {
        fromCoordinates: tripData.fromCoordinates,
        toCoordinates: tripData.toCoordinates,
      },
    });
    console.log("data: ", data);
    console.log("fromCoordinates: ", tripData.fromCoordinates);
    console.log("toCoordinates: ", tripData.toCoordinates);
  };

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/trips/${params.id}`);
      console.log("Trip deleted successfully", response);
    } catch (error) {
      console.error("Error deleting the trip", error);
    } finally {
      router.push("/trip");
    }
  };

  const handleLeave = async () => {
    try {
      const response = await axiosInstance.delete(`/trips/${params.id}/leave`);
      console.log("Trip left successfully", response);
    } catch (error) {
      console.error("Error leaving the trip", error);
    } finally {
      router.push("/trip");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/trips/${params.id}`)
      setTripData(response.data)
      setFlights(response.data.flightPriceData.flights)
      setIsLoading(false)
    } catch (error) {
      setError(error)
      alert('There is an error')
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    setIsLoading(true)
    fetchData()
  }, [])

  const isMember = tripData.members?.some((member) => member._id === user?._id);
  const isAdmin = tripData.createdBy?._id === user?._id;
  const requestSent = tripData.pendingJoinRequests?.some(
    (member) => member._id === user?._id
  );
  const tripStarted = new Date().toISOString() > tripData.startDate;
  const isCompleted = tripData.isCompleted;

  console.log("Trip details:", tripData);

  const flightData = flights.map((flight) => {
    return flight.purchaseLinks.map((purchaseLink) => {
      return {
        providerId: purchaseLink.providerId,
        totalPricePerPassenger: purchaseLink.totalPricePerPassenger,
      };
    });
  }).flat();

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
      {isLoading ? (
        <ActivityIndicator size="large" colors={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.tripName}>{tripData.title}</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Description:</Text>
              <Text style={styles.value}>{tripData.description}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Admin:</Text>
              <Text style={styles.value}>
                {tripData.createdBy?.name || "Unknown"}
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Source:</Text>
              <Text style={styles.value}>{tripData.fromDestination}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Destination</Text>
              <Text style={styles.value}>{tripData.toDestination}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.value}>{formatDateTime(tripData.startDate)}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Vacant Seats:</Text>
              <Text style={styles.value}>{tripData.capacity}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Mode of Transportation:</Text>
              <Text style={styles.value}>{tripData.modeOfTransport}</Text>
            </View>
            {tripData.modeOfTransport == "flight" ? (flights &&
              <>
                <Text style={styles.graphTitle}>Flight Prices:</Text>
                <BarGraph data={flightData} />
              </>) : null}
            <View style={styles.buttonsContainer}>
              {isMember ? (
                <TouchableOpacity style={styles.joinedButton}>
                  <Text style={styles.joinButtonText}>Joined</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleJoinNow}
                  style={styles.joinButton}
                  disabled={requestSent}
                >
                  <Text style={styles.joinButtonText}>
                    {requestSent ? "Request Sent" : "Join Now"}
                  </Text>
                </TouchableOpacity>
              )}
              {isAdmin && tripStarted && !isCompleted && (
                <TouchableOpacity
                  onPress={handleComplete}
                  style={styles.joinButton}
                >
                  <Text style={styles.joinButtonText}>Mark as Complete</Text>
                </TouchableOpacity>
              )}
              
              {isMember && tripStarted && !isCompleted && (
                <TouchableOpacity onPress={handleSOS} style={styles.sosButton}>
                  <Text style={styles.joinButtonText}>SOS</Text>
                </TouchableOpacity>
              )}
              {isMember && tripStarted && !isCompleted && (
                <TouchableOpacity
                  onPress={handleTrack}
                  style={styles.trackButton}
                >
                  <Text style={styles.joinButtonText}>Track</Text>
                </TouchableOpacity>
              )}
            </View>
            <TripMembersList
              id={params.id}
              members={tripData.members}
              isAdmin={isAdmin}
            />
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Associated Community</Text>
            </View>
            <TouchableOpacity
              style={styles.communityContainer}
              onPress={() => router.push(`/community/${tripData.community?._id}`)}
            >
              <View style={styles.logoContainer}>
                <Image
                  source={icons.community}
                  resizeMode="contain"
                  style={styles.logoImage}
                />
              </View>
              <Text style={styles.communityName}>{tripData.community?.name}</Text>
            </TouchableOpacity>
            {isAdmin && tripData.pendingJoinRequests?.length > 0 && (
              <TripPermissionList
                id={params.id}
                requests={tripData.pendingJoinRequests}
              />
            )}
            <View style={styles.buttonsContainer}>
            {isAdmin ? (
                <TouchableOpacity
                  onPress={handleDelete}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                  <Ionicons name="trash" size={23} color={COLORS.white} />
                </TouchableOpacity>
              ) : isMember ? (
                <TouchableOpacity
                  onPress={handleLeave}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>Leave</Text>
                  <MaterialIcons name="logout" size={25} color={COLORS.white} />
                </TouchableOpacity>
              ) : null}
              </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default TripDetails;
