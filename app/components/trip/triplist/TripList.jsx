import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './triplist.style'
import { COLORS, SIZES } from '../../../constants'
import TripCard from '../../common/cards/trip/TripCard'


const TripList = ({ status }) => {
    const router = useRouter()

    const [selectedTrip, setSelectedTrip] = useState()

    const data = [
        {
            id: 1,
            name: "Beach Getaway",
            desc: "A relaxing trip to the tropical paradise, filled with sun, sand, and surf."
        },
        {
            id: 2,
            name: "City Adventure",
            desc: "Explore the bustling streets, iconic landmarks, and vibrant culture of a new city."
        },
        {
            id: 3,
            name: "Mountain Expedition",
            desc: "Embark on a challenging journey to conquer towering peaks and breathtaking vistas."
        },
        {
            id: 4,
            name: "Cultural Exploration",
            desc: "Immerse yourself in the rich heritage, traditions, and history of a foreign land."
        },
        {
            id: 5,
            name: "Wildlife Safari",
            desc: "Experience the thrill of encountering exotic wildlife in their natural habitat."
        }
    ]
    const isLoading = false
    const error = false

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
                                    setSelectedTrip(item.id)
                                    router.push(`/trip/${item.id}`)
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