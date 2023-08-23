import { useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from '../../constants'
import { ScreenHeaderBtn, Welcome, TripList } from '../../components'

const Trip = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("")
    const activeTab = "Trip"
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
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                >

                    <Welcome
                        welcomeMessage={"Trips around you"}
                        isHomePage={false}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick={() => {
                            if (searchTerm) {
                                router.push(`/trip/${searchTerm}`)
                            }
                        }}
                        activeTab={activeTab}
                    />

                    <TripList />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Trip