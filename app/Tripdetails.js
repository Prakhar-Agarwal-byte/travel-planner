import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TripDetailsPage = () => {
  const handleJoinNow = () => {
    // Handle the logic for joining the trip
    console.log('User joined the trip');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Trip Details</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Trip Admin:</Text>
        <Text style={styles.value}>Akash</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Source:</Text>
        <Text style={styles.value}>Varanasi</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Destination</Text>
        <Text style={styles.value}>New Delhi</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>members:</Text>
        <Text style={styles.value}>Prakhar, Adarsh</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>August 25, 2023</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Start Time:</Text>
        <Text style={styles.value}>10:00 AM</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Vacant Seats:</Text>
        <Text style={styles.value}>1</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Mode of Transportation:</Text>
        <Text style={styles.value}>Car</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Stops:</Text>
        <Text style={styles.value}>Stop 1, Stop 2, Stop 3</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Community:</Text>
        <Text style={styles.value}>Travel Enthusiasts</Text>
      </View>
      <View style={styles.joinButtonContainer}>
        <TouchableOpacity onPress={handleJoinNow} style={styles.joinButton}>
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    fontWeight:'800',
    marginBottom: 20,
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

export default TripDetailsPage;
