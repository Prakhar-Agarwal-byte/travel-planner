import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons } from "../../constants";
import { ScreenHeaderBtn } from "../../components";
import styles from "../../styles/profile";

import { useAuth } from "../../context/auth";

const Profile = () => {
    const router = useRouter();
    const { signOut, user } = useAuth();
    const activeTabs = ["Trip", "Community"];
    const [activeTab, setActiveTab] = useState("Trip");

    const TripButton = ({ status }) => {
        return (
            <TouchableOpacity
                style={styles.tripContainer}
                onPress={() => router.push(`/listtrips/${status}`)}
            >
                <View style={styles.logoContainer}>
                    <Image
                        source={icons.trip}
                        resizeMode="contain"
                        style={styles.logoImage}
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.tripStatus}>{status} Trips</Text>
                </View>
                <View style={styles.logoContainer}>
                    <Image
                        source={icons.chevronRight}
                        resizeMode="contain"
                        style={styles.logoImage}
                    />
                </View>
            </TouchableOpacity>
        );
    };
    const CommunityButton = ({ status }) => {
        return (
            <TouchableOpacity
                style={styles.communityContainer}
                onPress={() => router.push(`/listcommunities/${status}`)}
            >
                <View style={styles.logoContainer}>
                    <Image
                        source={icons.community}
                        resizeMode='contain'
                        style={styles.logoImage}
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.tripStatus}>{status} Communities</Text>
                </View>
                <View style={styles.logoContainer} >
                    <Image
                        source={icons.chevronRight}
                        resizeMode='contain'
                        style={styles.logoImage}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    const RenderTabContent = () => {
        if (activeTab === 'Trip') {
            return (
                <View>
                    <TripButton status='active' />
                    <TripButton status='joined' />
                    <TripButton status='requested' />
                    <TripButton status='completed' />
                </View>
            );
        } else if (activeTab === 'Community') {
            return (
                <View>
                    <CommunityButton status='joined' />
                    <CommunityButton status='requested' />

                </View>
            );
        }
    };



    const handleLogout = () => {
        signOut();
    };

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
                        <ScreenHeaderBtn iconUrl={{
                            uri: user?.profileImage
                        }} dimension="100%" />
                    ),
                    headerTitle: "",
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Image
                        source={{ uri: user?.profileImage }}
                        style={styles.profileImage}
                    />
                    <Text style={styles.userName}>{user?.name}</Text>
                    <Text style={styles.userEmail}>{user?.email}</Text>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>

                    <View>
                        <View style={styles.tabsContainer}>
                            {activeTabs.map((item) => (
                                <View style={styles.tabsWrapper}>
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
        </SafeAreaView>
    );
};

export default Profile;
