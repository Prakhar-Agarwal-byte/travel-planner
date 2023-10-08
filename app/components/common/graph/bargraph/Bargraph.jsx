import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from './bargraph.style';

const BarGraph = ({ data }) => {
    const maxDataValue = Math.max(...data.map(item => item.totalPricePerPassenger));

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                {data.map(item => (
                    <View key={item.providerId} style={styles.barContainer}>
                        <View
                            style={[
                                styles.bar,
                                { height: (item.totalPricePerPassenger / maxDataValue) * 150 },
                            ]}
                        />
                        <Text style={styles.label}>{item.providerId}</Text>
                        <Text style={styles.value}>{item.totalPricePerPassenger}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};


export default BarGraph;
