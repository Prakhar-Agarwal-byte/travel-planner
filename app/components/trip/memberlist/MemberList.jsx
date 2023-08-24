import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useRouter } from 'expo-router'

import styles from './memberlist.style';
import MemberCard from '../../common/cards/member/MemberCard';

const TripMembersList = () => {
    const router = useRouter()
    const members = [
        { id: 1, name: "John Doe", bio: "Nature enthusiast", profileImage: "profile_image_url_1" },
        { id: 2, name: "Jane Smith", bio: "Adventure lover", profileImage: "profile_image_url_2" },
        { id: 3, name: "Michael Johnson", bio: "Travel blogger", profileImage: "profile_image_url_3" },
        { id: 4, name: "Emily Wilson", bio: "Photography enthusiast", profileImage: "profile_image_url_4" },
        { id: 5, name: "David Brown", bio: "Outdoor explorer", profileImage: "profile_image_url_5" },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Members</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                {members?.map((member) => (
                    <MemberCard
                        member={member}
                        key={`profile-${member?.id}`}
                        handleNavigate={() => router.push(`/profile/${member?.id}`)}
                    />
                ))}
            </View>

        </View>
    );
};

export default TripMembersList;
