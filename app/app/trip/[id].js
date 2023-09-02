import React, { useState } from 'react';
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';

import { COLORS, icons } from '../../constants'
import { ScreenHeaderBtn } from '../../components'
import styles from '../../styles/tripdetails'
import TripMembersList from '../../components/trip/memberlist/MemberList';
import TripPermissionList from '../../components/trip/permissionlist/PermissionList';
import { useAuth } from "../../context/auth";
import useFetch from '../../hooks/useFetch';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { axiosInstance } from '../../config/api';

const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString(undefined, options);
};

const TripDetails = () => {
    const router = useRouter()
    const { user } = useAuth();
    const params = useGlobalSearchParams();
    const [estimatedPriceRange, setEstimatedPriceRange] = useState("Unknown");
    const [joinButtonText, setJoinButtonText] = useState("Join Now");
    const handleJoinNow = async () => {
        try {
            const response = await axiosInstance.post(`/trips/${params.id}/join`)
            console.log('Join request sent successfully', response)
        } catch (error) {
            console.error('Error sending join request', error)
        } finally {
            setJoinButtonText("Request Sent");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete(`/trips/${params.id}`)
            console.log('Trip deleted successfully', response);
        } catch (error) {
            console.error('Error deleting the trip', error);
        } finally {
            router.push('/trip');
        }
    };

    const handleLeave = async () => {
        try {
            const response = await axiosInstance.delete(`/trips/${params.id}/leave`)
            console.log('Trip left successfully', response);
        } catch (error) {
            console.error('Error leaving the trip', error);
        } finally {
            router.push('/trip');
        }
    };

    const { data, isLoading, error } = useFetch(`trips/${params.id}`)
    console.log('Trip details:', data);

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
                            <Text style={styles.label}>Date:</Text>
                            <Text style={styles.value}>{formatDateTime(data.startDate)}</Text>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.label}>Vacant Seats:</Text>
                            <Text style={styles.value}>{data.capacity}</Text>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.label}>Mode of Transportation:</Text>
                            <Text style={styles.value}>{data.modeOfTransport}</Text>
                        </View>
                        {(data.modeOfTransport === 'flight') && (<View style={styles.detailsContainer}>
                            <Text style={styles.label}>Estimated Price Range:</Text>
                            <Text style={styles.value}>{estimatedPriceRange}</Text>
                        </View>)}
                        <View style={styles.buttonsContainer}>
                            {data.members?.some(member => member._id === user?._id) ? (
                                <TouchableOpacity style={styles.joinedButton}>
                                    <Text style={styles.joinButtonText}>Joined</Text>
                                </TouchableOpacity>

                            ) : (
                                <TouchableOpacity onPress={handleJoinNow} style={styles.joinButton}>
                                    <Text style={styles.joinButtonText}>{joinButtonText}</Text>
                                </TouchableOpacity>
                            )}
                            {(data.createdBy?._id === user?._id) ? (
                                <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                                    <Text style={styles.deleteButtonText}>Delete</Text>
                                    <Ionicons name="trash" size={23} color={COLORS.white} />
                                </TouchableOpacity>
                            ) : data.members?.some(member => member._id === user?._id) ? (
                                <TouchableOpacity onPress={handleLeave} style={styles.deleteButton}>
                                    <Text style={styles.deleteButtonText}>Leave</Text>
                                    <MaterialIcons name="logout" size={25} color={COLORS.white} />
                                </TouchableOpacity>
                            ) : null}
                        </View>
                        <TripMembersList id={params.id} members={data.members} isAdmin={data.createdBy?._id === user?._id} />
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Associated Community</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.communityContainer}
                            onPress={() => router.push(`/community/${data.community?._id}`)}
                        >
                            <TouchableOpacity style={styles.logoContainer} key={data.community?._id}>
                                <Image
                                    source={icons.community}
                                    resizeMode='contain'
                                    style={styles.logoImage}
                                />
                            </TouchableOpacity>

                            <Text style={styles.communityName}>{data.community?.name}</Text>
                        </TouchableOpacity>

                        {(data.createdBy?._id === user?._id && data.pendingJoinRequests?.length > 0) && <TripPermissionList id={params.id} requests={data.pendingJoinRequests} />}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView >
    );
};

export default TripDetails;
