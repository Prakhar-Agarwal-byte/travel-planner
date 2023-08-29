import { useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, SIZES } from "../../constants";
import { ScreenHeaderBtn, Welcome, CommunityList } from "../../components";
import CreateButton from "../../components/common/button/create/CreateButton";
import { useAuth } from "../../context/auth";

const Community = () => {
    const router = useRouter()
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState("")
    const activeTab = "Community"
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
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                >

                    <Welcome
                        welcomeMessage={"Communities around you"}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick={() => {
                            if (searchTerm) {
                                router.push(`/community/${searchTerm}`)
                            }
                        }}
                        activeTab={activeTab}
                    />

          <CommunityList />
        </View>
      </ScrollView>
      <CreateButton activeTab={activeTab} />
    </SafeAreaView>
  );
};

export default Community;
