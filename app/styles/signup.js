import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: COLORS.lightWhite,
    },
    title: {
        fontSize: SIZES.xxLarge,
        marginBottom: SIZES.large,
        fontFamily: FONT.bold,
        color: COLORS.primary,
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.gray2,
        borderRadius: SIZES.medium,
        marginBottom: SIZES.medium,
        padding: SIZES.medium,
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
    },
    signupButton: {
        backgroundColor: COLORS.tertiary,
        padding: SIZES.medium,
        borderRadius: SIZES.medium,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontFamily: FONT.bold,
    },
    loginText: {
        marginTop: SIZES.medium,
        fontSize: SIZES.small,
        fontFamily: FONT.regular,
        color: COLORS.gray,
    },
    loginLink: {
        color: COLORS.primary,
        fontFamily: FONT.medium,
        fontSize: SIZES.small,
        textDecorationLine: "underline",
    },
});

export default styles;
