import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './member.style';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../../context/auth';


const MemberCard = ({ member, handleNavigate, isAdmin, handleRemove }) => {
    const { user } = useAuth();
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handleNavigate}
        >
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: member.profileImage }}
                    resizeMode='contain'
                    style={styles.profileImage}
                />
                {isAdmin && (user?._id !== member._id) && <TouchableOpacity onPress={handleRemove}>
                    <Ionicons name="trash" size={30} color={"#FF0000"} />
                </TouchableOpacity>}
            </View>

            <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberEmail}>{member.email}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MemberCard