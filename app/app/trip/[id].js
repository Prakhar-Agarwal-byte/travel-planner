import React from 'react';
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';

import { COLORS, icons } from '../../constants'
import { ScreenHeaderBtn } from '../../components'
import styles from '../../styles/tripdetails'
import TripMembersList from '../../components/trip/memberlist/MemberList';
import { useAuth } from "../../context/auth";
import useFetch from '../../hooks/useFetch';

const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString(undefined, options);
};

const TripDetails = () => {
    const router = useRouter()
    const { user } = useAuth();
    const params = useGlobalSearchParams();
    const handleJoinNow = () => {
        // Handle the logic for joining the trip
        console.log('User joined the trip');
    };

    const { data, isLoading, error } = useFetch(`trips/${params.id}`)

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
                        <ScreenHeaderBtn
                            iconUrl={{
                                uri: user?.profileImage
                            }}
                            dimension="100%"
                            handlePress={() => router.push("/profile")}
                        />
                    ),
                    headerTitle: ""
                }} />
            {isLoading ? (
                <ActivityIndicator size="large" colors={COLORS.primary} />
            ) : error ? (
                <Text>Something went wrong</Text>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <Text style={styles.heading}>Trip Details</Text>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.label}>Trip Admin:</Text>
                            <Text style={styles.value}>{data.createdBy?.name || 'Unknown'}</Text>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.label}>Source:</Text>
                            <Text style={styles.value}>{data.fromDestination}</Text>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.label}>Destination</Text>
                            <Text style={styles.value}>{data.toDestination}</Text>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.label}>Members:</Text>
                            {data.members?.map((member) => (
                                <Text style={styles.value}>{member?.name || 'Unknown'}</Text>
                            ))}
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.label}>Date:</Text>
                            <Text style={styles.value}>{formatDateTime(data.startDate)}</Text>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.label}>Vacant Seats:</Text>
                            <Text style={styles.value}>1</Text>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.label}>Mode of Transportation:</Text>
                            <Text style={styles.value}>{data.modeOfTransport}</Text>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.label}>Stops:</Text>
                            <Text style={styles.value}>Stop 1, Stop 2, Stop 3</Text>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.label}>Community:</Text>
                            <Text style={styles.value}>{data.community?.name || 'Unknown'}</Text>
                        </View>
                        <View style={styles.joinButtonContainer}>
                            <TouchableOpacity onPress={handleJoinNow} style={styles.joinButton}>
                                <Text style={styles.joinButtonText}>Join Now</Text>
                            </TouchableOpacity>
                        </View>
                        <TripMembersList id={params.id} />
                    </View>
                </ScrollView>
            )}
        </SafeAreaView >
    );
};

export default TripDetails;
