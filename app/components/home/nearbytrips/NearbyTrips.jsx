import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './nearbytrips.style'
import { COLORS } from '../../../constants'
import TripCard from '../../common/cards/trip/TripCard'

const Nearbytrips = () => {
    const router = useRouter()
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
                <Text style={styles.headerTitle}>Nearby trips</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" colors={COLORS.primary} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : (
                    data?.map((trip) => (
                        <TripCard
                            trip={trip}
                            key={`nearby-trip-${trip?.id}`}
                            handleNavigate={() => router.push(`/trip/${trip?.id}`)}
                        />
                    ))
                )}
            </View>
        </View>
    )
}

export default Nearbytrips