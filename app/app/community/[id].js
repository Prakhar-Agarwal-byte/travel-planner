import React, { useState, useEffect } from 'react';
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';

import { COLORS, icons } from '../../constants'
import { ScreenHeaderBtn, TripList } from '../../components'
import styles from '../../styles/communitydetails'
import CommunityMembersList from '../../components/community/memberlist/MemberList';
import CommunityPermissionList from '../../components/community/permissionlist/PermissionList';
import { useAuth } from "../../context/auth";
import useFetch from '../../hooks/useFetch';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { axiosInstance } from '../../config/api';

const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString(undefined, options);
};

const CommunityDetails = () => {
    const params = useGlobalSearchParams();
    const router = useRouter()
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`communities/${params.id}`);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params.id]); // Fetches data when the component  is mounted and when params.id is changed

    const handleJoinNow = async () => {
        try {
            const response = await axiosInstance.patch(`/communities/${params.id}/join-request`)
            console.log('Join request sent successfully', response);
            fetchData(); // Fetching data again after making the request
        } catch (error) {
            console.error('Error sending join request', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete(`/communities/${params.id}`)
            console.log('Community deleted successfully', response);
            router.push('/community');
        } catch (error) {
            console.error('Error deleting the community', error);
        }
    }

    const handleLeave = async () => {
        try {
            const response = await axiosInstance.delete(`/communities/${params.id}/leave`)
            console.log('Community left successfully', response);
            router.push('/community');
        } catch (error) {
            console.error('Error leaving the community', error);
        }
    }

    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
                <ActivityIndicator size="large" colors={COLORS.primary} />
            </SafeAreaView>
        );
    }

    if (error) {
        console.error(error);
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
                <Text>Something went wrong</Text>
            </SafeAreaView>
        );
    }

    const isMember = data.members?.some(member => member._id === user?._id);
    const isAdmin = data.createdBy?._id === user?._id;
    const requestSent = data.pendingJoinRequests?.some(member => member._id === user?._id);

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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.communityName}>{data.name}</Text>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Description:</Text>
                        <Text style={styles.value}>
                            {data.description}
                        </Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Admin:</Text>
                        <Text style={styles.value}>
                            {data.createdBy?.name || 'Unknown'}
                        </Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Founded:</Text>
                        <Text style={styles.value}>
                            {formatDateTime(data.createdAt)}
                                           </Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Location:</Text>
                    <Text style={styles.value}>
                        {data.location}
                    </Text>
                </View>
                <View style={styles.buttonsContainer}>
                    {isMember ? (
                        <TouchableOpacity style={styles.joinedButton}>
                            <Text style={styles.joinButtonText}>Joined</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={handleJoinNow} style={styles.joinButton} disabled={requestSent}>
                            <Text style={styles.joinButtonText}>{requestSent ? "Request Sent" : "Join Now"}</Text>
                        </TouchableOpacity>
                    )}
                    {isAdmin ? (
                        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                            <Ionicons name="trash" size={23} color={COLORS.white} />
                        </TouchableOpacity>
                    ) : isMember ? (
                        <TouchableOpacity onPress={handleLeave} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Leave</Text>
                            <MaterialIcons name="logout" size={25} color={COLORS.white} />
                        </TouchableOpacity>
                    ) : null}
                </View>
                <CommunityMembersList id={params.id} members={data.members} isAdmin={isAdmin} />
                <TripList trips={data.trips} status="associated" />
                {(isAdmin && data.pendingJoinRequests?.length > 0) && <CommunityPermissionList id={params.id} requests={data.pendingJoinRequests} />}
            </View>
        </ScrollView>
    </SafeAreaView>
);
};

export default CommunityDetails;

