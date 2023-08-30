import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES, FONT } from "../../../../constants";

const styles = StyleSheet.create({
    container: (selectedTrip, item) => ({
        padding: SIZES.xLarge,
        backgroundColor: selectedTrip === item._id ? COLORS.primary : "#FFF",
        borderRadius: SIZES.medium,
        justifyContent: "space-between",
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
    }),
    logoContainer: (selectedTrip, item) => ({
        width: 50,
        height: 50,
        backgroundColor: selectedTrip === item._id ? "#FFF" : COLORS.white,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    }),
    logoImage: {
        width: "80%",
        height: "80%",
    },
    tripName: {
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        color: "#B3AEC6",
        marginTop: SIZES.small / 1.5,
    },
    infoContainer: {
        marginTop: SIZES.medium,
    },
    tripRoute: (selectedTrip, item) => ({
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
        color: selectedTrip === item._id ? COLORS.white : COLORS.primary,
    }),
    tripTime: (selectedTrip, item) => ({
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
        color: selectedTrip === item._id ? COLORS.white : COLORS.secondary,
    }),
});

export default styles;
