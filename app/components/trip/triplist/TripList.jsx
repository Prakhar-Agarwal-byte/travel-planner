import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './triplist.style'
import { SIZES } from '../../../constants'
import TripCard from '../../common/cards/trip/TripCard'

const TripList = ({ trips, status }) => {
    const router = useRouter()

    const [selectedTrip, setSelectedTrip] = useState()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{status} Trips</Text>
                <TouchableOpacity onPress={() => router.push(`/listtrips/${status}`)}>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                <FlatList
                    data={trips}
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
            </View>
        </View>
    )
}

export default TripList