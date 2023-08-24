import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS,SIZES } from '../../constants';



const CreateButton = () => {
 
    const CreateCommunityButton = () => {
        return (
          <TouchableOpacity style={styles.createButton} >
            <MaterialCommunityIcons name="plus" size={24} color={COLORS.white} />
          </TouchableOpacity>
        );
      };
  return (
    <View style={styles.container}>
      <CreateCommunityButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
   
  },
  createButton: {
    position: 'absolute',
    bottom: SIZES.large,
    right: SIZES.large,
    backgroundColor: COLORS.tertiary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default CreateButton;
