import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './community.style'
import { icons } from '../../../../constants'

const CommunityCard = ({ community, selectedCommunity, handleNavigate }) => {
    return (
        <TouchableOpacity
            style={styles.container(selectedCommunity, community)}
            onPress={handleNavigate}
        >
            <TouchableOpacity style={styles.logoContainer(selectedCommunity, community)}>
                <Image
                    source={icons.community}
                    resizeMode='contain'
                    style={styles.logoImage}
                />
            </TouchableOpacity>

            <Text style={styles.communityName}>{community.name}</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.communityDesc(selectedCommunity, community)} numberOfLines={1}>{community.description}</Text>
                <Text style={styles.communityPlace(selectedCommunity, community)}>{community.location}</Text>
            </View>
        </TouchableOpacity>

    )
}

export default CommunityCard