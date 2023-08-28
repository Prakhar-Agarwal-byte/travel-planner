import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import ActiveTabCard from '../../components/common/cards/profile/ActiveTabCard';
import { COLORS, icons, images } from '../../constants';

import styles from '../../styles/profile';


const Profile = () => {
    const activeTabsInTrip = [ 'Requested Trips', 'Joined Trips', 'Active Trips', 'Past Trips'];
   
    const activeTabsInCommunities = [ 'Owned Communities', 'Joined Communities'];
    const [activeTab, setActiveTab] = useState('Requested Trip');
    const activeSections=['Trips','Community']
   const[activeSection,setActiveSection]= useState('trips');


    const user = {
        name: 'Adarsh',
        email: 'adarsh@gmail.com',
        profileImage: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    };

    const RenderSectionContent = () => {
        if (activeSection === 'trips') {
            return (
                <ActiveTabCard activeTabs={activeTabsInTrip}
                
                />
            );
        } else if (activeSection === 'communities') {
            return (
                <ActiveTabCard activeTabs={activeTabsInCommunities}/>
            );
        }
        
    };
   
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                
                    <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                    <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => setActiveSection('trips')}
          style={[styles.section, activeSection === 'trips' && styles.activeSection]}
        >
          <Text style={[styles.sectionText, activeSection === 'trips' && styles.activeSectionText]}>Trips</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveSection('communities')}
          style={[styles.section, activeSection === 'communities' && styles.activeSection]}
        >
          <Text style={[styles.sectionText, activeTab === 'communities' && styles.activeSectionText]}>Communities</Text>
        </TouchableOpacity>
      </View>
                    <View>
                        
                        
                       <RenderSectionContent/>
                    </View>
          
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
