import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        backgroundColor: COLORS.white,
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
        marginBottom: SIZES.medium,
    },
    memberCard: {
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
});

export default styles;
