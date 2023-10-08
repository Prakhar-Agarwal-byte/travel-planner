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
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow buttons to wrap onto the next line
        alignItems: 'center', // Align items to the center vertically
        justifyContent: 'center', // Center buttons horizontally
        marginBottom: SIZES.medium,
        marginTop: SIZES.medium,
    },
    joinButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.tertiary,
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.large,
        borderRadius: SIZES.medium,
        marginLeft: SIZES.medium,
    },
    joinedButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#008000",
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.large,
        borderRadius: SIZES.medium,
        marginLeft: SIZES.medium,
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
        paddingHorizontal: SIZES.medium,
        borderRadius: SIZES.medium,
    },
    deleteButtonText: {
        color: COLORS.white,
        textAlign: 'center',
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
    sosButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#FF0000",
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.large,
        borderRadius: SIZES.medium,
        marginTop: SIZES.medium,
        marginLeft: SIZES.medium,
    },
    trackButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.large,
        borderRadius: SIZES.medium,
        marginTop: SIZES.medium,
        marginLeft: SIZES.medium,
    },
    graphTitle: {
        marginTop: SIZES.large,
        alignSelf: "center",
        fontSize: SIZES.xLarge,
        fontFamily: "DMBold",
        marginBottom: 10,
        color: COLORS.primary,
    },
    graphTitle: {
        marginTop: SIZES.large,
        alignSelf: "center",
        fontSize: SIZES.xLarge,
        fontFamily: "DMBold",
        color: COLORS.primary,
    },
    graphContainer: {
        alignSelf: "center",
        marginTop: SIZES.xSmall,
    },
});

export default styles;
