import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES, FONT } from "../../../../constants";

const styles = StyleSheet.create({
    container: {
        padding: SIZES.large,
        backgroundColor: '#EFEFEF' ,
        borderRadius: SIZES.medium,
        justifyContent: "space-between",
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
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
