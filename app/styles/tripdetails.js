import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.large,
        margin: SIZES.medium,
        backgroundColor: COLORS.lightWhite,
    },
    tripName: {
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
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: SIZES.small,
    },
    headerTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.medium,
        color: COLORS.primary,
    },
    communityContainer: {
        width: 180,
        marginTop: SIZES.large,
        padding: SIZES.xLarge,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.medium,
        justifyContent: "space-between",
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
    },
    logoContainer: {
        width: 60,
        height: 60,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    logoImage: {
        width: "80%",
        height: "80%",
    },
    communityName: {
        fontSize: SIZES.medium,
        fontFamily: "DMBold",
        color: COLORS.primary,
    },
});

export default styles;
