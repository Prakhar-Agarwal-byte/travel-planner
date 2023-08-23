import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('trips'); // 'trips' or 'communities'
  const [searchText, setSearchText] = useState('');
  
  const user = {
    name: 'Adarsh',
    email: 'adarsh@gmail.com',
    profileImage: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  };

  const trips = [
    { id: 1, title: 'Mountain Adventure', date: 'August 2023' },
    { id: 2, title: 'Beach Getaway', date: 'July 2023' },
    // Add more trips
  ];

  const communities = [
    { id: 1, name: 'Adventure Explorers' },
    { id: 2, name: 'Nature Lovers' },
    // Add more communities
  ];

  const filteredTrips = trips.filter(trip => trip.title.toLowerCase().includes(searchText.toLowerCase()));
  const filteredCommunities = communities.filter(community => community.name.toLowerCase().includes(searchText.toLowerCase()));

  const renderTabContent = () => {
    if (activeTab === 'trips') {
      return (
        <FlatList
          data={filteredTrips}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tabContent}>
              <Text style={styles.tripTitle}>{item.title}</Text>
              <Text style={styles.tripDate}>{item.date}</Text>
            </View>
          )}
        />
      );
    } else if (activeTab === 'communities') {
      return (
        <FlatList
          data={filteredCommunities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tabContent}>
              <Text style={styles.communityName}>{item.name}</Text>
            </View>
          )}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userEmail}>{user.email}</Text>
      <TouchableOpacity style={styles.editProfileButton}>
        <Text style={styles.editProfileButtonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('trips')}
          style={[styles.tab, activeTab === 'trips' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'trips' && styles.activeTabText]}>Trips</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('communities')}
          style={[styles.tab, activeTab === 'communities' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'communities' && styles.activeTabText]}>Communities</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tabContentsContainer}>{renderTabContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... Other styles from the previous code

  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    margin:5,
    backgroundColor:"#32333",
    marginTop:20,
    
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    alignSelf: 'center',
    marginBottom: 20,
  },
  editProfileButton: {
    alignSelf: 'center',
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  editProfileButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: '#E0E0E0',
  },
  activeTab: {
    borderColor: 'blue',
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: 'blue',
  },
  tabContentsContainer: {
    flex: 1,
  },
  tabContent: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tripDate: {
    color: '#666',
  },
  communityName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfile;
