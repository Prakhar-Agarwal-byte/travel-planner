import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './community.style'

const CommunityCard = ({ community, handleNavigate }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handleNavigate}
        >
            <TouchableOpacity style={styles.logoContainer}>
                <Image
                    source={{
                        uri: 'https://t3.ftcdn.net/jpg/00/94/74/70/240_F_94747015_w710pojp7hWrRPNTZaY4MgBAMNW7LHq7.jpg'
                    }}
                    resizeMode='contain'
                    style={styles.logoImage}
                />
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <Text style={styles.communityName} numberOfLines={1}>{community.name}</Text>
                <Text style={styles.communityType}>{community.description}</Text>
                <Text style={styles.communityType}>{community.location}</Text>
            </View>
        </TouchableOpacity>

    )
}

export default CommunityCard