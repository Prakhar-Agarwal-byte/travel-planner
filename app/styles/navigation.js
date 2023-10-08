import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONT, SHADOWS } from '../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    },
    titleContainer: {
        alignItems: "center",
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        marginBottom: 4,
        marginHorizontal: 6,
        ...SHADOWS.medium,
    },
    titleButton: {
        padding: 10,
    },
    title: {
        fontSize: SIZES.xxLarge,
        marginBottom: SIZES.xSmall / 2,
        fontFamily: FONT.bold,
        color: COLORS.white,
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default styles;