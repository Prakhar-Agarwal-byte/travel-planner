import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './community.style'
import { icons } from '../../../../constants'

const CommunityCard = ({ community, handleNavigate }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handleNavigate}
        >
            <TouchableOpacity style={styles.logoContainer}>
                <Image
                    source={icons.community}
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