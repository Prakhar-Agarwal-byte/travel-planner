import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { Stack } from 'expo-router';

import { COLORS, icons, images } from '../../constants';
import { CommunityList, ScreenHeaderBtn, TripList } from '../../components';
import styles from '../../styles/profile';

const Profile = () => {
    const activeTabs = ['Trip', 'Community'];
    const [activeTab, setActiveTab] = useState('Trip');
    const [searchText, setSearchText] = useState('');

    const user = {
        name: 'Adarsh',
        email: 'adarsh@gmail.com',
        profileImage: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    };

    const RenderTabContent = () => {
        if (activeTab === 'Trip') {
            return (
                <TripList />
            );
        } else if (activeTab === 'Community') {
            return (
                <CommunityList />
            );
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />,
                    headerRight: () => <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />,
                    headerTitle: '',
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                    <View>
                        <View style={styles.searchContainer}>
                            <View style={styles.searchWrapper}>
                                <TextInput
                                    style={styles.searchInput}
                                    value={searchText}
                                    onChangeText={(text) => setSearchText(text)}
                                    placeholder={`Search for ${activeTab}`}
                                />
                            </View>
                            <TouchableOpacity
                                key={`search-${searchText}`}
                                style={styles.searchBtn}
                                onPress={() => {
                                    if (searchText) {
                                        router.push(`/trip/${searchText}`);
                                    }
                                }}
                            >
                                <Image
                                    source={icons.search}
                                    resizeMode="contain"
                                    style={styles.searchBtnImage}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.tabsContainer}>
                            {activeTabs.map(item => (
                                <View style={styles.tabsWrapper} >
                                    <TouchableOpacity
                                        key={item}
                                        style={styles.tab(activeTab, item)}
                                        onPress={() => setActiveTab(item)}
                                    >
                                        <Text style={styles.tabText(activeTab, item)}>{item}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        <RenderTabContent />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default Profile;
