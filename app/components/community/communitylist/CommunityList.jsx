import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './communitylist.style'
import { SIZES } from '../../../constants'
import CommunityCard from '../../common/cards/community/CommunityCard'


const CommunityList = ({ communities, status }) => {
    const router = useRouter()

    const [selectedCommunity, setSelectedCommunity] = useState()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{status} Communities</Text>
                <TouchableOpacity onPress={() => router.push(`/listcommunities/${status}`)}>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                <FlatList
                    data={communities}
                    renderItem={({ item }) => (
                        <CommunityCard
                            community={item}
                            selectedCommunity={selectedCommunity}
                            handleNavigate={() => {
                                setSelectedCommunity(item._id)
                                router.push(`/community/${item._id}`)
                            }}
                        />
                    )}
                    keyExtractor={item => item._id}
                    contentContainerStyle={{ columnGap: SIZES.medium }}
                    horizontal
                />
            </View>
        </View>
    )
}

export default CommunityList