import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES, FONT } from "../../../../constants";

const styles = StyleSheet.create({
    container: (selectedCommunity, item) => ({
        padding: SIZES.xLarge,
        backgroundColor: selectedCommunity === item._id ? COLORS.primary : "#FFF",
        borderRadius: SIZES.medium,
        justifyContent: "space-between",
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
    }),
    logoContainer: (selectedCommunity, item) => ({
        width: 50,
        height: 50,
        backgroundColor: selectedCommunity === item._id ? "#FFF" : COLORS.white,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    }),
    logoImage: {
        width: "80%",
        height: "80%",
    },
    communityName: {
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        color: "#B3AEC6",
        marginTop: SIZES.small / 1.5,
    },
    infoContainer: {
        marginTop: SIZES.medium,
    },
    communityDesc: (selectedCommunity, item) => ({
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
        color: selectedCommunity === item._id ? COLORS.white : COLORS.gray,
    }),
    communityPlace: (selectedCommunity, item) => ({
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
        color: selectedCommunity === item._id ? COLORS.white : COLORS.secondary,
    }),
});

export default styles;
