import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    welcomeMessage: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        marginTop: 2,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: SIZES.large,
    },
    searchButton: {
        flex: 1,
        backgroundColor: "#FC8EAC",
        marginRight: SIZES.small,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.medium,
        ...SHADOWS.small,
    },
    searchInput: {
        fontFamily: FONT.regular,
        width: "100%",
        paddingHorizontal: SIZES.medium,
        color: "#000",
        fontSize: SIZES.medium + 2,
        height: 50,
        lineHeight: 50,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SIZES.medium,
        marginBottom: SIZES.medium,
    },
    tabsWrapper: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginRight: SIZES.small,
        borderRadius: SIZES.medium,
        height: '100%',
    },
    tab: (activeTab, item) => ({
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.medium,
        borderWidth: 1,
        borderColor: COLORS.gray2,
        borderRadius: SIZES.medium,
        alignItems: 'center',
        backgroundColor: activeTab === item ? COLORS.lightWhite : 'transparent',
        marginRight: SIZES.small / 4,
    }),
    tabText: (activeTab, item) => ({
        fontFamily: FONT.medium,
        color: activeTab === item ? COLORS.secondary : COLORS.gray2,
    }),
});

export default styles;
