import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './permission.style'
import { icons } from '../../../../constants'

const PermissionCard = ({ member, handleNavigate, handleApproval, handleRejection }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handleNavigate}
        >
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: member?.profileImage }}
                    resizeMode='contain'
                    style={styles.profileImage}
                />
            </View>

            <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member?.name}</Text>
                <Text style={styles.memberEmail}>{member?.email}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}
                    onPress={handleRejection}
                >
                    <Image
                        source={icons.cancel}
                        resizeMode='contain'
                        style={styles.buttonIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={handleApproval}
                >
                    <Image
                        source={icons.approve}
                        resizeMode='contain'
                        style={styles.buttonIcon}
                    />
                </TouchableOpacity>
            </View>

        </TouchableOpacity>
    )
}

export default PermissionCard