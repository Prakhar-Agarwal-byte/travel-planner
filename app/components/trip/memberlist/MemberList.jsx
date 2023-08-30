import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router'

import styles from './memberlist.style';
import { COLORS } from '../../../constants';
import MemberCard from '../../common/cards/member/MemberCard';

import useFetch from '../../../hooks/useFetch'

const TripMembersList = ({ id }) => {
    const router = useRouter()

    const { data, isLoading, error } = useFetch(`trips/${id}/members`)
    if (error) {
        console.log(error)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Members</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" colors={COLORS.primary} />
            ) : error ? (
                <Text>Something went wrong</Text>
            ) : (
                <View style={styles.cardsContainer}>
                    {data?.map((member) => (
                        <MemberCard
                            member={member}
                            key={`profile-${member?._id}`}
                            handleNavigate={() => router.push(`/profile/${member?._id}`)}
                        />
                    ))}
                </View>
            )}

        </View>
    );
};

export default TripMembersList;
