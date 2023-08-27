import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './triplist.style'
import { COLORS, SIZES } from '../../../constants'
import TripCard from '../../common/cards/trip/TripCard'
import useFetch from '../../../hooks/useFetch'


const TripList = ({ status }) => {
    const router = useRouter()

    const [selectedTrip, setSelectedTrip] = useState()

    const { data, isLoading, error } = useFetch('trips', {
        tripStatus: status,
    })

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{status} Trips</Text>
                <TouchableOpacity onPress={() => router.push(`/listtrips/${status}`)}>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" colors={COLORS.primary} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : (
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <TripCard
                                trip={item}
                                selectedTrip={selectedTrip}
                                handleNavigate={() => {
                                    setSelectedTrip(item._id)
                                    router.push(`/trip/${item._id}`)
                                }}
                            />
                        )}
                        keyExtractor={trip => trip.id}
                        contentContainerStyle={{ columnGap: SIZES.medium }}
                        horizontal
                    />
                )}
            </View>
        </View>
    )
}

export default TripList