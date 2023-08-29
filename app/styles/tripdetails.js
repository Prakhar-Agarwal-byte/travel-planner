import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.large,
        margin: SIZES.medium,
        backgroundColor: COLORS.lightWhite,
    },
    heading: {
        fontSize: SIZES.xxLarge,
        fontWeight: "bold",
        marginBottom: SIZES.large,
        color: COLORS.primary,
    },
    detailsContainer: {
        flexDirection: "row",
        marginBottom: SIZES.medium,
    },
    label: {
        flex: 1,
        fontWeight: "bold",
        color: COLORS.gray2,
    },
    value: {
        flex: 2,
        color: COLORS.secondary,
        textTransform: "capitalize",
    },
    joinButtonContainer: {
        alignItems: "center",
        marginTop: SIZES.large,
    },
    joinButton: {
        backgroundColor: COLORS.tertiary,
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.large,
        borderRadius: SIZES.medium,
    },
    joinButtonText: {
        color: COLORS.white,
        fontWeight: "bold",
        fontSize: SIZES.medium,
    },
});

export default styles;
