import { View, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, SIZES } from "../../constants";
import { ScreenHeaderBtn, Welcome, CommunityList } from "../../components";
import CreateButton from "../../components/common/button/create/CreateButton";
import { useAuth } from "../../context/auth";
import useFetch from "../../hooks/useFetch";

const Community = () => {
    const router = useRouter()
    const { user } = useAuth();
    const activeTab = "Community"

    const fetchCommunitiesByStatus = (status) => {
        const { data } = useFetch('communities', {
            communityStatus: status,
        })
        return data;
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
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                >
                    <Welcome
                        welcomeMessage={"Communities around you"}
                        activeTab={activeTab}
                    />

                    <CommunityList communities={fetchCommunitiesByStatus("new")} status="new" />
                    <CommunityList communities={fetchCommunitiesByStatus("joined")} status="joined" />
                    <CommunityList communities={fetchCommunitiesByStatus("requested")} status="requested" />

                </View>
            </ScrollView>
            <CreateButton activeTab={activeTab} />
        </SafeAreaView>
    );
};

export default Community;
