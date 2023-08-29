import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useRouter } from 'expo-router'

import styles from './memberlist.style';
import MemberCard from '../../common/cards/member/MemberCard';

import useFetch from '../../../hooks/useFetch'

const TripMembersList = ({ id }) => {
    const router = useRouter()

    const { data, error } = useFetch(`trips/${id}/members`)
    console.log(data)
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

            <View style={styles.cardsContainer}>
                {data?.map((member) => (
                    <MemberCard
                        member={member}
                        key={`profile-${member?._id}`}
                        handleNavigate={() => router.push(`/profile/${member?._id}`)}
                    />
                ))}
            </View>

        </View>
    );
};

export default TripMembersList;
