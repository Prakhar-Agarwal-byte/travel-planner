import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './trip.style'

const TripCard = ({ trip, selectedTrip, handleNavigate }) => {
    return (
        <TouchableOpacity
            style={styles.container(selectedTrip, trip)}
            onPress={handleNavigate}
        >
            <TouchableOpacity style={styles.logoContainer(selectedTrip, trip)}>
                <Image
                    source={{
                        uri: 'https://media.istockphoto.com/id/1272521633/vector/happy-travel-case-vector-illustration.jpg?s=612x612&w=0&k=20&c=MHlTTH2n5MUp8G0dqAvJjiKs0dgZ-re8CohaB21HegU='
                    }}
                    resizeMode='contain'
                    style={styles.logoImage}
                />
            </TouchableOpacity>

            <Text style={styles.tripName} numberOfLines={1}>{trip.name}</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.tripDesc(selectedTrip, trip)} numberOfLines={1}>{trip.desc}</Text>
            </View>
        </TouchableOpacity>

    )
}

export default TripCard