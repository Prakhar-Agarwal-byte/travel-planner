import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './trip.style'

const profileButtonCard = ({profileOptions}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            
        >
            <TouchableOpacity style={styles.logoContainer}>
                <Image
                    source={{
                        uri: ''
                    }}
                    resizeMode='contain'
                    style={styles.logoImage}
                />
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <Text style={styles.tripName} numberOfLines={1}></Text>
               
            </View>
        </TouchableOpacity>

    )
}

export default profileButtonCard;