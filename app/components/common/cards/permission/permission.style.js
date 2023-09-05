import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES, FONT } from "../../../../constants";

const styles = StyleSheet.create({
    container: {
        padding: SIZES.xLarge,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.medium,
        justifyContent: "space-between",
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: SIZES.medium,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: SIZES.medium,
    },
    buttonIcon: {
        marginTop: 20,
        width: 40,
        height: 40,
        borderRadius: 30,
        marginRight: SIZES.medium,
    },
    memberInfo: {
        flex: 1,
    },
    memberName: {
        fontSize: SIZES.medium,
        fontFamily: "DMBold",
        color: COLORS.primary,
    },
    memberEmail: {
        fontSize: SIZES.small + 2,
        fontFamily: "DMRegular",
        color: COLORS.gray,
        marginTop: 3,
    },
    messageContainer: {
        flex: 1,
    },
    messageText: {
        fontSize: SIZES.medium,
        fontFamily: "DMBold",
        color: COLORS.primary,
    },
});

export default styles;
