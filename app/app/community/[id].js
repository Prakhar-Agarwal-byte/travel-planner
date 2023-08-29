import React from 'react';
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

import { COLORS, icons } from '../../constants'
import { ScreenHeaderBtn } from '../../components'
import styles from '../../styles/communitydetails'
import CommunityMembersList from '../../components/community/memberlist/MemberList';

import { useAuth } from "../../context/auth";
import useFetch from '../../hooks/useFetch';

const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString(undefined, options);
};

const CommunityDetails = () => {
    const params = useGlobalSearchParams();
    const router = useRouter()
    const { user } = useAuth();
    const handleJoinCommunity = () => {
        // Handle the logic for joining the community
        console.log('User joined the community');
    };

    const { data, error } = useFetch(`communities/${params.id}`)
    console.log(data)
    if (error) {
        console.log(error);
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
                        <ScreenHeaderBtn iconUrl={user.profileImage} dimension="100%" handlePress={() => router.push("/profile")} />
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
                        <Text style={styles.label}>Members:</Text>
                        <Text style={styles.value}>
                            {data.members?.map((member) => (
                                <Text style={styles.value}>{member?.name || 'Unknown'}</Text>
                            ))}
                        </Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Trips:</Text>
                        <Text style={styles.value}>
                            {data.trips?.map((trip) => (
                                <Text style={styles.value}>{trip?.title}</Text>
                            ))}
                        </Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Founded:</Text>
                        <Text style={styles.value}>
                            {formatDateTime(data.createdAt)}
                        </Text>
                    </View>
                    <View style={styles.joinButtonContainer}>
                        <TouchableOpacity onPress={handleJoinCommunity} style={styles.joinButton}>
                            <Text style={styles.joinButtonText}>Join Now</Text>
                        </TouchableOpacity>
                    </View>
                    <CommunityMembersList id={params.id} />
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default CommunityDetails;
