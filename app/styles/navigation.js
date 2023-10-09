import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONT, SHADOWS } from '../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    },
    titleContainer: {
        flexDirection: "row",
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        marginBottom: 4,
        marginHorizontal: 6,
        ...SHADOWS.medium,
    },
    title: {
        fontSize: SIZES.xxLarge,
        marginLeft: SIZES.small,
        marginBottom: SIZES.xSmall / 2,
        fontFamily: FONT.bold,
        color: COLORS.white,
        padding: SIZES.xSmall,
    },
    locateButton: {
        alignSelf: "center",
        marginLeft: SIZES.xxLarge * 1.5,
        backgroundColor: COLORS.secondary,
        borderRadius: 50,
        padding: SIZES.xSmall / 2,
        ...SHADOWS.medium,
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default styles;