import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.large,
        margin: SIZES.medium,
        backgroundColor: COLORS.lightWhite,
    },
    communityName: {
        fontSize: SIZES.xxLarge,
        fontWeight: "bold",
        marginBottom: SIZES.medium,
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
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: SIZES.medium,
    },
    joinButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.tertiary,
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.large,
        borderRadius: SIZES.medium,
    },
    joinedButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#008000",
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.large,
        borderRadius: SIZES.medium,
    },
    joinButtonText: {
        color: COLORS.white,
        fontWeight: "bold",
        fontSize: SIZES.medium,
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#FF0000",
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.large,
        borderRadius: SIZES.medium,
    },
    deleteButtonText: {
        color: COLORS.white,
        fontWeight: "bold",
        fontSize: SIZES.medium,
    },
});

export default styles;
