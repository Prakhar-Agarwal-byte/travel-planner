import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator,FlatList } from 'react-native';
import { useRouter } from 'expo-router'
import { SIZES } from '../../../constants';
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
                   <FlatList 
                 data={data}
                 renderItem={({item}) => (
                     <MemberCard
                     member={item}
                     key={`profile-${item?.id}`}
                     handleNavigate={() => router.push(`/profile/${item?._id}`)}
                         
                     />
                 )}
                
                
                horizontal 
                contentContainerStyle={{ columnGap: SIZES.medium }}
                />
               
                </View>
            )}

        </View>
    );
};

export default TripMembersList;
