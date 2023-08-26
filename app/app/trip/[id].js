import React from 'react';
import { Stack, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

import { COLORS, icons, images } from '../../constants'
import { ScreenHeaderBtn } from '../../components'
import styles from '../../styles/tripdetails'
import TripMembersList from '../../components/trip/memberlist/MemberList';

const TripDetails = () => {
    const router = useRouter()
    const handleJoinNow = () => {
        // Handle the logic for joining the trip
        console.log('User joined the trip');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.chevronLeft} dimension="70%" handlePress={() => router.back()} />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" handlePress={() => router.push("/profile/guv")} />
                    ),
                    headerTitle: ""
                }} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.heading}>Trip Details</Text>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Trip Admin:</Text>
                        <Text style={styles.value}>Akash</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Source:</Text>
                        <Text style={styles.value}>Varanasi</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Destination</Text>
                        <Text style={styles.value}>New Delhi</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>members:</Text>
                        <Text style={styles.value}>Prakhar, Adarsh</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Date:</Text>
                        <Text style={styles.value}>August 25, 2023</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Start Time:</Text>
                        <Text style={styles.value}>10:00 AM</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Vacant Seats:</Text>
                        <Text style={styles.value}>1</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Mode of Transportation:</Text>
                        <Text style={styles.value}>Car</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Stops:</Text>
                        <Text style={styles.value}>Stop 1, Stop 2, Stop 3</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Community:</Text>
                        <Text style={styles.value}>Travel Enthusiasts</Text>
                    </View>
                    <View style={styles.joinButtonContainer}>
                        <TouchableOpacity onPress={handleJoinNow} style={styles.joinButton}>
                            <Text style={styles.joinButtonText}>Join Now</Text>
                        </TouchableOpacity>
                    </View>
                    <TripMembersList />
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default TripDetails;