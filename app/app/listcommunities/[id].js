import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'

import { ScreenHeaderBtn } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import styles from '../../styles/listcommunities'
import CommunityCard from '../../components/common/cards/community/CommunityCard'
import { axiosInstance } from '../../config/api'


const ListCommunities = () => {
    const params = useGlobalSearchParams();
    const router = useRouter()

    const [searchResult, setSearchResult] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [page, setPage] = useState(1);
    const [selectedCommunity, setSelectedCommunity] = useState();

    const handleSearch = async () => {
        setSearchLoader(true);
        setSearchResult([])

        try {
            const response = await axiosInstance.get('/communities', {
                params: {
                    Status: params.id,
                },
            })
            setSearchResult(response.data);
        } catch (error) {
            setSearchError(error);
            console.log(error);
        } finally {
            setSearchLoader(false);
        }
    };

    

    useEffect(() => {
        handleSearch()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.chevronLeft}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerTitle: "",
                }}
            />

            <FlatList
                data={searchResult}
                renderItem={({ item }) => (
                    <CommunityCard
                        community={item}
                        selectedCommunity={selectedCommunity}
                        handleNavigate={() => {
                            setSelectedCommunity(item.id)
                            router.push(`/community/${item.id}`)
                        }}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>{params.id + ' Communities'}</Text>
                            <Text style={styles.noOfCommunities}>{params.id}</Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {searchLoader ? (
                                <ActivityIndicator size='large' color={COLORS.primary} />
                            ) : searchError && (
                                <Text>Oops something went wrong</Text>
                            )}
                        </View>
                    </>
                )}
                ListFooterComponent={() => (
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>
                            Total {params.id} Communities: {searchResult.length}
                        </Text>
                    </View>
                    )}
            />
        </SafeAreaView>
    )
}

export default ListCommunities;