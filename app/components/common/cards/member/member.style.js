import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../../constants";

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
        justifyContent: 'space-between',
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
