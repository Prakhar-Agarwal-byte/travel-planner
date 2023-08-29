import React, { useState, useEffect } from 'react';
import { Stack, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

import { COLORS, icons, images } from '../../constants'
import { ScreenHeaderBtn } from '../../components'
import styles from '../../styles/tripdetails'
import TripMembersList from '../../components/trip/memberlist/MemberList';
import { axiosInstance } from '../../config/api';

const TripDetails = () => {
    const router = useRouter();

    const [joinStatus, setJoinStatus] = useState('not_joined');
    const [tripDetails, setTripDetails] = useState({});

    useEffect(() => {
        // Fetch trip details from backend API
        axiosInstance.get('/trip/details')
            .then(response => {
                const details = response.data;
                setTripDetails(details);
            })
            .catch(error => {
                console.error('Error fetching trip details:', error);
            });

        // Fetch user's join status
        axiosInstance.get('/trips/join-status')
            .then(response => {
                const status = response.data.status;
                setJoinStatus(status);
            })
            .catch(error => {
                console.error('Error fetching join status:', error);
            });
    }, []);

    const handleJoinNow = () => {
        if (joinStatus === 'not_joined') {
            //joining the trip
            axiosInstance.post('/api/trip/join')
                .then(response => {
                    setJoinStatus('requested');
                    console.log('User requested to join the trip');
                })
                .catch(error => {
                    console.error('Error joining the trip:', error);
                });
        } else if (joinStatus === 'requested') {
            // canceling the join request
            axiosInstance.post('/api/trip/cancel-request')
                .then(response => {
                    setJoinStatus('not_joined');
                    console.log('User canceled join request');
                })
                .catch(error => {
                    console.error('Error canceling join request:', error);
                });
        } else if (joinStatus === 'joined') {
            //leaving the trip
            axiosInstance.post('/api/trip/leave')
                .then(response => {
                    setJoinStatus('not_joined');
                    console.log('User left the trip');
                })
                .catch(error => {
                    console.error('Error leaving the trip:', error);
                });
        }
    };

    const getJoinButtonLabel = () => {
        if (joinStatus === 'not_joined') {
            return 'Join Now';
        } else if (joinStatus === 'requested') {
            return 'Requested';
        } else if (joinStatus === 'joined') {
            return 'Leave';
        }
    };

    const getJoinButtonStyle = () => {
        if (joinStatus === 'joined') {
            return styles.leaveButton;
        }
        return styles.joinButton;
    };

    const isJoinButtonDisabled = () => {
        return joinStatus === 'requested';
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
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.heading}>Trip Details</Text>
                    {/* Display trip details */}     
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Trip Admin:</Text>
                        <Text style={styles.value}>{tripDetails.admin}</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Source:</Text>
                        <Text style={styles.value}>{tripDetails.source}</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Destination</Text>
                        <Text style={styles.value}>{tripDetails.destination}</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Date:</Text>
                        <Text style={styles.value}>{tripDetails.date}</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Start Time:</Text>
                        <Text style={styles.value}>{tripDetails.time}</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Vacant Seats:</Text>
                        <Text style={styles.value}>{tripDetails.vacancy}</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Mode of Transportation:</Text>
                        <Text style={styles.value}>{tripDetails.mode}</Text>
                    </View>
                   
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Community:</Text>
                        <Text style={styles.value}>{tripDetails.community}</Text>
                    </View>
                    <View style={styles.joinButtonContainer}>
                        <TouchableOpacity
                            onPress={handleJoinNow}
                            style={[getJoinButtonStyle(), isJoinButtonDisabled() && styles.disabledButton]}
                            disabled={isJoinButtonDisabled()}
                        >
                            <Text style={styles.joinButtonText}>{getJoinButtonLabel()}</Text>
                        </TouchableOpacity>
                    </View>
                    <TripMembersList />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TripDetails;
