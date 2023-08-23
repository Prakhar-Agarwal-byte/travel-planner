import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const MemberCard = ({ member }) => {
  return (
    <View style={styles.memberCard}>
      <Image
        source={{ uri: member.profileImage }} // Replace with member's profile image URL
        style={styles.profileImage}
      />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{member.name}</Text>
        <Text style={styles.memberBio}>{member.bio}</Text>
      </View>
    </View>
  );
};

const CommunityMembersList = ({ members }) => {
  return (
    <FlatList
      data={members}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <MemberCard member={item} />}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin:16,
    backgroundColor:"#32333"
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    paddingBottom: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  memberBio: {
    marginTop: 5,
    color: '#666',
  },
});

export default CommunityMembersList;
