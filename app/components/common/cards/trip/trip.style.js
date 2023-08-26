import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES, FONT } from "../../../../constants";

const styles = StyleSheet.create({
    container: (selectedTrip, item) => ({
        width: 250,
        padding: SIZES.xLarge,
        backgroundColor: selectedTrip === item.id ? COLORS.primary : "#FFF",
        borderRadius: SIZES.medium,
        justifyContent: "space-between",
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
    }),
    logoContainer: (selectedTrip, item) => ({
        width: 50,
        height: 50,
        backgroundColor: selectedTrip === item.id ? "#FFF" : COLORS.white,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    }),
    logoImage: {
        width: "70%",
        height: "70%",
    },
    tripName: {
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        color: "#B3AEC6",
        marginTop: SIZES.small / 1.5,
    },
    infoContainer: {
        marginTop: SIZES.large,
    },
    tripDesc: (selectedTrip, item) => ({
        fontSize: SIZES.large,
        fontFamily: FONT.medium,
        color: selectedTrip === item.id ? COLORS.white : COLORS.primary,
    }),
});

export default styles;
