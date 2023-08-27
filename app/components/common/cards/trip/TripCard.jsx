import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './trip.style'
import { icons } from '../../../../constants';

const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString(undefined, options);
};

const TripCard = ({ trip, selectedTrip, handleNavigate }) => {
    return (
        <TouchableOpacity
            style={styles.container(selectedTrip, trip)}
            onPress={handleNavigate}
        >
            <TouchableOpacity style={styles.logoContainer(selectedTrip, trip)}>
                <Image
                    source={{
                        uri: `../../../../assets/icons/${trip.modeOfTransport}.png`
                    }}
                    resizeMode='contain'
                    style={styles.logoImage}
                />
            </TouchableOpacity>

            <Text style={styles.tripName} numberOfLines={1}>{trip.title}</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.tripRoute(selectedTrip, trip)} numberOfLines={1}>{trip.fromDestination}{' -> '}{trip.toDestination}</Text>
                <Text style={styles.tripTime(selectedTrip, trip)}>Starts On {formatDateTime(trip.startDate)}</Text>
            </View>
        </TouchableOpacity>

    )
}

export default TripCard