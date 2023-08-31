import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './permission.style'
import { icons } from '../../../../constants'

const PermissionCard = ({ member, handleNavigate }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handleNavigate}
        >
            <TouchableOpacity style={styles.permissionCard}>
                <Image
                    source={{ uri: member?.profileImage }} // Replace with member's profile image URL
                    resizeMode='contain'
                    style={styles.profileImage}
                />
            </TouchableOpacity>

            <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member?.name}</Text>
                <Text style={styles.memberEmail}>{member?.email}</Text>
            </View>
            <View style={styles.approvalButtonsArea}>
            <TouchableOpacity style={styles.permissionCard}>
                <Image
                    source={icons.cancel} // Replace with member's profile image URL
                    resizeMode='contain'
                    style={styles.approvalIcon}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.permissionCard}>
                <Image
                    source={icons.approve} // Replace with member's profile image URL
                    resizeMode='contain'
                    style={styles.approvalIcon}
                />
            </TouchableOpacity>
            </View>

        </TouchableOpacity>
    )
}

export default PermissionCard