import React from 'react';
import { TouchableOpacity, Text, View, FlatList } from 'react-native';
import { useRouter } from 'expo-router'
import { SIZES } from '../../../constants';
import styles from './permissionlist.style';
import PermissionCard from '../../common/cards/permission/PermissionCard';
import { axiosInstance } from '../../../config/api';


const CommunityPermissionList = ({ id, requests }) => {
    const router = useRouter();

    const handleApproval = async (userId) => {
        try {
            const response = await axiosInstance.patch(`/communities/${id}/accept-request/${userId}`)
            console.log(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            router.push(`/community/${id}`)
        }
    }

    const handleRejection = async (userId) => {
        try {
            const response = await axiosInstance.patch(`/communities/${id}/decline-request/${userId}`)
            console.log(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            router.push(`/community/${id}`)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Pending requests</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                <FlatList
                    data={requests}
                    renderItem={({ item }) => (
                        <PermissionCard
                            member={item}
                            key={`profile-${item?._id}`}
                            handleNavigate={() => router.push(`/profile/${item?._id}`)}
                            handleApproval={() => handleApproval(item?._id)}
                            handleRejection={() => handleRejection(item?._id)}
                        />
                    )}
                    horizontal
                    contentContainerStyle={{ columnGap: SIZES.medium }}
                />
            </View>

        </View>
    );
};

export default CommunityPermissionList;
