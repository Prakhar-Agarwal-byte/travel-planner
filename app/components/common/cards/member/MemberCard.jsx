import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './member.style';


const MemberCard = ({ member, handleNavigate }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handleNavigate}
        >
            <TouchableOpacity style={styles.memberCard}>
                <Image
                    source={{ uri: member?.profileImage }}
                    resizeMode='contain'
                    style={styles.profileImage}
                />
            </TouchableOpacity>

            <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member?.name}</Text>
                <Text style={styles.memberEmail}>{member?.email}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MemberCard