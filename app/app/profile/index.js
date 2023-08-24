import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, FlatList, SafeAreaView } from 'react-native';
import { Stack } from "expo-router";

import { COLORS, icons, images } from '../../constants'
import { ScreenHeaderBtn } from '../../components'
import styles from '../../styles/profile'

const Profile = () => {
    const [activeTab, setActiveTab] = useState('trips');
    const [searchText, setSearchText] = useState('');

    const user = {
        name: 'Adarsh',
        email: 'adarsh@gmail.com',
        profileImage: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    };

    const trips = [
        { id: 1, title: 'Mountain Adventure', date: 'August 2023' },
        { id: 2, title: 'Beach Getaway', date: 'July 2023' },
    ];

    const communities = [
        { id: 1, name: 'Adventure Explorers' },
        { id: 2, name: 'Nature Lovers' },
    ];

    const filteredTrips = trips.filter(trip => trip.title.toLowerCase().includes(searchText.toLowerCase()));
    const filteredCommunities = communities.filter(community => community.name.toLowerCase().includes(searchText.toLowerCase()));

    const renderTabContent = () => {
        if (activeTab === 'trips') {
            return (
                <FlatList
                    data={filteredTrips}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.tabContent}>
                            <Text style={styles.tripTitle}>{item.title}</Text>
                            <Text style={styles.tripDate}>{item.date}</Text>
                        </View>
                    )}
                />
            );
        } else if (activeTab === 'communities') {
            return (
                <FlatList
                    data={filteredCommunities}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.tabContent}>
                            <Text style={styles.communityName}>{item.name}</Text>
                        </View>
                    )}
                />
            );
        }
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
            <View style={styles.container}>
                <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <TouchableOpacity style={styles.editProfileButton}>
                    <Text style={styles.editProfileButtonText}>Edit Profile</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search..."
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                />
                <View style={styles.tabsContainer}>
                    <TouchableOpacity
                        onPress={() => setActiveTab('trips')}
                        style={[styles.tab, activeTab === 'trips' && styles.activeTab]}
                    >
                        <Text style={[styles.tabText, activeTab === 'trips' && styles.activeTabText]}>Trips</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setActiveTab('communities')}
                        style={[styles.tab, activeTab === 'communities' && styles.activeTab]}
                    >
                        <Text style={[styles.tabText, activeTab === 'communities' && styles.activeTabText]}>Communities</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.tabContentsContainer}>{renderTabContent()}</View>
            </View>
        </SafeAreaView>
    );
};

export default Profile;