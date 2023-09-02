import React from 'react';
import { TouchableOpacity, Text, View, FlatList } from 'react-native';
import { useRouter } from 'expo-router'
import { SIZES } from '../../../constants';
import styles from './memberlist.style';
import MemberCard from '../../common/cards/member/MemberCard';
import { axiosInstance } from '../../../config/api';

const CommunityMembersList = ({ id, members, isAdmin }) => {
  const router = useRouter()

  const handleRemove = async (userId) => {
    try {
      const response = await axiosInstance.delete(`/communities/${id}/remove/${userId}`)
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
        <Text style={styles.headerTitle}>Members</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        <FlatList
          data={members}
          renderItem={({ item }) => (
            <MemberCard
              member={item}
              key={`profile-${item?._id}`}
              handleNavigate={() => router.push(`/profile/${item?._id}`)}
              isAdmin={isAdmin}
              handleRemove={() => handleRemove(item?._id)}
            />
          )}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.medium }}
        />
      </View>

    </View>
  );
};

export default CommunityMembersList;
