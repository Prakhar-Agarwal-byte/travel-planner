import React from 'react';
import { Stack } from "expo-router";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

import { COLORS, icons, images } from '../../constants'
import { ScreenHeaderBtn } from '../../components'
import styles from '../../styles/communitydetails'
import CommunityMembersList from '../../components/community/memberlist/MemberList';

const CommunityDetails = () => {
    const handleJoinCommunity = () => {
        // Handle the logic for joining the community
        console.log('User joined the community');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
                    ),
                    headerTitle: ""
                }} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.communityName}>Adventure Explorers</Text>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Description:</Text>
                        <Text style={styles.value}>
                            A community for adventure enthusiasts to share experiences and plan trips.
                        </Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Admin:</Text>
                        <Text style={styles.value}>
                            Akash
                        </Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Members:</Text>
                        <Text style={styles.value}>200+</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Trips:</Text>
                        <Text style={styles.value}>20</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Founded:</Text>
                        <Text style={styles.value}>January 2022</Text>
                    </View>
                    <View style={styles.joinButtonContainer}>
                        <TouchableOpacity onPress={handleJoinCommunity} style={styles.joinButton}>
                            <Text style={styles.joinButtonText}>Join Now</Text>
                        </TouchableOpacity>
                    </View>
                    <CommunityMembersList />
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default CommunityDetails;