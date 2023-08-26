import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants'; // Import your theme constants

const AdvancedSearchBar = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const openDatePicker = async () => {
    try {
      const { action, year, month, day } = await DateTimePicker.open({
        date: selectedDate || new Date(),
      });

      if (action !== DateTimePicker.dismissedAction) {
        const formattedMonth = month < 9 ? `0${month + 1}` : month + 1;
        const formattedDay = day < 10 ? `0${day}` : day;
        const selected = new Date(year, month, day);
        setSelectedDate(selected);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Source:', source);
    console.log('Destination:', destination);
    console.log('Selected Date:', selectedDate);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Source"
        value={source}
        onChangeText={setSource}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
      />
      <TouchableOpacity onPress={openDatePicker} style={styles.datePickerButton}>
        <Text style={styles.datePickerButtonText}>
          {selectedDate ? selectedDate.toDateString() : 'Select Date'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <MaterialIcons name="search" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: SIZES.medium,
    backgroundColor: COLORS.lightWhite,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: SIZES.small,
    paddingHorizontal: SIZES.medium,
    marginBottom: SIZES.medium,
  },
  datePickerButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    borderRadius: SIZES.small,
    marginBottom: SIZES.medium,
  },
  datePickerButtonText: {
    color: COLORS.white,
    fontSize: SIZES.small,
  },
   searchButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: COLORS.tertiary,
    padding: SIZES.small,
    borderRadius: SIZES.small,
  },
});

export default AdvancedSearchBar;
