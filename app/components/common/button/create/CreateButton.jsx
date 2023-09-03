import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../../constants';

import styles from './createbutton.style';

const CreateButton = ({ activeTab }) => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.push(`/${String(activeTab).toLowerCase()}/create`)} style={styles.button}>
                <MaterialIcons name="add" size={50} color={COLORS.white} />
            </TouchableOpacity>
        </View>
    );
};

export default CreateButton;
