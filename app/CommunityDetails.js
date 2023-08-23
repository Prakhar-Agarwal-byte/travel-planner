import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CommunityDetailsPage = () => {
  const handleJoinCommunity = () => {
    // Handle the logic for joining the community
    console.log('User joined the community');
  };

  return (
    <View style={styles.container}>
       
      <Text style={styles.communityName}>Adventure Explorers</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>
          A community for adventure enthusiasts to share experiences and plan trips.
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Admin:</Text>
        <Text style={styles.value}>
          Akash
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Members:</Text>
        <Text style={styles.value}>200+</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Trips:</Text>
        <Text style={styles.value}>20</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Founded:</Text>
        <Text style={styles.value}>January 2022</Text>
      </View>
      <View style={styles.joinButtonContainer}>
        <TouchableOpacity onPress={handleJoinCommunity} style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin:16,
    backgroundColor:"#32333"
  },
 
  communityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
  },
  value: {
    flex: 2,
  },
  joinButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  joinButton: {
    backgroundColor: '#F79BD3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CommunityDetailsPage;
