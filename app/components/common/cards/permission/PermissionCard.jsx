import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './permission.style';
import { icons } from '../../../../constants';

const PermissionCard = ({ member, handleNavigate, handleApproval, handleRejection }) => {
  const [message, setMessage] = useState(null);
  const [showDetails, setShowDetails] = useState(true);

  const handleApprove = () => {
    handleApproval();
    setMessage('Request Accepted');
    setShowDetails(false);
  };

  const handleReject = () => {
    handleRejection();
    setMessage('Request Rejected');
    setShowDetails(false);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
    >
      {showDetails && (
        <View>
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: member?.profileImage }}
              resizeMode='contain'
              style={styles.profileImage}
            />
          </View>
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{member?.name}</Text>
            <Text style={styles.memberEmail}>{member?.email}</Text>
          </View>
        </View>
      )}

      {message && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}

      {showDetails && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleReject}>
            <Image
              source={icons.cancel}
              resizeMode='contain'
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleApprove}>
            <Image
              source={icons.approve}
              resizeMode='contain'
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default PermissionCard;
